---
sidebar_position: 2
description: "Learn how to run Restate applications on Kubernetes."
---

# Kubernetes

This page describes how to deploy Restate and Restate services on [Kubernetes](https://kubernetes.io/).

## Deploying Restate on K8S
The recommended Kubernetes deployment strategy is a one-replica StatefulSet. We recommend installing Restate in its own
namespace.

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
          image: docker.io/restatedev/restate:VAR::RESTATE_VERSION
          env:
            - name: RESTATE_TRACING__LOG_FORMAT
              value: Json
          ports:
            - containerPort: 9070
              name: admin
            - containerPort: 8080
              name: ingress
            - containerPort: 9071
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
    - port: 9070
      name: admin
    - port: 8080
      name: ingress
    - port: 9071
      name: storage
  type: ClusterIP
```

## Deploying Restate services on K8S
Service deployments can be deployed like any gRPC service; a Deployment of more than one replica is generally appropriate. However,
like gRPC services, they must be appropriately load balanced at L7 if you want multiple service deployment pods. Native Kubernetes
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
          env:
            - name: PORT
              value: "9080"
          ports:
            - containerPort: 9080
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
    - port: 9080
      name: http2
  type: ClusterIP
```

L7 load balancing is not needed when there is only one pod, so it's acceptable to use a normal ClusterIP Service.

### Knative

Restate supports Knative services. Knative allows scaling to zero when there are no in-flight invocations and automatically configures an L7 load balancer. There are no special requirements to deploy a service deployment container with Knative:

```shell
$ kn service create service-name --port h2c:9080 --image path.to/yourrepo:yourtag
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
              containerPort: 9080
```

The service will be accessible at `http://<service-name>.<namespace>.svc`.

By default Knative exposes the service through the Ingress. This is not required by Restate, and you can disable this behavior adding the argument `--cluster-local` to the aforementioned creation command.

### Simple L7 load balancing with an Envoy sidecar

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
          image: envoyproxy/envoy:distroless-v1.27-latest
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
                          sub_cluster_config: {}
                      - name: envoy.filters.http.router
                        typed_config:
                          "@type": type.googleapis.com/envoy.extensions.filters.http.router.v3.Router
      clusters:
        - name: dynamic_forward_proxy_cluster
          connect_timeout: 1s
          lb_policy: CLUSTER_PROVIDED
          # assume http2 in upstream
          http2_protocol_options:
            connection_keepalive:
              interval: 40s
              timeout: 20s
          cluster_type:
            name: envoy.clusters.dynamic_forward_proxy
            typed_config:
              '@type': type.googleapis.com/envoy.extensions.clusters.dynamic_forward_proxy.v3.ClusterConfig
              sub_clusters_config:
                lb_policy: ROUND_ROBIN
```