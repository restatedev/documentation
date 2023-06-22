---
sidebar_position: 7
---

# Invoking services

There are different ways to invoke a Restate service:

* From within another service, as described in the [SDK service communication documentation](./typescript-sdk/service-communication.md)
* By sending a request to any Restate runtime using either [Connect (gRPC on HTTP)](https://connect.build/docs/protocol/), gRPC or gRPC-web

## Connect (gRPC on HTTP)

Restate supports the [Connect Protocol](https://connect.build/docs/protocol/), allowing you to send gRPC-like requests as regular HTTP requests.

It supports encoding request/response bodies as either JSON or Protobuf, it works on HTTP 1.1 or more, allows you to send requests directly from the browser, and it doesn't require to generate a client.

For example using `curl`:

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

For example, to send a request using [`grpcurl`](https://github.com/fullstorydev/grpcurl):

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

You can invoke a service without waiting for the response, similar to [one-way calls in the SDK](./typescript-sdk/service-communication.md), by using the built-in `dev.restate.Ingress/Invoke` service method. This service can be invoked, like any other service, using gRPC, gRPC-web or Connect.

For example, using [Connect](#connect-grpc-on-http) and `curl`:

```shell
curl -X POST http://<your-restate-runtime-host-port>/dev.restate.Ingress/Invoke -H 'content-type: application/json' -d '{"service": "org.example.Greeter", "method": "Greet", "payload": {"name": "Pete"}}'
```

The response contains the [service invocation identifier](./deployment-operations/manage-invocations.md#service-invocation-identifier). You can use this identifier to manage the invocation as described in ["Manage invocations" documention](deployment-operations/manage-invocations.md).

For a complete documentation of the `dev.restate.Ingress` service, check out the [Restate protobuf definitions](https://github.com/restatedev/proto/blob/main/dev/restate/services.proto).

:::tip
This feature can be especially useful when you need to invoke a service method implementing a long-running workflow.
:::
