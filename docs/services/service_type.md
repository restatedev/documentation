---
sidebar_position: 1
description: "Restate supports keyed, unkeyed, and singleton services."
---

# Service types

Restate provides different state semantics and concurrency properties for services, that you can choose from when defining the service.

Services can be categorized in three different types:

1. **Keyed service**: All service invocations are sharded on a user-defined key.
2. **Singleton service**: All service invocations are executed serially, and the state is shared among every invocation.
3. **Unkeyed service**: All service invocations run in parallel, and there is no shared state among invocations.

To define the service type and key, check the [service contract](/services/service_type#restate-service-contract) documentation.

## Keyed service

Keyed services allow to shard state and workload by a user-defined key. Each key will have its own invocations queue and its own state. There is at most one invocation per key, but there can be multiple invocations to the same service with different keys executing concurrently.

You can think of a keyed service as a class, and of a service instance as an object instance of that class. The key is the field that **uniquely** identifies that instance, and state entries are the other fields of that class.

A common use case for keyed services is to model an entity of your application. For example, a `CustomerService` could model a customer, where the key is the customer id card number, the state defines the properties of the customer and the methods define the operations on it. 

### Ordering guarantees

Because keyed services are executed serially on a per-key basis, it means that invocations will execute in the same order in which they are enqueued. For example, assume the following code in `ServiceA`:

```typescript
const client = new ServiceB(ctx);
await ctx.oneWayCall(() =>
  client.do(TestRequest.create({ key: "Pete", number: 1 }))
);
await ctx.oneWayCall(() =>
  client.do(TestRequest.create({ key: "Pete", number: 2 }))
);
```

It is guaranteed that the invocation with `number: 1` will be executed before the invocation with `number: 2`. It is not guaranteed though that invocation `number: 2` will be executed immediately after invocation `number: 1`, as any other service, or a call from the ingress, could interleave these two calls enqueuing a third one.

### Common pitfalls

You should take into account some of the limitations of keyed services when designing your applications:

* Time-consuming operations, such as sleep, lock the service instance for the entire operation, hence they won't allow other enqueued invocations to be executed.
* Keyed service invocations can produce deadlocks when using request/response calls. When this happens, the keys remain locked and the system can't process any more requests. In this situation you'll have to unblock the keys manually by [cancelling invocations](/services/invocation#cancel-an-invocation). Some example cases:
  * Cross deadlock between service A and B: A calls B, and B calls A, both using same keys.
  * Cyclical deadlock: A calls B, and B calls C, and C calls A again.

## Singleton service

Singleton services are essentially like keyed services where the key is always the same, meaning that every invocation accesses the same state and gets enqueued in the same queue.

:::warning
Carefully ponder whether a service should be a singleton, given it executes all the invocations serially. If not properly used, it can become the throughput bottleneck of your application.
:::

## Unkeyed service

Unkeyed services have no invocation queue, meaning invocations are executed as soon as they're received without any concurrency and ordering guarantee.

You should not use state in unkeyed services, as all the stored state will be inaccessible after the end of the invocation.

Because unkeyed services don't lock any resource, they are a good fit for long running workflows with many time-consuming operations such as sleeps, or as a coordinator to invoke other keyed services.

## Restate service contract

Every Restate service defines a typed interface using a contract. The interface describes some properties of the service, such as the service methods (in other RPC systems these are called _handlers_) and its input/output message types.

Restate uses this contract to enable several features, such as:

* Automatically extract the [service key](#defining-service-instance-and-key), if any
* Accept requests [in different formats](invocation) and route them
* Allow code generation of service code and clients
* Support safer [upgrades](upgrades-removal) through incompatibility checks

The service contract is defined using [Protobuf](https://protobuf.dev/programming-guides/proto3/#services). Refer to their documentation to learn how to use the [Protobuf IDL](https://protobuf.dev/programming-guides/proto3).

### Protobuf service definition

Below a sample Protobuf service definition for the service `counter.Counter`:

```protobuf
syntax = "proto3";

package counter;

// Import the Restate contract extensions
import "dev/restate/ext.proto";

service Counter {
  // Define the service type
  option (dev.restate.ext.service_type) = KEYED;

  // Define the service methods
  rpc Get (GetRequest) returns (Response);
  rpc Add (AddRequest) returns (Response);
}

message GetRequest {
  // Define the key
  string counter_name = 1 [(dev.restate.ext.field) = KEY];
}

message AddRequest {
  string counter_name = 1 [(dev.restate.ext.field) = KEY];
  int64 value = 2;
}

message Response {
  int64 value = 1;
}
```

### Defining service instance and key

In addition to the standard Protobuf service definition, in Restate service you must specify the service type. Check the [service type](/services/service_type) documentation for more details.

To define the service type, you must use the `dev.restate.ext.service_type` extension. To define a service as keyed:

```protobuf
option (dev.restate.ext.service_type) = KEYED;
```

As unkeyed:

```protobuf
option (dev.restate.ext.service_type) = UNKEYED;
```

As singleton:

```protobuf
option (dev.restate.ext.service_type) = SINGLETON;
```

For keyed services, you're required to specify in every input message the field to use as key. To mark a field as key, annotate it with `dev.restate.ext.field`. Make sure that:

* There is only one key field.
* The field type is `string`.

For example:

```protobuf
message GetRequest {
  string counter_name = 1 [(dev.restate.ext.field) = KEY];
}
```

### How to use the contract

Once you have the contract, the SDK uses it to generate the code to encode/decode messages and the interface to implement the service. You can import contracts of other services, and the SDK will generate clients to invoke them.

The contract can also be used to generate gRPC/Connect clients to invoke Restate services from your webapp, mobile app, legacy system or in general from any system outside Restate services. Have a look at the [invocation docs](/services/invocation). You can check out the [gRPC](https://grpc.io/docs/languages/) and [Connect](https://connect.build/docs/introduction) documentation for more info on the available clients.

When [registering a service endpoint](/services/registration), Restate automatically _discovers_ all the available service contracts and stores them in an internal registry, no manual input is needed. 
