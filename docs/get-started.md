---
sidebar_position: 2
---

# Get started
[//]: # (TODO This should be a more interesting example)
[//]: # (TODO Add extra explanation about what we are doing)
This guide will take you through your first steps with Restate. Let's build a small example from scratch!

## Prerequisites
- Node.js installed on your machine. You can download it from the official Node.js website: https://nodejs.org/en/
- Docker installed on your machine. You can download it from the official Docker website: https://docs.docker.com/engine/install/

## Step 1: Clone the Node template
We use the [Node template](https://github.com/restatedev/node-template) to get started. This template includes an example of a Typescript Restate service.

- Open your terminal.
- Navigate to the directory where you want to clone the repository.
- Run the following command:
```shell
git clone git@github.com:restatedev/node-template.git
```
- This clones the repository to your local machine.

## Step 2: Install dependencies
- Navigate to the root directory of the project in your terminal.
- Run the following command:
```shell
npm install
```
- This installs all the necessary dependencies for the project.

Now you are all set to start developing your service.

## Step 3: Generate the Proto files
- In your terminal, navigate to the root directory of the project.
- Run the following command:
```shell
npm run proto
```
- This will generate the necessary proto files for the project based on the updated proto definition.


## Step 4: Build and Run the Greeter service
- In your terminal, navigate to the root directory of the project.
- Run the following command:
```shell
npm run build
```
- This will build the app.
- Once the build is complete, run the following command:

```shell
npm run app
```
- This starts the greeter service.

## Step 5: Start the Restate runtime


```shell
docker run -e RUST_LOG=info,restate=debug --network=host ghcr.io/restatedev/restate:latest
```

Discover the services

```shell
curl -X POST http://localhost:8081/services/discover -H 'content-type: application/json' -d '{"uri": "http://localhost:8000"}'
```

## Step 6: Send requests to the Greeter service

We can now invoke the method by

```shell
curl -X POST http://localhost:9090/org.example.ExampleService/SampleCall -H 'content-type: application/json' -d '{"request": "Pete"}'
```

Or via grpcurl:

```shell
grpcurl -plaintext -vv -proto ./proto/example.proto -d '{"request":"1234"}' localhost:9090 org.example.ExampleService/SampleCall
```

That's it! We managed to run our first Restate service.

## Looking for next steps?
Have a look at the following links:

[//]: # (TODO Add links for next steps)