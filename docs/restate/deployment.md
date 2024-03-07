---
sidebar_position: 3
description: "Deploy Restate on Kubernetes or to AWS with this guide."
---

# Deployment

Restate is a single binary that contains everything you need to host an environment. See
the [Get Restate](https://restate.dev/get-restate/) page for various ways of obtaining it.

The server process exposes four services by default, available on different ports:

| Name      | Port | Description                                                                                                                    | Protocol                                          |
|-----------|------|--------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------|
| Node-ctrl | 5122 | control port for restate server nodes                                                                                          | gRPC + HTTP for prometheus metrics `/metrics`     |
| Ingress   | 8080 | Acts as an API gateway for all services registered with Restate                                                                | gRPC + [Connect Protocol](https://connect.build/) |
| Admin     | 9070 | Allows for CRUD operations on service/service deployment metadata, eg for service registration                                 | REST                                              |
| Postgres  | 9071 | Exposes Restate RocksDB read-only storage operations using the Postgres protocol. See [Introspection](/services/introspection) | Postgres                                          |

It will store metadata and RocksDB data in the relative directory of /target under the current working directory of the
process.

The Restate server requires outbound connectivity to the services you deploy in order to discover and send requests to
them.

In the next sections we will show you two different ways to deploy Restate on your own infrastructure.

## Kubernetes

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

## Amazon EC2 with CDK

The [Restate CDK support library](https://www.npmjs.com/package/@restatedev/restate-cdk) provides convenient constructs
for managing Restate server deployments on AWS. We currently offer support for a simple single-node deployment to Amazon
EC2.

If you don't have an existing CDK project, follow the
CDK [Getting started](https://docs.aws.amazon.com/cdk/v2/guide/hello_world.html) page to set one up.

### Adding the Restate CDK support library

Add the Restate CDK support library to your project:

```shell
npm install @restatedev/restate-cdk
```

### Deploying a single-node Restate server

The `SingleNodeRestateDeployment` construct deploys a single-node server on Amazon EC2, suitable for development
purposes. An EC2 instance will be created in a new internet-connected VPC – alternatively, you can provide one
explicitly. You can optionally enable tracing integration, which will grant the instance role permission to send traces
to AWS X-Ray.

```typescript
import * as restate from "@restatedev/restate-cdk";

const environment = new restate.SingleNodeRestateDeployment(this, "Restate", {
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
