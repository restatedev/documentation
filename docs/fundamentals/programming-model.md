---
sidebar_position: 1
---

# Programming model

Restate's programming model involves breaking down an application into services,
each of which has its own state and can communicate with each other.
This model may sound familiar,
as it resembles the microservice architecture, but without the added complexity of managing state,
ensuring communication reliability, maintaining high availability, and other related tasks.

[//]: # (TODO add a diagram)

## Restate service

A Restate application is composed of different Restate services.
Each of the services implements a separate component of the system.
A Restate service:

- can interact with other services and with the outside world.
- can pause for a long period of time while waiting on a timer or on a response of another service, without consuming compute resources, thanks to its suspension mechanism.
- can own application state, that is persistently stored in the RocksDB backend of the runtime
- can be deployed as long-running services or as serverless functions on AWS Lambda, by changing a single line of code

:::tip
We currently offer a [Typescript/Javascript SDK](/category/typescript-sdk) and a [Java SDK](/category/typescript-sdk).
Have a look at the documentation of your preferred language, after you finish reading the fundamentals.
:::


Each Restate service has an associated service contract, which can be used both by external clients and other Restate services to invoke the given service.

Restate service contracts are defined by using [gRPC](https://grpc.io/), a well-known IDL (Interface description language) with a wide range of programming language and tooling support.
If you're not familiar with gRPC, you can look at their [documentation](https://grpc.io/docs/what-is-grpc/introduction/) for a good introduction.

:::note Side note
Restate uses gRPC Protobuf definitions to define service contracts, but under-the-hood, it relies on plain HTTP/2 for all service-to-runtime communication.
:::
## Restate Runtime

Restate services don't exist by themselves.
They are driven by Restate's runtime.
The Restate runtime sits in between your services like an event broker on steroids.
If we abstract away the details, we can describe the flow as follows.
Whenever a request comes in, Restate makes sure 
- that it is durably recorded
- that the right service is triggered
- that the invoked method has access to its isolated, keyed application state
- that any calls or side effects are recorded
- and that the invocation is retried when needed

Restate offers you strong concurrency guarantees, that make applications much easier to reason about
and eliminate many of the aspects that make distributed applications complex.

All interaction with the runtime is handled through the Restate SDKs, keeping it completely transparent to the developer.

## 🏁 Want to know more? 
Keep reading to explore these concepts in detail and discover how they can be applied in your Restate applications.