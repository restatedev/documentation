---
sidebar_position: 2
description: "Learn how to run Restate Java services on AWS Lambda."
---

# AWS Lambda + Java

## Deploying services as AWS Lambda functions
You can run your Restate services as serverless functions on [AWS Lambda](https://aws.amazon.com/lambda/).

Make sure you have defined a Lambda handler in your service code, as explained in the [serving docs](/services/sdk/serving#restate-lambda-handler).

Configure the build tool to generate Fat-JARs, which are required by AWS Lambda to correctly load the JAR. For example, using Gradle:

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

You can now upload the generated Jar in AWS Lambda, and configure `MyLambdaHandler` as the Lambda class in the AWS UI.


## Managed service
If you'd prefer not to manage a runtime instance, we are trialing a managed service that lets you work
with Lambda services without running any infrastructure or even an API gateway.
See [the documentation](/restate/managed_service) for more details.

## Discovery of services

To let Restate discover the services, execute the following curl command,
pointed at the Restate runtime and with the Lambda function endpoint as the URI in the data field.


```shell
curl -X POST http://<your-restate-runtime-endpoint>:9070/endpoints -H 'content-type: application/json' -d '{"uri": "https://<lambda-function-endpoint>/default/<my-service>"}'
```

If your Lambda function requires authentication via an API key,
then you can add this API key to the discovery request to the Restate runtime, as follows:

```shell
curl -X POST http://<your-restate-runtime-endpoint>:9070/endpoints -H 'content-type: application/json' -d '{"uri": "https://<lambda-function-endpoint>/default/<my-service>","additional_headers": {"x-api-key": "someapikey"} }'
```

Here, we added the API key as an additional header to the JSON data of the request.
Replace `someapikey` by your API key.
The Restate runtime will use this API key for all subsequent requests to the Lambda function.

