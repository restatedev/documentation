---
sidebar_position: 5
description: "Explore the different ways to invoke Restate services."
---

# Invocation

An invocation is a single call to a service method.

## Invoking Restate services

There are different ways to invoke a Restate service:

* From within another service, as described in the [SDK service communication documentation](/services/sdk/service-communication)
* By sending a request to Restate [over HTTP](/services/invocation#over-http), or [via gRPC or gRPC-web](/services/invocation#grpc-and-grpc-web)

### Over HTTP

You can invoke services over HTTP 1.1 or higher. 
Request/response bodies should be encoded as either JSON or Protobuf.
You can send requests directly from the browser or via `curl` without generating a client.

For example, to invoke the service `org.example.Greeter` method `Greet` using `curl`:

```shell
curl -X POST http://<restate-runtime-host-port>/org.example.Greeter/Greet -H 'content-type: application/json' -d '{"name": "Pete"}'
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

This is supported via the [Connect Protocol](https://connect.build/docs/protocol/), allowing you to send gRPC-like requests as regular HTTP requests.
For more detail, check out the [Connect documentation](https://connect.build/).

### Over gRPC and gRPC-web

You can send requests to your services as regular [gRPC](https://grpc.io/) requests.

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

### Invoke a service idempotently

You can send requests to Restate providing an idempotency key, through the [`Idempotency-Key` header](https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/):

```shell
curl -X POST http://<restate-runtime-host-port>/org.example.Greeter/Greet -H 'idempotency-key: <idempotency-key>' -H 'content-type: application/json' -d '{"name": "Pete"}'
```

After the invocation completes, Restate persists the response for a retention period of 30 minutes.
If you re-invoke the service with the same idempotency key within 30 minutes, Restate sends back the same response and doesn't re-execute the request to the service.

You can tune the retention period by setting the header `idempotency-retention-period: <seconds>`

The `Idempotency-Key` header works with both HTTP and gRPC/gRPC-web.

### Invoke a service without waiting for the response

You can invoke a service without waiting for the response, similar to [one-way calls in the SDK](/services/sdk/service-communication#one-way-calls), by using the Restate built-in `dev.restate.Ingress/Invoke` service method, which can be invoked like any other user service, using gRPC, gRPC-web or Connect.

For example, using [Connect](#connect-grpc-on-http) and `curl`:

```shell
curl -X POST http://<your-restate-runtime-host-port>/dev.restate.Ingress/Invoke -H 'content-type: application/json' -d '{"service": "org.example.Greeter", "method": "Greet", "argument": {"name": "Pete"}}'
```

The response contains the [Invocation identifier](#invocation-identifier). You can use this identifier to cancel or kill the invocation as described in [the below paragraph](#cancel-an-invocation).

For the complete documentation of the `dev.restate.Ingress` built-in service, check out the [Restate protobuf definitions](https://github.com/restatedev/proto/blob/main/dev/restate/services.proto).

:::tip
This feature can be especially useful when you need to invoke a service method implementing a long-running workflow.
:::

## Private services

When registering a service endpoint, every service is by default accessible both by other services, and by sending requests to Restate using HTTP and/or gRPC. You can configure a service as `private`, such that you can't invoke it by sending requests to Restate, through the [Admin APIs](/references/admin-api):

```shell
$ curl -X PATCH <RESTATE_META_ENDPOINT>/services/<SERVICE_NAME> -H 'content-type: application/json' -d '{"public": false}'
```

For example:

```shell
$ curl -X PATCH localhost:9070/services/org.example.ExampleService -H 'content-type: application/json' -d '{"public": false}'
```

You can revert it back to public with `{"public": true}`. Private services can still be reached by other Restate services.
For more details on the API, refer to the [admin API docs](/references/admin-api#tag/service/operation/modify_service). 

## Invocation identifier

Every invocation to a service gets a unique identifier assigned by Restate, called _Invocation identifier_. You can use this identifier to filter your structured logs, find traces, and execute some management operations such as cancelling an invocation.

You can find this identifier in the runtime logs and OpenTelemetry traces by looking for the `restate.invocation.id`, for example:

```log {7}
2023-05-19T15:02:28.656467Z INFO restate_invoker::invocation_task
  Executing invocation at service endpoint
    http.url: http://localhost:9080/invoke/coordinator.Coordinator/Sleep
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

At the moment, gracefully cancelling an invocation is not supported. It will be supported in future Restate releases.

:::

## Kill an invocation

When an invocation fails, Restate retries by default until it can make progress.
For example, if there's a network partitioning, Restate keeps retrying until it can reach the endpoint and make progress.

There are some cases where it is impossible for an invocation to make progress.
A good example is when your code runs a non-deterministic action: If the invocation is suspended and re-scheduled afterwards, the replay of the invocation might lead to a different code path, generating an invalid journal and failing the invocation indefinitely.
In such cases, you can request Restate to kill the invocation, thereby aborting its execution as soon as possible.
If the invocation is ongoing, killing the invocation **will not** roll back its progress.

:::danger

Killing an invocation might leave the service instance in an inconsistent state, just like how killing a process in your operating system may cause the open files to become corrupted. Use it with caution and try to fix the invocation in other ways before resorting to killing it.

:::

To kill an invocation, send the following request to the Restate meta endpoint:

```shell
$ curl -X DELETE <RESTATE_META_ENDPOINT>/invocations/<INVOCATION_IDENTIFIER>
```

For example:

```shell
$ curl -X DELETE http://localhost:9070/invocations/T4pIkIJIGAsBiiGDV2dxK7PkkKnWyWHE
```

For more details on the API, refer to the [admin API docs](/references/admin-api).

## Invocation execution timeout(s)

For each retry attempt, Restate internally holds an inactivity timer to track whether the service is active and generating some work, such as setting state, invoking other services, etc. This timer can be configured with the option [`worker.invoker.inactivity_timeout`](https://docs.restate.dev/restate/configuration).

Once the `inactivity_timeout` is fired, Restate tries to gracefully suspend the invocation while waiting for an event that triggers the resumption of the invocation. 
When suspending, the Restate SDK will continue executing the service code until it reaches a _suspension point_, that is a point in your service code where it's safe to interrupt the execution, for example when `await`ing on a response from another service.

When suspending, Restate internally starts another timer to protect Restate from connection issues and/or misbehaving code/SDKs that prevent the tear down of the connection. This timer can be configured with the option [`worker.invoker.abort_timeout`](https://docs.restate.dev/restate/configuration).
Once the `abort_timeout` is fired, the connection to the deployment endpoint is closed, and all in-flight progress is discarded.

If you have [side effects](sdk/side-effects) that take more than `inactivity_timeout + abort_timeout` to execute, you might need to tune these timeouts accordingly, for example by increasing the `inactivity_timeout` to a value larger than the expected side effect duration. 
