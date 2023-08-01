---
sidebar_position: 4
description: "Learn how to run Restate applications on AWS Lambda."
---

# AWS Lambda

## Deploying services as AWS Lambda functions
You can run your Restate services as serverless functions on [AWS Lambda](https://aws.amazon.com/lambda/).

:::tip
Please take a look at [the Lambda deployment documentation](/services/deployment/lambda) to learn how to deploy your Restate service as a Lambda function.
:::

To deploy a Restate service as a Lambda function,
you can follow the [guidelines of AWS](https://docs.aws.amazon.com/lambda/latest/dg/typescript-package.html)
for deploying plain Typescript NodeJS functions. Restate does not add any complexity to this. You build a zip file containing the application code and dependencies and upload this to AWS Lambda. If you are using the Restate node template, then you can create a zip file with:

```
npm run bundle
```

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
curl -X POST http://<your-restate-runtime-endpoint>:8081/endpoints -H 'content-type: application/json' -d '{"uri": "https://<lambda-function-endpoint>/default/<my-service>"}'
```

If your Lambda function requires authentication via an API key,
then you can add this API key to the discovery request to the Restate runtime, as follows:

```shell
curl -X POST http://<your-restate-runtime-endpoint>:8081/endpoints -H 'content-type: application/json' -d '{"uri": "https://<lambda-function-endpoint>/default/<my-service>","additional_headers": {"x-api-key": "someapikey"} }'
```

Here, we added the API key as an additional header to the JSON data of the request.
Replace `someapikey` by your API key.
The Restate runtime will use this API key for all subsequent requests to the Lambda function.



## Tutorial

This tutorial shows how to deploy a greeter service written with the Restate Typescript SDK on AWS Lambda.

[Go to the GitHub repository of this tutorial](https://github.com/restatedev/example-lambda-ts-greeter/tree/v0.0.1)

### Prerequisites
> &#x1F4DD; As long as Restate hasn't been launched publicly, you need to have access to the private Restate npm packages and Docker container. Please follow the instructions in the [restate-dist](https://github.com/restatedev/restate-dist) Readme to set up access: 

- [NodeJS (and npm)](https://nodejs.org)
- [Docker Engine](https://docs.docker.com/engine/install/) or [Podman](https://podman.io/docs/installation) to launch the Restate runtime (not needed for the app implementation itself).
- [curl](https://everything.curl.dev/get)
- An AWS account with permissions for Lambda and API Gateway.

### Clone the repository

Clone the GitHub repository for the latest release:
```shell
git clone --depth 1 --branch VAR::LAMBDA_GREETER_VERSION git@github.com:restatedev/example-lambda-ts-greeter.git
```

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

Let's add an API Gateway in front of our function. Click on `Add trigger` below your function in the function overview.
Select API Gateway as a source and fill in the following:

![API GW configuration](/img/api-gw-config.png)

If you select `open` for Security, your function will be publicly reachable!
If you select `API key` for Security, then the requests to your API Gateway require an API key in the header.

Click on `Add` to create the API gateway for your Lambda function.

You should now see the API gateway appear in the function overview:

![Overview with API GW](/img/overview-with-apigw.png)

The next step is uploading the zip file with our function code.
Open the `Code` tab in the section below the function overview.
Click on `Upload from` and select your zip file.
You should now see the uploaded code in the browser editor.

By default, Lambda assumes that your handler can be found under `index.handler`.
So this means that you should have the Restate Lambda handler assigned to `export const handler` in the file `src/app.ts`, as shown in the code.
This handler will then be included in `index.js` after creating the zip, and be used by AWS Lambda as the entry point of the Lambda function.
To change that you can scroll down to `Runtime settings` and change the handler reference.

One last step before we are in business!
We still need to tell the API Gateway how to forward requests to our Lambda functions and deploy the API.

Go to your API Gateway by clicking on it in the function overview.
Then click on the name of the API Gateway to get directed to the API Gateway configuration.
You should now be in the `Resources` overview of your API Gateway.

![API GW Resource](/img/resource-apigw.png)

In the left-upper corner, click on `Actions` and select `Create resource` from the dropdown.
We configure the resource as a proxy resource, that just forwards all requests to our Lambda function:

![Create resource](/img/create-resource.png)

Click on `Create resource`. Now, we need to specify to which Lamda function our requests should be forwarded.

![Setup proxy](/img/setup-proxy.png)

Click `Save` and confirm that you want your API Gateway to have permission to invoke your Lambda function.

You should now see the proxy added to the resources

![Proxy resource](/img/proxy-resource.png)

To configure that we want to use an API key for authentication,
click on `Method Request` and set `API Key Required` to `true`.
If you do this,
make sure that you create an API key and link it to your Lambda function and deployment stage via a usage plan.
To do this:
- Go to the API Gateway console and then to `API Keys`.
- Click on the `Actions` dropdown and select `Create API key`.
- Give the API key a name and leave it as an auto generated key.
- After the successful creation, click on `Add to Usage Plan`
- When you deployed your function, a usage plan should have been created. Type in the name of your function and you should see the name of the usage plan pop up with this format: `my-greeter-UsagePlan`
- After linking your usage plan to your API key, click on the usage plan name, to go to the settings of the usage plan.
- If the usage plan has no stage linked to it yet, click on `Add API stage`. Type in the name of the API: `my-greeter-API`. And select a stage. In our case: `default`. Save by clicking on the checkmark.


Now let's deploy the API. Go back to the API Gateway overview of our greeter. Click again on `Actions` and select `Deploy API`.
Select `default` as the deployment stage and click on `Deploy`.

Our API Gateway and Lambda function should now be working!

You can see the invoke URL by going to `Stages` and then following the path to the endpoint you want to invoke.
For example `default/my-greeter`. The invoke URL will be printed on top of the page.

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

### Sending requests your Lambda function

#### Running the Restate runtime

You don't necessarily need to run the Restate runtime on AWS.
You can also run the Restate runtime locally in a Docker container to test your Lambda function:

- On Linux
```shell
docker run --name restate_dev --rm -d --network=host ghcr.io/restatedev/restate-dist:VAR::RESTATE_DIST_VERSION
```
- On macOS:
```shell
docker run --name restate_dev --rm -d -p 8081:8081 -p 9091:9091 -p 9090:9090 ghcr.io/restatedev/restate-dist:VAR::RESTATE_DIST_VERSION
```

Consult the runtime logs via `docker logs restate_dev`.

Stop the runtime (and remove any intermediate state) with `docker stop restate_dev`.

### Discovering the services behind the Lambda endpoint

Connect to the Restate (e.g. via an SSH session if it is running on EC2) runtime and execute the discovery curl command:

```shell
curl -X POST http://<your-restate-runtime-endpoint>:8081/endpoints -H 'content-type: application/json' -d '{"uri": "https://<lambda-function-endpoint>/default/my-greeter", "additional_headers": {"x-api-key": "your-api-key"} }'
```

If you are running the runtime locally, replace `<your-restate-runtime-endpoint>` by `localhost`.
If the runtime is running somewhere else, then replace it accordingly.

If you have set up API key authentication for the API Gateway and Lambda,
then you can add the API key as an additional header in the discovery request.
You can find the API key in the API Gateway console by going to `API Keys` and then selecting the key of your function.
After the discovery, the runtime uses this API key for all subsequent requests to the Lambda function.

If your Lambda function does not require an API key then you can do the discovery without the additional headers:
```shell
curl -X POST http://<your-restate-runtime-endpoint>:8081/endpoints -H 'content-type: application/json' -d '{"uri": "https://<lambda-function-endpoint>/default/my-greeter"}'
```

When executing this command, you should see the discovered services printed out!

```json
{"services":["org.example.Greeter"]}
```

#### Send requests

Now let's invoke the `MultiWord` method of our service! Don't forget to replace `<your-restate-runtime-endpoint>` accordingly.

```shell
curl -X POST http://<your-restate-runtime-endpoint>:9090/org.example.Greeter/MultiWord -H 'content-type: application/json' -d '{"name": "Pete"}'
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
