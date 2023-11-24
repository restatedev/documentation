---
sidebar_position: 1
description: "Learn how to run Restate Typescript services on AWS Lambda."
---

# AWS Lambda + Typescript

## Deploying services as AWS Lambda functions
You can run your Restate services as serverless functions on [AWS Lambda](https://aws.amazon.com/lambda/).


:::tip
Please take a look at [the Lambda deployment tutorial](/services/deployment/lambda#tutorial) to learn how to deploy your Restate service as a Lambda function.
:::

To deploy a Restate service as a Lambda function,
you can follow the [guidelines of AWS](https://docs.aws.amazon.com/lambda/latest/dg/typescript-package.html)
for deploying plain Typescript NodeJS functions. Restate does not add any complexity to this. You build a zip file containing the application code and dependencies and upload this to AWS Lambda. If you are using the Restate node template, then you can create a zip file with:

```
npm run bundle
```

AWS Lambda assumes that the handler can be found under `index.handler` in the uploaded code.
By default, this is also the case for the Lambda functions developed with the Restate SDK.


## Managed service
If you'd prefer not to manage a runtime instance, we are trialing a managed service that lets you work
with Lambda services without running any infrastructure.
See [the documentation](/restate/managed_service) for more details.

## Discovery of services

To let Restate discover the services, execute the following curl command,
pointed at the Restate runtime and with the Lambda function endpoint as the URI in the data field.


```shell
curl -X POST http://<your-restate-runtime-endpoint>:9070/endpoints -H 'content-type: application/json' -d '{"arn": "arn:aws:lambda:my-region:123456789101:function:my-function:my-version"}'
```

## Tutorial

This tutorial shows how to deploy a greeter service written with the Restate Typescript SDK on AWS Lambda.

[Go to the GitHub repository of this tutorial](https://github.com/restatedev/examples/tree/main/typescript/lambda-greeter)

### Prerequisites

- Latest stable version of [NodeJS](https://nodejs.org/en/) >= v18.17.1 and [npm CLI](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) >= 9.6.7
- [Docker Engine](https://docs.docker.com/engine/install/) or [Podman](https://podman.io/docs/installation) to launch the Restate runtime (not needed for the app implementation itself).
- [curl](https://everything.curl.dev/get)
- An AWS account with permissions for Lambda.

### Clone the repository

Clone the GitHub repository for the latest release:
```shell
git clone --depth 1 git@github.com:restatedev/examples.git
```

You can find the example code in the `typescript/lambda-greeter` directory.
We are going to deploy the service defined in `src/app.ts` on AWS Lambda.
To do this, we need to create a zip file that includes the service code and the required dependencies to run it.

### Creating a zip file from our code base

First, get all dependencies and build tools:
```
npm install
```

Next, generate the 'proto' files for the gRPC definitions:
```
npm run proto
```

To build the code and make the zip file, do
```
npm run bundle
```

### Deploying the Lambda function via the AWS console

Go to the Lambda UI in the AWS console. Click on `Create function`.
Fill in the name of your function. You can leave the settings to the default:

![Create function](/img/create-function.png)

Click `Create function`.

You should now see a function overview with your new function in it.

![Function overview](/img/function-overview.png)

The next step is uploading the zip file with our function code.
Open the `Code` tab in the section below the function overview.
Click on `Upload from` and select your zip file.
You should now see the uploaded code in the browser editor.

By default, Lambda assumes that your handler can be found under `index.handler`.
So this means that you should have the Restate Lambda handler assigned to `export const handler` in the file `src/app.ts`, as shown in the code.
This handler will then be included in `index.js` after creating the zip, and be used by AWS Lambda as the entry point of the Lambda function.
To change that you can scroll down to `Runtime settings` and change the handler reference.

Our Lambda function should now be working!

#### Testing your Lambda function

The AWS console lets you test your Lambda functions.
Go to your Lambda function and click on the `Test` tab.
Here, you can send requests to your Lambda function.

You can test discovery by sending this event JSON to your Lambda function:

```json
{
  "resource": "",
  "stageVariables": null,
  "body": "",
  "httpMethod": "POST",
  "headers": {
    "content-type": "application/proto"
  },
  "queryStringParameters": {},
  "pathParameters": {},
  "requestContext": {},
  "multiValueHeaders": {},
  "multiValueQueryStringParameters": {},
  "path": "/discover",
  "isBase64Encoded": true
}
```
The response should have status code 200 with a long base64 encoded body representing the services,
methods and Protobuf metadata behind the Lambda endpoint.

To test the greet method, you can send the following event JSON:

```json
{
  "resource": "",
  "stageVariables": null,
  "body": "AAAAAAAAABsKEAGI6GNZE3i3iJ6H90kF2CsSBQRQZXRlGAEEAAABAAAACHIGCgRQZXRl",
  "httpMethod": "POST",
  "headers": {
    "content-type": "application/restate"
  },
  "queryStringParameters": {},
  "pathParameters": {},
  "requestContext": {},
  "multiValueHeaders": {},
  "multiValueQueryStringParameters": {},
  "path": "/invoke/org.example.Greeter/MultiWord",
  "isBase64Encoded": true
}
```

The response should be the following:

```json
{
  "headers": {
    "content-type": "application/restate"
  },
  "statusCode": 200,
  "isBase64Encoded": true,
  "body": "BAEAAAAAAA5yDAoKSGVsbG8gUGV0ZQ=="
}
```

The body is the base64 encoded string of the response, and stands for `{"value":"Hello Pete"}`.

### Sending requests to your Lambda function

#### Running the Restate runtime

You don't necessarily need to run the Restate runtime on AWS, but it does need to be able to obtain credentials to invoke your Lambda.
You can run the Restate runtime locally in a Docker container to test your Lambda function, using your local AWS creds (defined in ~/.aws).

If you use SSO, the AWS Rust SDK currently requires a minor change to your ~/.aws/config to support this;
see https://github.com/awslabs/aws-sdk-rust/issues/703#issuecomment-1811480196.

- On Linux
```shell
docker run -e AWS_PROFILE -v ~/.aws/:/root/.aws --name restate_dev --rm -d --network=host docker.io/restatedev/restate:VAR::RESTATE_VERSION
```
- On macOS:
```shell
docker run -e AWS_PROFILE -v ~/.aws/:/root/.aws --name restate_dev --rm -d -p 8080:8080 -p 9070:9070 -p 9071:9071 docker.io/restatedev/restate:VAR::RESTATE_VERSION
```

Consult the runtime logs via `docker logs restate_dev`.

Stop the runtime (and remove any intermediate state) with `docker stop restate_dev`.

### Discovering the services behind the Lambda endpoint

Connect to the Restate (e.g. via an SSH session if it is running on EC2) runtime and execute the discovery curl command:

```shell
curl -X POST http://<your-restate-runtime-endpoint>:9070/endpoints -H 'content-type: application/json' -d '{"arn": "<lambda-function-arn>"  }'
```

If you are running the runtime locally, replace `<your-restate-runtime-endpoint>` by `localhost`.
If the runtime is running somewhere else, then replace it accordingly.

When executing this command, you should see the discovered services printed out!

```json
{"services":["org.example.Greeter"]}
```

#### Send requests

Now let's invoke the `MultiWord` method of our service! Don't forget to replace `<your-restate-runtime-endpoint>` accordingly.

```shell
curl -X POST http://<your-restate-runtime-endpoint>:8080/org.example.Greeter/MultiWord -H 'content-type: application/json' -d '{"name": "Pete"}'
```

You should see the response:
```json
{"greeting":"Hello Pete no.1!"}
```

This method increases a counter that is keyed by the name in the request. Send some subsequent requests for different names and watch the counters incrementing.

:::tip
The counters are stored in Restate. Restate supplies the state together with the request when it invokes the Lambda function.
So your Lambda function does not need to worry about setting up connections to session databases etc.
This makes the code easier and the execution faster.
:::

### 🏁 You did it!
You successfully added a Lambda function as a Restate service and sent requests to it.

Here are some next steps for you to try:
- Add a new method to the greeter function and redeploy the Lambda function with the new methods enabled.
- Create and deploy a new Lambda function that calls the greeter function.
