---
sidebar_position: 3
label: "cdk"
description: "Deploy Restate services on AWS Lambda using CDK."
---

# AWS Cloud Development Kit + Restate

## Deploying Restate services as AWS Lambda functions

You can run your Restate services as serverless functions on [AWS Lambda](https://aws.amazon.com/lambda/).
The [Restate CDK support library](https://www.npmjs.com/package/@restatedev/restate-cdk) provides convenient constructs
for deploying Restate services on AWS Lambda.

[CDK](https://aws.amazon.com/cdk/) provides an elegant way to define your cloud application infrastructure in a familiar
programming language. Currently, we support CDK projects built in TypeScript, but you can deploy Restate handlers in any
language supported by a Restate SDK. CDK is often used to manage serverless application stacks, and the Restate CDK
constructs are the easiest method to deploy and manage Restate services on AWS Lambda.

If you don't have an existing CDK project, follow the CDK [Getting started](https://docs.aws.amazon.com/cdk/v2/guide/hello_world.html)
page to set one up.

### Adding the Restate CDK support library

Add the Restate CDK support library to your project:

```shell
npm install @restatedev/restate-cdk
```

### Deploy your handler code to AWS Lambda

Define one or more Lambda functions in your CDK stack to deploy the service handlers in your chosen language. Depending
on the SDK and programming language, you may need an additional build process such as Gradle, to bundle your business
logic in a Lambda-deployable artifact. 

For example, to deploy a Java or Kotlin service handler to Lambda, you might use the following CDK construct:

```typescript
import * as lambda from "aws-cdk-lib/aws-lambda";

const service: lambda.Function = new lambda.Function(scope, "RestateService", {
  runtime: lambda.Runtime.JAVA_21,
  architecture: lambda.Architecture.ARM_64,
  code: lambda.Code.fromAsset(".../lambda-all.jar"), // use the path of your JAR file artifact
  handler: "com.example.service.package.LambdaHandler", // use the fully qualified name of your handler class
  timeout: cdk.Duration.seconds(10),
});
```

For TypeScript/JavaScript services, you can use the [`NodejsFunction`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda_nodejs-readme.html)
construct to transpile and bundle all the required dependencies.

```typescript
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

const service = new NodejsFunction(scope, "RestateService", {
  runtime: lambda.Runtime.NODEJS_18_X,
  architecture: lambda.Architecture.ARM_64,
  entry: "handler", // use the path to your service handler
});
```

These definitions are no different to how you might deploy any other Lambda handler.

### Register Lambda-based services with Restate

To enable our Lambda-deployed handlers to receive Restate requests, we need to register them with a Restate instance.
We can model existing Restate Cloud instance using the `RestateCloudEndpoint` construct:

```typescript
import * as restate from "@restatedev/restate-cdk";

const restateInstance = new restate.RestateCloudEndpoint(scope, "RestateCloud", {
  clusterId: "restate-cluster-id",
  authTokenSecretArn: restateAuthToken.secretFullArn,
});
```

Automatically register service handlers with Restate on deployment:

```typescript
import * as restate from "@restatedev/restate-cdk";

const handlers = new restate.LambdaServiceRegistry(scope, "RestateServiceRegistry", {
  serviceHandlers: {
    "namespace.Service": service,
  },
  restate: restateInstance,
});
handlers.register({
  metaEndpoint: restateInstance.metaEndpoint,
  invokerRoleArn: restateInstance.invokerRole.roleArn,
  authTokenSecretArn: restateInstance.authToken.secretArn,
});
```

### Deploy a single-node development Restate instance

Restate is [very easy to deploy](https://docs.restate.dev/restate/deployment), and we provide a CDK construct to take
advantage of this to deploy a standalone self-hosted instance running on Amazon EC2. The `SingleNodeRestateInstance`
construct deploys a single-node server and creates a new role that can be assumed by the Restate managed service with
permission to invoke service handlers in your account. The instance will be deployed in a new internet-connected VPC,
unless you provide one explicitly. You can also optionally enable tracing integration, which will grant the instance
role permission to send traces to AWS X-Ray.

```typescript
import * as restate from "@restatedev/restate-cdk";

const restateInstance = new restate.SingleNodeRestateInstance(scope, "RestateServer", {
  restateTag: "latest",
  tracing: restate.TracingMode.AWS_XRAY,
  logGroup: new logs.LogGroup(scope, "RestateLogs", {
    logGroupName: "/restate/server-logs",
    retention: logs.RetentionDays.ONE_MONTH,
  }),
});
```

Note that you still need to register your service handlers with the Restate instance as described earlier. 

For a complete working project, please refer to one of the examples below.

## Complete examples

You can use the following examples as references for your own CDK projects:

- [hello-world-lambda-cdk](https://github.com/restatedev/examples/tree/main/kotlin/hello-world-lambda-cdk) - provides a
  simple example of a Lambda-deployed Kotlin handler
- [Restate Holiday](https://github.com/restatedev/restate-holiday) - a more complex example of a fictional reservation
  service demonstrating the Saga orchestration pattern
