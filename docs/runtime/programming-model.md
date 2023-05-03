---
sidebar_position: 1
---

# Programming model

# NOTE: COPIED OVER FROM POC DOCS - REWORK THIS!


Restate's programming model is based on decomposing an application into services owning state that can communicate with each other.
You might be familiar with it, as it resembles the microservices architecture, but without the hassle of managing state, implementing communication reliability, maintaining high availability, etc.

## Restate service

A Restate application is composed of different Restate services.
Each of the services implements a separate component of the system.
A Restate service:

- can own state, interact with each other and the outside world.
- can block for a long period of time while waiting for another service to reply, or on a timer, without consuming compute resources, thanks to the suspension mechanism.
- can be deployed and upgraded independently.
- can be implemented using the programming language of your choice
- can be deployed using the serverless runtime of your choice.

Each Restate service has an associated service contract, which can be used both by external clients and other Restate services to invoke the given service.

Restate service contracts are defined by using [gRPC](https://grpc.io/), a well known IDL (Interface description language) with a wide range of programming language and tooling support.
If you're not familiar with gRPC, you can look at their [documentation](https://grpc.io/docs/what-is-grpc/introduction/) for a good introduction.

## Restate Runtime

Restate services don't exist by themselves, but they are driven by Restate's runtime.
The runtime is the component taking care of coordinating services, persisting state and proxying external client requests.
This interaction is completely transparent to the developer, as every aspect is handled by the Restate SDKs, used for developing Restate services.