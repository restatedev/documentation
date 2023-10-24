---
sidebar_position: 3
description: "Deploy Restate on Kubernetes with this guide."
---

# Deployment

Restate is currently a single binary that contains everything you need.
It exposes three services by default, each on different ports:

| Name    | Port | Description                                                                 | Protocol                                          |
|---------|------|-----------------------------------------------------------------------------|---------------------------------------------------|
| Ingress | 8080 | Acts as an API gateway for all services registered with Restate             | gRPC + [Connect Protocol](https://connect.build/) |
| Storage | 9071 | Exposes raw RocksDB read-only storage operations, used by the CLI           | gRPC                                              |
| Meta    | 9070 | Allows for CRUD operations on service metadata, eg for service registration | REST                                              |

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
            - containerPort: 9070
              name: meta
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
      name: meta
    - port: 8080
      name: ingress
    - port: 9071
      name: storage
  type: ClusterIP
```

You will also need to create an image pull secret using a classic github personal access token with the `read:packages` permission.

```bash
$ kubectl create secret docker-registry github --docker-server=ghcr.io --docker-username=<your-github-username> --docker-password=<your-personal-access-token>
```

