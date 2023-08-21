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
</div>
<div id="container">
<p>Restate is a system for easily building resilient applications using <mark>distributed durable RPC & async/await</mark>.</p>
</div>



<div id="container">
First time here? Get started:
</div>
<div id="container">
<div id="overviewButtonDiv"><a id="quickstartButton" class="overviewButton btn btn-primary btn-lg px-4 mb-2" href="/quickstart" role="button">>> Quickstart</a></div>
<div id="overviewButtonDiv"><a id="tourButton" class="overviewButton btn btn-primary btn-lg px-4 mb-2" href="/tour" role="button">>> Tour of Restate</a></div>
<div id="overviewButtonDiv"><a id="examplesButton" class="overviewButton btn btn-primary btn-lg px-4 mb-2" href="/examples" role="button">>> Examples</a></div>
</div>


## What is Restate?

![introduction](/img/intro_diagram.jpg)

Restate sits in between your services and serves as a durable execution layer for distributed applications. Restate facilitates the common critical aspects that every application has to deal with: calling- or messaging other services, keeping application state consistent, reliably scheduling delayed actions, executing workflows, and integrating with external systems and APIs.

Restate durably logs the progress of the executed application logic to be able to recover partial progress upon failures. That way, applications can implement complex logic and control flow that reliably executes.

Restate is contained within a single binary. No need to set up external systems such as databases.
And your application services can run on the same infrastructure as before (e.g. Kubernetes, AWS Lambda, ...).
Services embed the Restate SDK which handles all interaction with Restate.
External systems or clients can send requests to Restate via gRPC or via plain HTTP/curl.

Detailed tracing information is exposed via OpenTelemetry and can be used to get insight in the execution of your handlers.


## Key use cases Restate solves


### Microservice orchestration
Use Restate to add resilience and consistency to the orchestration logic. Restate adds durable execution to the orchestration code, stores (temp) state, connects the services (like a MQ / PubSub), and optionally bridges to serverless platforms (orchestration logic can run as a normal service (Kubernetes, etc.) or a serverless function)

What users gain through Restate:

- Durable execution of code. Making it easy to handle implicit state machines of orchestration logic, because it is expressed as just code and durably executed.
- Reliable/durable RPC simplifies interaction with other services (no manual retry logic)
- Storage of state in Restate is cheap and always consistent with sending RPC requests/events. This is especially useful for any coordination-related state.
- If the services called by the orchestrating service are also on Restate, users get end-to-end exactly-once RPC and state update semantics.
- Runs on serverless platforms (like Lambda) without paying for the wait: The orchestration functions scales to zero when waiting for replies from other services.


### Stateful serverless

Building general-purpose applications on serverless infrastructure (like AWS lambda) is still tricky.
Compositions are tricky. Lambda-to-Lambda communication is complex (invocations, asynchrony, reliance on queues).
State management is expensive (wait time) and often brittle (exceeded DB quotas when scaling up quickly).
Lambda functions have a specific interface, which means code cannot be migrated as-is between lambda and other service platforms (Kubernetes, Fargate, etc.)

Add on top of that the common distributed application issues, like maintaining atomicity between state, communication, execution, etc.

Restate allows users to build applications with simple standard RPC interfaces, and deploy the services to Lambda. Restate handles state, communication, even interaction with external systems like Kafka for you, and in a resilient and consistent manner that you don’t need to worry about failure details. You can move services (all or some) unchanged between Lambda, Kubernetes, Fargate, etc.


### Durable execution and workflows

Restate supports Durable Execution for code. This allows you to define complex logic as code, and have persistence and consistency for the implicit state machine defined by the code.

The Restate system does not itself run any application code, but only stores state and messages of various types. Users keep running their application code just where they ran it before (Kubernetes, FaaS, containers, bare metal, …).
Restate integrates specifically well with FaaS platforms, meaning users can use services like AWS Lambda to run their workflow logic in a fully serverless and elastic manner.

Restate supports low-latency execution, and can be used for service orchestration and choreography in the synchronous paths of interaction with users. That’s because Restate is not based on workflow task queuing, but works by being the messaging or RPC plane for the online services.

Restate can also handle asynchronous workflows, including scaling down for long-running operations, and operations scheduled into the future.


## Restate in your stack

### Restate vs. service mesh
Building applications with Restate eliminates the necessity for certain features of service meshes, for example retries and service discovery.

Where Service Meshes perform retries in a very simple way, Restate retries in a “state aware” manner, supplying committed execution state from its logs and ensures that no effects get duplicated through the retries.
Restate also allows combining multiple effects (like sending messages or updating state) into an atomic action, which is beyond the capabilities of service meshes, because it requires transactional persistence of those actions.

One can think of Restate as similar to a Service Mesh, but pulled up to the application layer. That way, Restate can provide stronger end-to-end guarantees, because that layer provides more application context compared to the network layer.

Restate can still be used together with Service Meshes, both for the communication between
the Restate Runtime and the Service endpoints, but also between the Restate Runtime workers.
Common security features from service meshes (mTLS, etc.) make them still a valuable addition.


### Restate vs. message broker
The position of Restate in your stack is similar to that of a message or event broker,
although Restate's responsibilities cover a different scope.

Message brokers have as primary concern that messages get reliably transferred from
message producers to message consumers. Restate fulfills a similar task for service requests,
but this is part of its larger responsibility of providing durable execution.
Besides durably logging requests, Restate gives applications end-to-end consistency via:
retrying requests, keeping application state consistent with code progress,
and facilitating recovery of partial progress of a handler execution.

In future versions, Restate will be able to retrieve input events or deliver output events to message brokers such as Apache Kafka.
This will enable building event-driven applications with Restate.

## Watch the intro video
<div id="container">
<section id="videosection" class="section section-sm bg-light">
<div class="container col-lg-9 col-xl-9">
<div class="videocontainer">
<video id="intro_video" controls preload="none" >
<source src="img/video.mp4" type="video/mp4"/>
Your browser does not support the video tag.
</video>
</div>
</div>
</section>
</div>