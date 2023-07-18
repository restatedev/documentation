---
sidebar_position: 2
---

# Deployment

This page contains some walkthroughs to deploy Restate and services.

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

## Deploying services

Restate services are deployed within *Service endpoints*. The Restate runtime interacts with service endpoints by sending requests to them using a custom protocol on top of HTTP.

A service endpoint can be deployed as a Lambda function, a Kubernetes pod, a Knative Service, or any other deployment environment where the service endpoint can be reached at a specific URL.

The URL (including path prefix) MUST be **unique**, meaning that no two service endpoints with the same URL can exist at the same time in a Restate instance.

Moreover, service endpoints are **immutable**, and are assumed to be reacheable throughout the entire lifecycle of an invocation. To deploy any change to a service, either in the Protobuf definition or in the business logic, you should deploy a new service endpoint with a new URL. See the [versioning documentation](./versioning.md) for more details on how to update services.

### Deploying service endpoints

Service endpoints can be deployed like any gRPC service; a Deployment of more than one replica is generally appropriate. However,
like gRPC services, they must be appropriately load balanced at L7 if you want multiple service endpoint pods. Native Kubernetes 
ClusterIP load balancing will lead to the Restate binary sending all requests to a single pod, as HTTP2 connections 
are aggressively reused. This is fine for local testing, but in production an approach must be found. If your
infrastructure already has an approach for L7 load balancing gRPC services, you can use the same approach here. 
Otherwise, some recommended approaches are detailed below:

| Infrastructure  | Approach                                                                                                                          |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Knative         | Use Knative for autoscaling, scale to zero and the integrated L7 load balancing                                                   |
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

### Knative

Restate supports Knative services. Knative allows scaling to zero when there are no in-flight invocations and automatically configures an L7 load balancer. There are no special requirements to deploy a service endpoint container with Knative:

```shell
$ kn service create service-name --port h2c:8080 --image path.to/yourrepo:yourtag
```

Or using the YAML manifest:

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: service-name
spec:
  template:
    spec:
      containers:
        - image: path.to/yourrepo:yourtag
          ports:
            - name: h2c
              containerPort: 8080
```

The service will be accessible at `http://<service-name>.<namespace>.svc`.

By default Knative exposes the service through the Ingress. This is not required by Restate, and you can disable this behavior adding the argument `--cluster-local` to the aforementioned creation command.

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
          upstream_connection_options:
            tcp_keepalive: {}
          cluster_type:
            name: envoy.clusters.dynamic_forward_proxy
            typed_config:
              '@type': type.googleapis.com/envoy.extensions.clusters.dynamic_forward_proxy.v3.ClusterConfig
              dns_cache_config:
                name: dynamic_forward_proxy_cache_config
                dns_refresh_rate: 5s
```

### Registering service endpoints

After deploying a service endpoint, in order to use it, it must be registered with Restate as follows with curl  (>v7.82.0):

```bash
$ curl <RESTATE_META_ENDPOINT>/endpoints --json '{"uri": "<SERVICE_ENDPOINT_URI>"}'
```

When registering a service endpoint, Restate uses a mechanism similar to "reflections" to discover the available services and their schemas and properties. A service can be registered only once, and subsequent registration requests to the same service endpoint will fail. For more details on how to update services, check the [versioning documentation](./versioning.md).

The service endpoint creation can be forced to overwrite an existing endpoint using curl (>v7.82.0):

```bash
$ curl <RESTATE_META_ENDPOINT>/endpoints --json '{"uri": "<SERVICE_ENDPOINT_URI>", "force": true}'
```

This will forcefully overwrite the existing endpoint with the same uri, forcing the discovery process again. It will also remove services that were served by that endpoint and are not available anymore.

:::warning
Forcing an endpoint registration is a feature designed to simplify local Restate service development, and should never be used in a production Restate deployment, as it potentially breaks all the in-flight invocations to that endpoint. 
:::

For more details on the API, refer to the [Meta operational API docs](./meta-rest-api.mdx#tag/service_endpoint/operation/create_service_endpoint).
