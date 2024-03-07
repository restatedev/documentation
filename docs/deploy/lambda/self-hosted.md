---
sidebar_position: 1
description: "Deploy Restate on Kubernetes or to AWS with this guide."
---

# Restate on AWS EC2 with CDK

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

See [deploying Restate services on AWS Lambda with CDK](/deploy/lambda/cdk) for more information on deploying
services.
