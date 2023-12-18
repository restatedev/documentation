---
sidebar_position: 3
description: "Deploy Restate on Kubernetes with this guide."
---

# Deployment

Restate is currently a single binary that contains everything you need.
It exposes three services by default, each on different ports:

| Name     | Port | Description                                                                                                                    | Protocol                                          |
|----------|------|--------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------|
| Ingress  | 8080 | Acts as an API gateway for all services registered with Restate                                                                | gRPC + [Connect Protocol](https://connect.build/) |
| Admin    | 9070 | Allows for CRUD operations on service/endpoint metadata, eg for service registration                                           | REST                                              |
| Postgres | 9071 | Exposes Restate RocksDB read-only storage operations using the Postgres protocol. See [Introspection](/services/introspection) | Postgres                                          |

It will store metadata and RocksDB data in the relative directory of /target under the current working directory of the process.

It requires outbound connectivity to services in order to discover them and to send requests.

### Kubernetes

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

You will also need to create an image pull secret using a classic github personal access token with the `read:packages` permission.

```bash
$ kubectl create secret docker-registry github --docker-server=ghcr.io --docker-username=<your-github-username> --docker-password=<your-personal-access-token>
```


### Amazon EC2 with CDK

The `SingleNodeRestateInstance` construct deploys a single-node server on Amazon EC2, suitable for development purposes.
A single EC2 instance will be deployed in a new internet-connected VPC – or you can provide one explicitly. You can
optionally enable tracing integration, which will grant the instance role permission to send traces to AWS X-Ray.

```typescript
import * as restate from "@restatedev/restate-cdk";

const restateService = new restate.SingleNodeRestateInstance(scope, "RestateServer", {
  restateTag: "latest",
  tracing: restate.TracingMode.AWS_XRAY,
  logGroup: new logs.LogGroup(scope, "RestateLogs", {
    logGroupName: "/restate/server-logs",
    retention: logs.RetentionDays.ONE_MONTH,
  }),
});
```

See [deploying Restate services on AWS Lambda with CDK](/services/deployment/cdk) for more information on deploying
services.
