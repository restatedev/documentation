---
sidebar_position: 2
description: "Learn how to run Restate applications on Kubernetes."
---

# Kubernetes

This page describes how to deploy Restate and Restate services on [Kubernetes](https://kubernetes.io/).

## Deploying Restate on K8S

The recommended Kubernetes deployment strategy is a one-replica StatefulSet. We recommend installing Restate in its own
namespace. The easiest way to do this is with
our [Helm chart](https://github.com/restatedev/restate/tree/main/charts/restate-helm):

```shell
helm install restate oci://ghcr.io/restatedev/restate-helm --namespace restate --create-namespace
```

:::tip Restate Kubernetes Operator
If you want to run multiple Restate clusters in Kubernetes, or want advanced functionality like online volume expansion
and network policies, you can also use the [Restate Operator](https://github.com/restatedev/restate-operator). Details
of how to install it and deploy a cluster can be found in the README.
:::

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
