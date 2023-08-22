---
id: Overview
title: Overview
hide_title: true
sidebar_position: 1
slug: /
description: "Documentation overview"
---
<div id="container">
<h1> Welcome to the Restate Documentation!</h1>
<img src="/img/intro_diagram_small.jpg" alt="Introduction diagram"/>
</div>

Restate is a system for easily building resilient applications using <mark>distributed durable RPC & async/await</mark>. Restate sits in between your services and serves as a durable execution layer for distributed applications. Restate facilitates the common critical aspects that every application has to deal with: [calling- or messaging other services](/services/sdk/service-communication), keeping application [state](/services/sdk/state) consistent, reliably scheduling [delayed actions](/services/sdk/service-communication#delayed-calls), executing workflows, and integrating with external systems and APIs (via [side effects](/services/sdk/side-effects) and [awakeables](/services/sdk/awakeables)).

Restate durably logs the progress of the executed application logic to be able to recover partial progress upon failures. That way, applications can implement complex logic and control flow that reliably executes.

Restate is contained within a single binary and your application services can run on the same infrastructure as before (e.g. [Kubernetes](/services/deployment/kubernetes), [AWS Lambda](/services/deployment/lambda), ...).
Services embed the Restate SDK which handles all interaction with Restate.
External systems or clients can send requests to Restate via [gRPC](/services/invocation#grpc-and-grpc-web) or via [plain HTTP/curl](/services/invocation#connect-grpc-on-http).

<div id="container">
First time here? Get started:
</div>
<div id="container">
<div id="overviewButtonDiv"><a id="quickstartButton" class="overviewButton btn btn-primary btn-lg px-4 mb-2" href="/quickstart" role="button">>> Quickstart</a></div>
<div id="overviewButtonDiv"><a id="tourButton" class="overviewButton btn btn-primary btn-lg px-4 mb-2" href="/tour" role="button">>> Tour of Restate</a></div>
<div id="overviewButtonDiv"><a id="examplesButton" class="overviewButton btn btn-primary btn-lg px-4 mb-2" href="/examples" role="button">>> Examples</a></div>
</div>

<details><summary>Key use cases Restate solves</summary>

Restate is a flexible tool that can supercharge applications for many use cases. 
To give you an idea, here are a few key use cases Restate can help you solve.

### Microservice orchestration
Microservice architectures have several well-known benefits such as scalability, isolation, and maintainability.
But it also has downsides such as complex communication patterns, complex orchestration, and possible failure cascades.
Restate can help by adding resilience and consistency to the orchestration logic. Restate adds durable execution to the orchestration code (no manual retry logic), stores state, connects the services (like a MQ / PubSub), and optionally bridges to serverless platforms (orchestration logic can run as a normal service (Kubernetes, etc.) or a serverless function)

:::tip Want to see an example of this?
Have a look at the [shopping cart example](https://github.com/restatedev/example-shopping-cart-typescript) to see this in action.
:::

### Stateful serverless

Building general-purpose applications on serverless infrastructure (like AWS lambda) is still tricky.
Compositions are tricky. Lambda-to-Lambda communication is complex (invocations, asynchrony, reliance on queues).
State management is expensive (wait time) and often brittle (exceeded DB quotas when scaling up quickly).
Lambda functions have a specific interface, which means code cannot be migrated as-is between lambda and other service platforms (Kubernetes, Fargate, etc.). 
Add on top of that, there are the common distributed application issues, like maintaining atomicity between state, communication, execution, etc.

Restate allows users to build applications with simple standard RPC interfaces, and deploy the services to Lambda. Restate handles state, communication, and interaction with external systems for you.

:::tip Want to try this out?
Have a look at how to run your services on Lambda [here](/services/deployment/lambda). 
:::

### Durable execution and workflows

Restate supports Durable Execution for code. This allows you to define complex logic as code, and have persistence and consistency for the implicit state machine defined by the code.

Restate itself does not run any application code, but only stores state and messages. Application code runs just where it ran before (Kubernetes, FaaS, containers, bare metal, …).
Restate integrates specifically well with FaaS platforms. You can use services like AWS Lambda to run your workflow logic in a fully serverless and elastic manner.

Restate supports low-latency execution, and can be used for service orchestration and choreography in the synchronous path of user interaction. That’s because Restate is not based on workflow task queuing, but works by being the messaging or RPC plane for the online services.

Restate can also handle asynchronous workflows, including scaling down for long-running operations, and operations scheduled into the future.

:::tip Want to see an example of this?
Have a look at the [checkout workflow of the shopping cart example](https://github.com/restatedev/example-shopping-cart-typescript/blob/main/services/src/checkout_flow_service.ts). 
:::

</details>

<details><summary>Restate in your stack</summary>

### Restate vs. service mesh
Building applications with Restate eliminates the necessity for certain features of service meshes, for example retries and service discovery.
Where service meshes perform retries in a very simple way, Restate retries in a “state aware” manner, supplying committed execution state from its logs and ensures that no effects get duplicated through the retries.
Restate also allows combining multiple effects (like sending messages or updating state) into an atomic action, which is beyond the capabilities of service meshes, because it requires transactional persistence of those actions.

One can think of Restate as similar to a service mesh, but pulled up to the application layer. That way, Restate can provide stronger end-to-end guarantees, because that layer provides more application context compared to the network layer.

Restate can still be used together with service meshes for the communication between
Restate and the service endpoints. Common security features from service meshes (mTLS, etc.) make them still a valuable addition.

### Restate vs. message broker
The position of Restate in your stack is similar to that of a message or event broker,
although Restate's responsibilities cover a different scope. Message brokers have as primary concern that messages get reliably transferred from
message producers to message consumers. Restate fulfills a similar task for service requests,
but this is part of its larger responsibility of providing durable execution and end-to-end consistency via:
retrying requests, keeping application state consistent with code progress,
and facilitating recovery of partial progress of a handler execution.

In future versions, Restate will be able to retrieve input events or deliver output events to message brokers such as Apache Kafka.
This will enable building event-driven applications with Restate.

### Restate vs. workflow orchestrator
Restate takes a general approach to workflows. It allows you to durably execute code, so also code that expresses a workflow or a sequence of steps.
You can reliably schedule actions into the future via delayed requests. You can interact with external systems via [side effects](/services/sdk/side-effects) and [awakeables](/services/sdk/awakeables).

Because code runs in the same way as without Restate, this can provide a low-overhead, low-latency, scalable way of running workflows.
Workflows can be short (milliseconds) or long-running (days, months,...). 
Restate suspends computing resources during idle time (e.g. while waiting on human interaction or on a response of an external system).
You can run workflow logic on a FaaS platform such as AWS Lambda, and only pay for the actual compute time. 

Restate is in early stages. Stay tuned to find out how future releases will make implementing workflows with Restate even easier.
</details>
