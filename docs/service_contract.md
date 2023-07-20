---
sidebar_position: 7
---

# Restate Service contract

Every Restate service defines a typed interface using a contract. The interface describes some properties of the service, such as the service methods (in other RPC systems these are called _handlers_) and its input/output message types.

Restate uses this contract to enable several features, such as:

* Automatically extract the [service key](./service_type.md), if any
* Accept requests in the [ingress](./ingress.md) in different formats and route them
* Allow code generation of service code and clients
* Support safer [upgrades](./deployment-operations/versioning.md) through incompatibility checks

The service contract is defined using [Protobuf](https://protobuf.dev/programming-guides/proto3/#services). Refer to their documentation to learn how to use the [Protobuf IDL](https://protobuf.dev/programming-guides/proto3).

## Protobuf service definition

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

## Defining service instance and key

In addition to the standard Protobuf service definition, in Restate service you must specify the service type. Check the [service type](./service_type.md) documentation for more details.

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

* The field type is either a primitive or a message. Repeated field and maps are not supported.
* The field type is the same for every method input message of the same service.

For example, a primitive key field:

```protobuf
message GetRequest {
  string counter_name = 1 [(dev.restate.ext.field) = KEY];
}
```

A composite key field:

```protobuf
message GreetingRequest {
  Person person = 1 [(dev.restate.ext.field) = KEY];
}

message Person {
  string first_name = 1;
  string last_name = 2;
}
```

## How to use the contract

Once you have the contract, the SDK uses it to generate the code to encode/decode messages and the interface to implement the service. You can import contract of other services, and the SDK will generate clients to invoke them.

The contract can also be used to generate gRPC/Connect clients to invoke Restate services from your webapp, mobile app, legacy system or in general from any system outside Restate services through the [ingress](./ingress.md). You can check out the [gRPC](https://grpc.io/docs/languages/) and [Connect](https://connect.build/docs/introduction) documentation for more info on the available clients.

When [registering a service endpoint](./deployment-operations/deployment.md#registering-service-endpoints), Restate automatically _discovers_ all the available service contracts and stores them in an internal registry, no manual input is needed. 
