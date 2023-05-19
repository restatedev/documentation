---
sidebar_position: 3
description: "Learn how to run Restate applications on AWS Lambda."
---

# Running on AWS Lambda

This tutorial shows how to deploy a greeter service written with the Restate Typescript SDK on AWS Lambda.

## Prerequisites
- Restate runtime running in the same region as where you deploy the Lambda function. For example, Restate can be running on ECS, EKS or EC2. But it can also be running locally.
- NodeJS installed
- An AWS account with permissions for Lambda and API Gateway.

## Creating a zip file from our code base

Clone the GitHub repository:
```shell
git clone git@github.com:restatedev/example-lambda-ts-greeter.git
```

We are going to deploy the service defined in `src/app.ts` on AWS Lambda.
To do this, we need to create a zip file that includes the service code and the required dependencies to run it.

First, get all dependencies and build tools:
```
npm install
```

Next, generate the Protobuf code for the gRPC definitions:
```
npm run proto
```

To build the code and make the zip file, do
```
npm run build
```

Note that the build command in `package.json` is the following:
```shell
esbuild src/app.ts --bundle --minify --sourcemap --platform=node --target=es2020 --outfile=dist/index.js
```

This differs from the build command in the node template.
If you are developing a project starting from the template, you may need to adapt this.

## Deploying the Lambda function via the AWS console

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


Now let's deploy the API. Click again on `Actions` and select `Deploy API`.
Select `default` as the deployment stage and click on `Deploy`.

Our API Gateway and Lambda function should now be working!

You can see the invoke URL by going to `Stages` and then following the path to the endpoint you want to invoke.
For example `default/my-greeter`. The invoke URL will be printed on top of the page.

### Testing your Lambda function

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
  "body": "AAAAAAAAAA0KBGFiY2QSAzEyMxgCBAAAAAAAAAhyBgoEUGV0ZQgAAAAAAAAOCgVTVEFURXIFIkZvbyI=",
  "httpMethod": "POST",
  "headers": {
    "content-type": "application/restate"
  },
  "queryStringParameters": {},
  "pathParameters": {},
  "requestContext": {},
  "multiValueHeaders": {},
  "multiValueQueryStringParameters": {},
  "path": "/invoke/org.example.Greeter/Greet",
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

## Sending requests your Lambda function

### Running the Restate runtime

You don't necessarily need to run the Restate runtime on AWS.
You can also run the Restate runtime locally in a Docker container to test your Lambda function:

```shell
docker run -e RUST_LOG=info,restate=debug --network=host ghcr.io/restatedev/restate-dist:latest
```

### Discovering the services behind the Lambda endpoint

// **WARNING**: In the future, the way services are discovered will probably change and will not require the discovery curl anymore.

Connect to the Restate (e.g. via an SSH session if it is running on EC2) runtime and execute the discovery curl command:

```shell
curl -X POST http://<your-restate-runtime-endpoint>:8081/endpoint/discover -H 'content-type: application/json' -d '{"uri": "https://<lambda-function-endpoint>/default/my-greeter"}'
```

If you are running the runtime locally, replace `<your-restate-runtime-endpoint>` by `localhost`.
If the runtime is running somewhere else, then replace it accordingly.

If you have set up API key authentication for the API Gateway and Lambda,
then you can add the API key as an additional header in the discovery request.
You can find the API key in the API Gateway console by going to `API Keys` and then selecting the key of your function.
After copying the key, execute the following command.

```shell
curl -X POST http://<your-restate-runtime-endpoint>:8081/endpoint/discover -H 'content-type: application/json' -d '{"uri": "https://<lambda-function-endpoint>/default/my-greeter", "additional_headers": {"x-api-key": "your-api-key"} }'
```

Replace `<your-restate-runtime-endpoint>`, `<lambda-function-endpoint>` and `"your-api-key"` accordingly.

The runtime will then use this API key for all subsequent requests to the Lambda function.

When executing this command, you should see the discovered services printed out!

```json
{"services":["org.example.Greeter"]}
```

### Send requests

Now let's invoke our service! Don't forget to replace `<your-restate-runtime-endpoint>` accordingly.

```shell
curl -X POST http://<your-restate-runtime-endpoint>:9090/org.example.Greeter/Greet -H 'content-type: application/json' -d '{"name": "Pete"}'
```

You should see the response:
```json
{"greeting":"Hello Pete"}
```

## 🏁 You did it!
You successfully added a Lambda function as a Restate service and sent requests to it.

Here are some next steps for you to try:
- Try to add a new method to the greeter function and redeploy the Lambda function with the new methods enabled.
- Create and deploy a new Lambda function that calls the greeter function.