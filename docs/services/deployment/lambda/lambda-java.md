---
label: "lambda-java"
sidebar_position: 2
description: "Learn how to run Restate Java services on AWS Lambda."
---

# AWS Lambda + Java

## Deploying services as AWS Lambda functions
You can run your Restate services as serverless functions on [AWS Lambda](https://aws.amazon.com/lambda/).

Make sure you have defined a Lambda handler in your service code, as explained in the [serving docs](/services/features/serving#restate-lambda-handler).

Configure the build tool to generate Fat-JARs, so that AWS Lambda can correctly load the JAR. For example, using Gradle:

```kotlin
plugins {
  // ...
  // The shadow plugin generates a shadow JAR ready for AWS Lambda
  id("com.github.johnrengelman.shadow").version("7.1.2")
  // ...
}
```

Now build the Fat-JAR. For example, using Gradle:
```shell
gradle shadowJar
```

Then upload the generated Jar to AWS Lambda, and configure `MyLambdaHandler` as the Lambda class in the AWS UI.

## Managed service
If you'd prefer not to manage a runtime instance, we are trialing a managed service that lets you work
with Lambda services without running any infrastructure or even an API gateway.
See [the documentation](/restate/managed_service) for more details.

## Discovery of services

To let Restate discover the services, execute the following curl command,
pointed at the Restate runtime and with the Lambda function ARN in the data field.

```shell
curl -X POST http://<your-restate-runtime-endpoint>:9070/endpoints -H 'content-type: application/json' -d '{"arn": "arn:aws:lambda:my-region:123456789101:function:my-function:my-version"}'
```

