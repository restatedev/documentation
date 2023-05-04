---
sidebar_position: 2
---

# Services

-------------------------
**What to write here**:  
- What we consider to be a service vs. service instance. 
- Keyed/unkeyed/singleton services and how to define them in Protobuf
- 
-------------------------

# NOTE: mostly copied over from POC docs: REWRITE!

Let's first have a look at what Restate understands under services and the types of Restate services that exist.  

This is important for many things. For state, for concurrency of requests. 

## Service instance

A Restate service encapsulates the business logic of an application component.
Every time this service is invoked, the runtime associates an _instance_ with it.
As the name implies, the instance is the combination of service logic and its current state.
You can think of it using an analogy from OOP languages: Restate services are classes, they provide the logic of how a certain component behaves, while service instances are objects, combining the service/class with its state.

Services can be stateful or stateless.
For stateful services, the runtime will persist the instances' state throughout different invocations.
This means that you can operate on the same state across different invocations.

## Key

Service instances are identified by their keys.
The runtime uses the key to store and retrieve state for a service instance.
Restate offers three service types which define how the key is specified:

For each service you implement, you need to define the behaviour to choose such key.The available options are:

* Keyed
* Unkeyed
* Singleton

### Keyed services

A keyed service instance is addressed by a key chosen by the user. This key is part of the parameter of every service method and gets extracted by the runtime automatically.

When defining the service contract, you must annotate the request field that corresponds to the key and the runtime will take care of extracting it.
For example, if you want to define a `PersonStore` and a `Person` is uniquely identified by its `id_number`, then you can define the service contract as following:

Example keyed service contract
```protobuf
service PersonStore {
// Specify that this service is keyed
option (dev.restate.ext.service_type) = KEYED;

rpc SetPerson (Person) returns (google.protobuf.Empty);
}

message Person {
// The id_number field must be used as key
int64 id_number = 1 [(dev.restate.ext.field) = KEY];
string first_name = 2;
string last_name = 3;
}
```

When invoking keyed services, the runtime will serialize invocations per key.
In other words, if the runtime receives two invocations with the same `key`, it will choose one of them to execute first.
Once this invocation is completed it will pick up the other one and execute it.

### Unkeyed services

Unkeyed services are stateless services, as the runtime will generate a random key every time and discard the instance when the invocation is complete.

For example:

Example unkeyed service contract
```protobuf
service RandomValueGenerator {
// Specify that this service is unkeyed
option (dev.restate.ext.service_type) = UNKEYED;

rpc GenerateString (GenerateStringRequest) returns (GenerateStringResponse);
}

message GenerateStringRequest {
int32 length = 1;
}

message GenerateStringResponse {
string result = 1;
}
```

:::caution
It is a mistake to get/set/clear state inside an unkeyed service, as you won't be able anymore to see those changes after the invocation ends. Future releases might explicitly forbid it.
:::

The runtime will execute as many unkeyed service invocations in parallel as it can.

### Singleton service instance

Singleton services are a special case of stateful services. They allow only one instance to exist.

For example:

Example singleton service contract
```protobuf
service GlobalCounter {
option (dev.restate.ext.service_type) = SINGLETON;

rpc Increment (Number) returns (google.protobuf.Empty);
}

message Number {
int32 value = 1;
}
```

Singleton service invocations are always serialized.
Hence, the runtime will always execute the invocations one by one.

:::caution
You should always prefer using keyed services over singleton services, as the latter is inherently not parallelizable.
:::
