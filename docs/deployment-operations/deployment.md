---
sidebar_position: 2
---

# Deployment

## Deploying Restate
Restate is currently a single binary that contains everything you need.
It exposes three services by default, each on different ports:

| Name    | Port | Description                                                                 | Protocol                                          |
|---------|------|-----------------------------------------------------------------------------|---------------------------------------------------|
| Ingress | 9090 | Acts as an API gateway for all services registered with Restate             | gRPC + [Connect Protocol](https://connect.build/) |
| Storage | 9091 | Exposes raw RocksDB read-only storage operations, used by the CLI           | gRPC                                              |
| Meta    | 8081 | Allows for CRUD operations on service metadata, eg for service registration | REST                                              |

It will store metadata and RocksDB data in the relative directory of /target under the current working directory of the process.

It requires outbound connectivity to services in order to discover them and to send requests.

### In Kubernetes
The recommended Kubernetes deployment strategy is a one-replica StatefulSet. We recommend installing Restate in its own namespace.
```yaml
apiVersion: v1
kind: Namespace
metadata:
  labels:
    kubernetes.io/metadata.name: restate
  name: restate
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: restate
  namespace: restate
spec:
  serviceName: restate
  replicas: 1
  selector:
    matchLabels:
      app: restate
  template:
    metadata:
      labels:
        app: restate
    spec:
      imagePullSecrets:
        - name: github
      containers:
        - name: restate
          image: ghcr.io/restatedev/restate-dist:VAR::RESTATE_DIST_VERSION
          env:
            - name: RESTATE_TRACING__LOG_FORMAT
              value: Json
          ports:
            - containerPort: 8081
              name: meta
            - containerPort: 9090
              name: ingress
            - containerPort: 9091
              name: storage
          imagePullPolicy: IfNotPresent
          resources:
            requests: # you may need to adjust these for your use case
              cpu: 100m
              memory: 1Gi
          volumeMounts:
            - mountPath: /target
              name: storage
  volumeClaimTemplates:
    - metadata:
        name: storage
        labels:
          app: restate
      spec:
        accessModes:
          - ReadWriteOnce
        resources:
          requests:
            storage: 64Gi # for example; this is often expandable later anyway
---
apiVersion: v1
kind: Service
metadata:
  name: restate
  namespace: restate
spec:
  selector:
    app: restate
  ports:
    - port: 8081
      name: meta
    - port: 9090
      name: ingress
    - port: 9091
      name: storage
  type: ClusterIP
```

You will also need to create an image pull secret using a classic github personal access token with the `read:packages` permission.
```bash
$ kubectl create secret docker-registry github --docker-server=ghcr.io --docker-username=<your-github-username> --docker-password=<your-personal-access-token>
```

## Deploying Services
Services in Restate are fairly similar to gRPC services. They speak HTTP2, and are always called *by* Restate; 
they don't make any outbound requests as part of the Restate protocol.

They can be deployed like any gRPC service; a Deployment of more than one replica is generally appropriate. However,
like gRPC services, they must be appropriately load balanced at L7 if you want multiple service pods. Native Kubernetes 
ClusterIP load balancing will lead to the Restate binary sending all requests to a single pod, as HTTP2 connections 
are aggressively reused. This is fine for local testing, but in production an approach must be found. If your
infrastructure already has an approach for L7 load balancing gRPC services, you can use the same approach here. 
Otherwise, some recommended approaches are detailed below:

| Infrastructure  | Approach                                                                                                                          |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Istio / LinkerD | Ensure sidecar is injected into Restate pod and all service pods                                                                  |
| Cilium          | Ensure Cilium is installed with `loadBalancer.l7.backend=envoy`, and annotate service pods with `service.cilium.io/lb-l7=enabled` |
| Minikube        | For local development it's likely not worth worrying about; see below                                                             |
| Any             | Use an envoy sidecar on the restate pod; see below                                                                                |

### Local Kubernetes development
A simple deployment setup (eg, for local use with Minikube) with a single pod in Kubernetes is as follows:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: service
spec:
  replicas: 1
  selector:
    matchLabels:
      app: service
  template:
    metadata:
      labels:
        app: service
    spec:
      containers:
        - name: service
          image: path.to/yourrepo:yourtag
          ports:
            - containerPort: 8080
              name: http2
---
apiVersion: v1
kind: Service
metadata:
  name: service
spec:
  selector:
    app: service
  ports:
    - port: 8080
      name: http2
  type: ClusterIP
```

L7 load balancing is not needed when there is only one pod, so it's acceptable to use a normal ClusterIP Service.

### Simple L7 load balancing with an envoy sidecar
A simple approach to L7 load balancing is to set up an Envoy sidecar in the Restate pod which acts as a transparent HTTP proxy
which will resolve and L7 load balance to Kubernetes Services based on their DNS name. For this to work, Services must be
deployed as Headless, ie without a ClusterIP. This is achieved by specifying `clusterIP: None` in a `type: ClusterIP` Service.

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: restate
  namespace: restate
spec:
  # ...
  template:
    spec:
      containers:
        - name: restate
          # ...
          env:
            - name: HTTP_PROXY
              value: 127.0.0.1:10001
          # ...
        - name: envoy
          image: envoyproxy/envoy:distroless-v1.26.1
          volumeMounts:
            - name: envoy-config
              mountPath: /etc/envoy
      # ...
      volumes:
        - name: envoy-config
          configMap:
            name: envoy-config
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: envoy-config
data:
  envoy.yaml: |
    static_resources:
      listeners:
        - name: proxy
          address:
            socket_address:
              address: "127.0.0.1"
              port_value: 10001
          filter_chains:
            - filters:
                - name: envoy.filters.network.http_connection_manager
                  typed_config:
                    '@type': type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
                    stat_prefix: egress_http
                    stream_idle_timeout: 0s
                    route_config:
                      name: local_route
                      virtual_hosts:
                        - name: http
                          domains: ['*']
                          routes:
                            - match: {prefix: /}
                              route:
                                cluster: dynamic_forward_proxy_cluster
                                timeout: 0s
                    http_filters:
                      - name: envoy.filters.http.dynamic_forward_proxy
                        typed_config:
                          '@type': type.googleapis.com/envoy.extensions.filters.http.dynamic_forward_proxy.v3.FilterConfig
                          dns_cache_config:
                            name: dynamic_forward_proxy_cache_config
                            dns_refresh_rate: 5s
                      - name: envoy.filters.http.router
                        typed_config:
                          "@type": type.googleapis.com/envoy.extensions.filters.http.router.v3.Router
      clusters:
        - name: dynamic_forward_proxy_cluster
          connect_timeout: 1s
          lb_policy: CLUSTER_PROVIDED
          # assume http2 in upstream
          http2_protocol_options: {}
          cluster_type:
            name: envoy.clusters.dynamic_forward_proxy
            typed_config:
              '@type': type.googleapis.com/envoy.extensions.clusters.dynamic_forward_proxy.v3.ClusterConfig
              dns_cache_config:
                name: dynamic_forward_proxy_cache_config
                dns_refresh_rate: 5s
```

## Discovering Services
Services are always called *by* Restate, and communicate with Restate only through their responses. As such, Restate acts as
an API gateway, and must know how to convert a service name like `greeter.Greeter` into the right endpoint to reach out to.
We inform Restate of this via 'discovery'; we give it the endpoint, and it will use reflection to determine the relevant
services, methods and request/response objects hosted there. This needs to be done whenever you add a new service, and
when you add new methods to existing services. Discovering a service again is always safe.

Discovery can be done with a simple HTTP request
```bash
$ curl restate:8081/endpoints --json '{"uri": "http://service:8080"}'
```

For more details on the API, refer to the [Meta operational API docs](./meta-rest-api.mdx#tag/service_endpoint/operation/create_service_endpoint).
