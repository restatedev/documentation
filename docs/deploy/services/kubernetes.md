---
title: "Standalone/Kubernetes"
sidebar_position: 1
description: "Learn how to run Restate applications on Kubernetes."
---

import Admonition from '@theme/Admonition';

# Deploying Restate services

You can deploy your Restate service on any standalone machine.
If you want to spread load across multiple machines, it is best to put your services behind a load balancer (L4/L7).

<Admonition type="info" title="Running services behind a load balancer">
    If you want to run your service behind a load balancer, please make sure that you configure the load balancer to allow HTTP2 traffic.
</Admonition>

## Deploying Restate services to Kubernetes

Service deployments can be deployed like any Kubernetes service; a Deployment of more than one replica is generally appropriate,
and a Service is used to provide a stable DNS name and IP for the pods.
If your services are running over HTTP2 (the default), each Restate partition will generally have only one TCP connection to a single destination pod.
However, because there are many partitions (by default 24, typically more in a larger cluster) your pods should get a reasonably
even distribution of traffic even without a L7 load balancing solution (Cilium, Istio etc).

### RestateDeployment CRD
The [Restate operator](https://github.com/restatedev/restate-operator) allows for the use of a `RestateDeployment` CRD to deploy your services.
The CRD is an extension of a native `Deployment` object, but will manage registration and [versioning](/operate/versioning) for you, by keeping old
ReplicaSets around with an associated Service object so that in-flight invocations can drain against the old code versions. You can deploy a CRD as follows:

```yaml
apiVersion: restate.dev/v1beta1
kind: RestateDeployment
metadata:
  name: service
spec:
  replicas: 1
  restate:
    register:
      # set this if you want to register against your RestateCluster named 'restate'
      # alternatively, you can set a url or a Service reference to register against
      cluster: restate
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
              name: restate
```

### Kubernetes Deployment and Service definition

If you want to deploy without the operator, a simple deployment setup with a single pod in Kubernetes is as follows:

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
              name: restate
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
      name: restate
  type: ClusterIP
```

You would then register the service at `http://<service>.<namespace>:9080`. Note however that this setup will not account for keeping around old code versions, so updating your code can break in-flight invocations.

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

The service will be accessible at `http://<service-name>.<namespace>` but to handle [versioning](/operate/versioning), it is preferable to register the new revision url like `http://<service-name>-0001.<namespace>` as part of your deployment workflow.

By default Knative exposes the service through the Ingress. This is not required by Restate, and you can disable this behavior adding the argument `--cluster-local` to the aforementioned creation command.
