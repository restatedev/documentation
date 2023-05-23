---
sidebar_position: 11
description: "Discover how you can deploy Restate across diverse infrastructures."
---

# Deployment and Operations

## Deploying long-running services
You can deploy long-running Restate Typescript services in any preferred way,
as long as the Restate runtime can communicate with them.
Besides that, Restate does not add any requirements on how they are deployed. 

For example, you can package them as a Docker container and run them on Kubernetes or on any other container platform
(e.g. AWS ECS, AWS Fargate).

:::tip 
Have a look at the [shopping cart example](https://github.com/restatedev/example-shopping-cart-typescript) to see some possible deployment options in action: 
Kubernetes, AWS ECS and a local Docker setup.
:::

## Deploying Lambda functions

You can run your Restate services as serverless functions on [AWS Lambda](https://aws.amazon.com/lambda/). 

:::tip
Please take a look at [the Greeter example](https://github.com/restatedev/example-lambda-ts-greeter) to learn how to deploy your Restate service as a Lambda function.
:::

### Deploying Lambda services
To deploy a Restate service as a Lambda function,
you can follow the [guidelines of AWS](https://docs.aws.amazon.com/lambda/latest/dg/typescript-package.html)
for deploying plain Typescript NodeJS functions. Restate does not add any complexity to this. You build a zip file containing the application code and dependencies and upload this to AWS Lambda.

AWS Lambda assumes that the handler can be found under `index.handler` in the uploaded code.
By default, this is also the case for the Lambda functions developed with the Restate SDK.


:::caution
Restate assumes that requests come through API Gateway.
So you have to configure API Gateway to sit in front of your Lambda function.
:::

### Discovery of services

To let Restate discover the services, execute the following curl command,
pointed at the Restate runtime and with the Lambda function endpoint as the URI in the data field. 


```shell
curl -X POST http://<your-restate-runtime-endpoint>:8081/endpoint/discover -H 'content-type: application/json' -d '{"uri": "https://<lambda-function-endpoint>/default/<my-service>"}'
```

If your Lambda function requires authentication via an API key,
then you can add this API key to the discovery request to the Restate runtime, as follows:

```shell
curl -X POST http://<your-restate-runtime-endpoint>:8081/endpoint/discover -H 'content-type: application/json' -d '{"uri": "https://<lambda-function-endpoint>/default/<my-service>","additional_headers": {"x-api-key": "someapikey"} }'
```

Here, we added the API key as an additional header to the JSON data of the request.
Replace `someapikey` by your API key.
The Restate runtime will use this API key for all subsequent requests to the Lambda function.

## Logging
The Restate SDK allows different log levels by setting the environment variable `RESTATE_DEBUG_LOG`.
- default: only logs for major events (initial discovery and persistent issues). 
- `RESTATE_DEBUG_LOG=LOG`: Use this to get debug logs per invocation.
- `RESTATE_DEBUG_LOG=MESSAGES`: Use this to get debug logs per invocation, including the messages that are sent.


# 🏁 Finished reading?
You should now have a good understanding of how Restate Typescript services are implemented. 

:::note Looking for next steps?
Have a look at [our examples](/examples) to take your understanding of Restate to the next level!
:::
