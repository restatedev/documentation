---
sidebar_position: 5
description: "Explore the different ways to invoke Restate services."
---

# Invocation


There are different ways to invoke a Restate service:

* From within another service, as described in the [SDK service communication documentation](/services/sdk/service-communication)
* By sending a request to any Restate runtime using either [Connect (gRPC on HTTP)](https://connect.build/docs/protocol/), gRPC or gRPC-web

## Connect (gRPC on HTTP)

Restate supports the [Connect Protocol](https://connect.build/docs/protocol/), allowing you to send gRPC-like requests as regular HTTP requests.

It supports encoding request/response bodies as either JSON or Protobuf, it works on HTTP 1.1 or more, allows you to send requests directly from the browser, and it doesn't require to generate a client.

For example, to invoke the service `org.example.Greeter` method `Greet` using `curl`:

```shell
curl -X POST http://<your-restate-runtime-host-port>/org.example.Greeter/Greet -H 'content-type: application/json' -d '{"name": "Pete"}'
```

You should see the response:

```json
{"greeting":"Hello Pete"}
```

The rules to invoke a service are the following:

* The request path is in the format of `{serviceName}/{methodName}`
* The request method is `POST`
* The request body is encoded either with:
    * Json, with the header `Content-Type: application/json`, or with
    * Protobuf, with the header `Content-Type: application/proto`

The response body will have the same content type as the request.

For more details on the Connect protocol, check out the [Connect documentation](https://connect.build/).

## gRPC and gRPC-web

Restate is fully compatible with the [gRPC](https://grpc.io/), meaning you can send requests to your services as regular gRPC requests.

You can use any gRPC code generator to generate a gRPC client to invoke a Restate service. Check out the [awesome-grpc page](https://github.com/grpc-ecosystem/awesome-grpc) for a comprehensive list of clients, code generators and tools.

For example, to invoke the service `org.example.Greeter` method `Greet` using [`grpcurl`](https://github.com/fullstorydev/grpcurl):

```shell
grpcurl -plaintext -d '{"name": "Pete"} <your-restate-runtime-host-port> org.example.Greeter/Greet
```

Restate supports [gRPC reflections](https://github.com/grpc/grpc/blob/master/doc/server-reflection.md), hence some tools like `grpcurl` will automatically discover the protobuf definitions of the services to invoke.

For example, to query the available services in the runtime:

```shell
grpcurl -plaintext <your-restate-runtime-host-port> describe
```

Restate also natively supports gRPC-web. You can use a [gRPC-web code generator](https://www.npmjs.com/package/grpc-web) and point it directly to Restate, without using a 3rd party proxy to translate gRPC-web to gRPC.

## Invoke a service without waiting for the response

You can invoke a service without waiting for the response, similar to [one-way calls in the SDK](/services/sdk/service-communication#one-way-calls), by using the Restate built-in `dev.restate.Ingress/Invoke` service method, which can be invoked like any other user service, using gRPC, gRPC-web or Connect.

For example, using [Connect](#connect-grpc-on-http) and `curl`:

```shell
curl -X POST http://<your-restate-runtime-host-port>/dev.restate.Ingress/Invoke -H 'content-type: application/json' -d '{"service": "org.example.Greeter", "method": "Greet", "payload": {"name": "Pete"}}'
```

The response contains the [Invocation identifier](#invocation-identifier). You can use this identifier to cancel or kill the invocation as described in [the below paragraph](#cancel-an-invocation).

For a complete documentation of the `dev.restate.Ingress` built-in service, check out the [Restate protobuf definitions](https://github.com/restatedev/proto/blob/main/dev/restate/services.proto).

:::tip
This feature can be especially useful when you need to invoke a service method implementing a long-running workflow.
:::

## Hiding services from the ingress

When registering a service endpoint, every service will be by default accessible in the ingress. You can hide a service from the ingress configuring it as `private` through the META REST Operational APIs:

```shell
$ curl -X PATCH <META_ENDPOINT>/services/<SERVICE_NAME> -H 'content-type: application/json' -d '{"public": false}'
```

For example:

```shell
$ curl -X PATCH localhost:8081/services/org.example.ExampleService -H 'content-type: application/json' -d '{"public": false}'
```

You can revert it back to public with `{"public": true}`. When hidden from the ingress, a service can still be accessible from other Restate services.
For more details on the API, refer to the [admin API docs](/references/admin-api#tag/service/operation/modify_service). 


# Manage invocations

Restate offers several tools to manage the ongoing invocations.

## Invocation identifier

Every invocation to a service gets a unique identifier assigned by Restate, called _Invocation identifier_. You can use this identifier to filter your structured logs, find traces, and execute some management operations such as cancelling an invocation.

You can find this identifier in the runtime logs and OpenTelementry traces by looking for the `restate.invocation.id`, for example:

```log {7}
2023-05-19T15:02:28.656467Z INFO restate_invoker::invocation_task
  Executing invocation at service endpoint
    http.url: http://localhost:8080/invoke/coordinator.Coordinator/Sleep
  in restate_invoker::invocation_task::invoker_invocation_task
    rpc.system: "restate"
    rpc.service: coordinator.Coordinator
    restate.invocation.id: T4pIkIJIGAsBiiGDV2dxK7PkkKnWyWHE
```

:::note

The Invocation identifier is opaque and its current format should not be relied on, as it might change in future Restate versions.

:::

## Cancel an invocation

:::caution

At the moment gracefully cancelling an invocation is not supported, It will be supported in future Restate releases.

:::

## Kill an invocation

When something goes wrong during the execution of an invocation, Restate will by default retry until it can make progress again.
For example, if there's a network partitioning, Restate will continue retrying until it can reach the endpoint and make progress.

There are some cases where it is impossible for an invocation to make progress.
A good example is when your code runs a non deterministic action: If the invocation is suspended and re-scheduled afterwards, the replay of the invocation might lead to a different code path, generating an invalid journal and failing the invocation indefinitely.
In such cases, you can request Restate to kill the invocation, aborting its execution as soon as possible.
If the invocation is ongoing, killing the invocation **will not** rollback its progress.

:::danger

Killing an invocation might leave the service instance in an inconsistent state, just like how killing a process in your operating system may cause the open files to become corrupted. Use it with caution and try to fix the invocation in other ways before resorting to killing it.

:::

To kill an invocation, send the following request to the Restate meta endpoint:

```shell
$ curl -X DELETE <META_ENDPOINT>/invocations/<INVOCATION_IDENTIFIER>
```

For example:

```shell
$ curl -X DELETE http://localhost:8081/invocations/T4pIkIJIGAsBiiGDV2dxK7PkkKnWyWHE
```

For more details on the API, refer to the [admin API docs](/references/admin-api).
