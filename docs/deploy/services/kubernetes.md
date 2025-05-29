---
title: "Kubernetes"
sidebar_position: 2
description: "Learn how to run Restate applications on Kubernetes."
---

import Admonition from '@theme/Admonition';

# Deploying Restate services to Kubernetes

This page describes how to deploy Restate services on [Kubernetes](https://kubernetes.io/).

Service deployments can be deployed like any Kubernetes service; a Deployment of more than one replica is generally appropriate,
and a Service is used to provide a stable DNS name and IP for the pods.
If your services are running over HTTP2 (the default), each Restate partition will generally have only one TCP connection to a single destination pod.
However, because there are many partitions (by default 24, typically more in a larger cluster) your pods should get a reasonably
even distribution of traffic even without a L7 load balancing solution (Cilium, Istio etc).

### Deployment and Service

A simple deployment setup with a single pod in Kubernetes is as follows:

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
