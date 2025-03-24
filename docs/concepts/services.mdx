---
sidebar_position: 2
description: ""
---

import {Scrollycoding} from "../../src/components/code/scrollycoding";
import SdkIcons from "../../src/components/SdkIcons";
import Admonition from "@theme/Admonition";

# Services

This is what a Restate application looks like from a helicopter view:

<center>
    <img src="/img/restate-app.svg" alt="Application overview" width="50%"/>
</center>

1. **Services**: Restate services contain functions/handlers which process incoming requests and execute business logic. Services run like regular code in your infrastructure, for example a NodeJS/Java app in a Docker container or a Python function on AWS Lambda. Services embed the Restate SDK as a dependency, and their handlers use it to persist the progress they make. Services can be written in any language for which there is an SDK available: [TypeScript](/develop/ts/overview), [Java](/develop/java/overview), [Kotlin](/develop/java/overview?sdk=kotlin), [Go](/develop/go/overview), [Python](/develop/python/overview), and [Rust](https://docs.rs/restate-sdk/latest/restate_sdk/).
2. **[Restate Server](/concepts/services#restate-server)**: The server sits in front of your services, similar to a reverse proxy or message broker. It proxies incoming requests to the corresponding services and drives their execution till the end.
3. **[Invocation](/concepts/invocations)**: An invocation is a request to execute a handler.

There are three types of services in Restate:

[//]: # (This is an html table because markdown tables don't support setting the column width and for some reason the workflow column was very large)
<table><thead><tr><th>Services (plain)</th><th>Virtual objects</th><th>Workflows</th></tr></thead><tbody><tr><td width={"30%"}>Set of handlers durably executed</td><td width={"30%"}>Set of handlers durably executed</td><td width={"30%"}>The workflow <code>run</code> handler is durably executed a single time.</td></tr><tr><td>No associated K/V store</td><td>Handlers share K/V state; isolated per virtual object</td><td>K/V state isolated per workflow execution. Can only be set by the <code>run</code> handler.</td></tr><tr><td>No concurrency limits; unlimited scale-out on platforms like AWS Lambda.</td><td> <ul><li>To guard state consistency, only one handler with write access to the state can run at a time per virtual object: queue per key.</li><li>Handlers marked as shared don't have write access to state and can run concurrently to the exclusive handlers.</li></ul></td><td>The run handler can run only a single time per workflow ID. Other handlers can run concurrently to interact with the workflow.</td></tr><tr><td>Example use cases: <ul><li>Microservice orchestration</li><li>Sagas and distributed transactions</li><li>Exactly-once webhook callback processing</li><li>Idempotent requests</li><li>Parallelization, chaining API calls, and complex routing</li><li>Async task scheduling</li></ul></td><td>Example use cases: <ul><li>Stateful handlers and entities: e.g. shopping cart</li><li>Atomic, durable state machines: e.g. payment processing</li><li>Stateful agents, actors, and digital twins: e.g. AI chat sessions</li><li>Locking mechanisms: database writes</li><li>Stateful Kafka event processing: e.g. enrichment, joins</li></ul></td><td>Example use cases: <ul><li>Payments, order processing and logistics</li><li>Human-in-the-loop workflow: e.g. signup, email approval</li><li>Long-running tasks with failures/timeouts: e.g. infrastructure provisioning</li><li>Flexibility and dynamic routing: e.g. workflow interpreters</li></ul></td></tr></tbody></table>

## Services

Services expose a collection of handlers:

<Scrollycoding>
    ## !!steps
    Restate makes sure that handlers run to completion, even in the presence of failures.
    Restate persists the results of actions and recovers them after failures.

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/basics/src/0_durable_execution.ts
    CODE_LOAD::ts/src/concepts/services/subscription_service.ts?1
    ```
    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/basics/src/main/java/durable_execution/SubscriptionService.java
    CODE_LOAD::java/src/main/java/concepts/services/SubscriptionService.java?1
    ```
    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/basics/src/main/kotlin/durable_execution/SubscriptionService.kt
    CODE_LOAD::kotlin/src/main/kotlin/concepts/services/SubscriptionService.kt?1
    ```
    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/basics/part0/durableexecution.go
    CODE_LOAD::go/concepts/services/subscriptionservice.go?1
    ```
    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/basics/app/0_durable_execution.py
    CODE_LOAD::python/src/concepts/services/subscription_service.py?1
    ```
    ```rust !!tabs Rust https://github.com/restatedev/examples/blob/main/rust/basics/src/p0_durable_execution.rs
    CODE_LOAD::rust/src/concepts/services.rs?1
    ```

    ## !!steps
    The handlers of services are independent and can be invoked concurrently.

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/basics/src/0_durable_execution.ts
    CODE_LOAD::ts/src/concepts/services/subscription_service.ts?2
    ```
    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/basics/src/main/java/durable_execution/SubscriptionService.java
    CODE_LOAD::java/src/main/java/concepts/services/SubscriptionService.java?2
    ```
    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/basics/src/main/kotlin/durable_execution/SubscriptionService.kt
    CODE_LOAD::kotlin/src/main/kotlin/concepts/services/SubscriptionService.kt?2
    ```
    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/basics/part0/durableexecution.go
    CODE_LOAD::go/concepts/services/subscriptionservice.go?2
    ```
    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/basics/app/0_durable_execution.py
    CODE_LOAD::python/src/concepts/services/subscription_service.py?2
    ```
    ```rust !!tabs Rust https://github.com/restatedev/examples/blob/main/rust/basics/src/p0_durable_execution.rs
    CODE_LOAD::rust/src/concepts/services.rs?2
    ```

    ## !!steps
    Handlers use regular code and control flow, no custom DSLs.

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/basics/src/0_durable_execution.ts
    CODE_LOAD::ts/src/concepts/services/subscription_service.ts?3
    ```
    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/basics/src/main/java/durable_execution/SubscriptionService.java
    CODE_LOAD::java/src/main/java/concepts/services/SubscriptionService.java?3
    ```
    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/basics/src/main/kotlin/durable_execution/SubscriptionService.kt
    CODE_LOAD::kotlin/src/main/kotlin/concepts/services/SubscriptionService.kt?3
    ```
    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/basics/part0/durableexecution.go
    CODE_LOAD::go/concepts/services/subscriptionservice.go?3
    ```
    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/basics/app/0_durable_execution.py
    CODE_LOAD::python/src/concepts/services/subscription_service.py?3
    ```
    ```rust !!tabs Rust https://github.com/restatedev/examples/blob/main/rust/basics/src/p0_durable_execution.rs
    CODE_LOAD::rust/src/concepts/services.rs?3
    ```

    ## !!steps
    Handlers are exposed over HTTP. When the Restate Server receives a request, it sets up an HTTP2 connection with the service and streams events back and forth over this connection.

    Alternatively, you can create a serverless function, like an AWS Lambda handler.

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/basics/src/0_durable_execution.ts
    CODE_LOAD::ts/src/concepts/services/subscription_service.ts?4
    ```
    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/basics/src/main/java/durable_execution/SubscriptionService.java
    CODE_LOAD::java/src/main/java/concepts/services/SubscriptionService.java?4
    ```
    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/basics/src/main/kotlin/durable_execution/SubscriptionService.kt
    CODE_LOAD::kotlin/src/main/kotlin/concepts/services/SubscriptionService.kt?4
    ```
    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/basics/part0/durableexecution.go
    CODE_LOAD::go/concepts/services/subscriptionservice.go?4
    ```
    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/basics/app/0_durable_execution.py
    CODE_LOAD::python/src/concepts/services/subscription_service.py?4
    ```
    ```rust !!tabs Rust https://github.com/restatedev/examples/blob/main/rust/basics/src/p0_durable_execution.rs
    CODE_LOAD::rust/src/concepts/services.rs?4
    ```
</Scrollycoding>

<SdkIcons
    sdkLinks={{
        description: "Learn more:",
        ts: "/develop/ts/overview#services",
        java: "/develop/java/overview#services",
        kotlin: "/develop/java/overview?sdk=kotlin#services",
        go: "/develop/go/overview#services",
        python: "/develop/python/overview#services",
        rust: "https://docs.rs/restate-sdk/latest/restate_sdk/#services"
    }}
/>

## Virtual objects

Virtual objects expose a set of handlers with access to K/V state stored in Restate.

<Scrollycoding>

    ## !!steps
    A virtual object is **uniquely identified and accessed by its key**.

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/basics/src/2_virtual_objects.ts
    CODE_LOAD::ts/src/concepts/services/virtual_objects.ts?1
    ```
    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/basics/src/main/java/virtual_objects/GreeterObject.java
    CODE_LOAD::java/src/main/java/concepts/services/Greeter.java?1
    ```
    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/basics/src/main/kotlin/virtual_objects/GreeterObject.kt
    CODE_LOAD::kotlin/src/main/kotlin/concepts/services/GreeterObject.kt?1
    ```
    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/basics/part2/virtualobjects.go
    CODE_LOAD::go/concepts/virtualobjects/main.go?1
    ```
    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/basics/app/2_virtual_objects.py
    CODE_LOAD::python/src/concepts/services/virtual_objects.py?1
    ```
    ```rust !!tabs Rust https://github.com/restatedev/examples/blob/main/rust/basics/src/p2_virtual_objects.rs
    CODE_LOAD::rust/src/concepts/vo.rs?1
    ```

    ## !!steps
    Each virtual object has access to its own **isolated K/V state**, stored in Restate.
    The handlers of a virtual object can read and write to the state of the object.
    Restate delivers the state together with the request to the virtual object, so virtual objects have their state locally accessible without requiring any database connection or lookup.
    State is exclusive, and atomically committed with the handler execution.

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/basics/src/2_virtual_objects.ts
    CODE_LOAD::ts/src/concepts/services/virtual_objects.ts?2
    ```
    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/basics/src/main/java/virtual_objects/GreeterObject.java
    CODE_LOAD::java/src/main/java/concepts/services/Greeter.java?2
    ```
    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/basics/src/main/kotlin/virtual_objects/GreeterObject.kt
    CODE_LOAD::kotlin/src/main/kotlin/concepts/services/GreeterObject.kt?2
    ```
    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/basics/part2/virtualobjects.go
    CODE_LOAD::go/concepts/virtualobjects/main.go?2
    ```
    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/basics/app/2_virtual_objects.py
    CODE_LOAD::python/src/concepts/services/virtual_objects.py?2
    ```
    ```rust !!tabs Rust https://github.com/restatedev/examples/blob/main/rust/basics/src/p2_virtual_objects.rs
    CODE_LOAD::rust/src/concepts/vo.rs?2
    ```

    ## !!steps
    When a handler is invoked, it can **read and write to the state** of the virtual object.
    To ensure consistent writes to the state, Restate provides **concurrency guarantees**: at most one handler can execute at a time for a given virtual object.

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/basics/src/2_virtual_objects.ts
    CODE_LOAD::ts/src/concepts/services/virtual_objects.ts?3
    ```
    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/basics/src/main/java/virtual_objects/GreeterObject.java
    CODE_LOAD::java/src/main/java/concepts/services/Greeter.java?3
    ```
    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/basics/src/main/kotlin/virtual_objects/GreeterObject.kt
    CODE_LOAD::kotlin/src/main/kotlin/concepts/services/GreeterObject.kt?3
    ```
    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/basics/part2/virtualobjects.go
    CODE_LOAD::go/concepts/virtualobjects/main.go?3
    ```
    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/basics/app/2_virtual_objects.py
    CODE_LOAD::python/src/concepts/services/virtual_objects.py?3
    ```
    ```rust !!tabs Rust https://github.com/restatedev/examples/blob/main/rust/basics/src/p2_virtual_objects.rs
    CODE_LOAD::rust/src/concepts/vo.rs?3
    ```

    ## !!steps
    If you want to **allow concurrent reads** to the state, you can mark a handler as a **shared handler**.
    This allows the handler to run concurrently with other handlers, but it cannot write to the state.

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/basics/src/2_virtual_objects.ts
    CODE_LOAD::ts/src/concepts/services/virtual_objects.ts?4
    ```
    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/basics/src/main/java/virtual_objects/GreeterObject.java
    CODE_LOAD::java/src/main/java/concepts/services/Greeter.java?4
    ```
    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/basics/src/main/kotlin/virtual_objects/GreeterObject.kt
    CODE_LOAD::kotlin/src/main/kotlin/concepts/services/GreeterObject.kt?4
    ```
    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/basics/part2/virtualobjects.go
    CODE_LOAD::go/concepts/virtualobjects/main.go?4
    ```
    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/basics/app/2_virtual_objects.py
    CODE_LOAD::python/src/concepts/services/virtual_objects.py?4
    ```
    ```rust !!tabs Rust https://github.com/restatedev/examples/blob/main/rust/basics/src/p2_virtual_objects.rs
    CODE_LOAD::rust/src/concepts/vo.rs?4
    ```

</Scrollycoding>

<SdkIcons
    sdkLinks={{
        description: "Learn more:",
        ts: "/develop/ts/overview#virtual-objects",
        java: "/develop/java/overview#virtual-objects",
        kotlin: "/develop/java/overview?sdk=kotlin#virtual-objects",
        go: "/develop/go/overview#virtual-objects",
        python: "/develop/python/overview#virtual-objects",
        rust: "https://docs.rs/restate-sdk/latest/restate_sdk/#virtual-objects"
    }}
/>

## Workflows

A workflow is a special type of Virtual Object that can be used to implement a set of steps that need to be executed durably.
Workflows have additional capabilities such as signaling, querying, additional invocation options, and a longer retention time in the CLI.

<Scrollycoding>

    ## !!steps
    A workflow has a **run handler** that implements the **workflow logic**.
    The `run` handler runs exactly once per workflow ID (object).

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/basics/src/3_workflows.ts
    CODE_LOAD::ts/src/concepts/services/signup_workflow.ts?1
    ```
    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/basics/src/main/java/workflows/SignupWorkflow.java
    CODE_LOAD::java/src/main/java/concepts/services/SignupWorkflow.java?1
    ```
    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/basics/src/main/kotlin/workflows/SignupWorkflow.kt
    CODE_LOAD::kotlin/src/main/kotlin/concepts/services/SignupWorkflow.kt?1
    ```
    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/basics/part3/workflows.go
    CODE_LOAD::go/concepts/workflow/workflows.go?1
    ```
    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/basics/app/3_workflows.py
    CODE_LOAD::python/src/concepts/services/signup_workflow.py?1
    ```
    ```rust !!tabs Rust https://github.com/restatedev/examples/blob/main/rust/basics/src/p3_workflows.rs
    CODE_LOAD::rust/src/concepts/workflows.rs?1
    ```

    ## !!steps
    The run handler executes a set of **durable steps/activities**. These can either be:
    - Inline activities: run blocks, sleep, mutating K/V state,...
    - Calls to other handlers implementing the activities.

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/basics/src/3_workflows.ts
    CODE_LOAD::ts/src/concepts/services/signup_workflow.ts?2
    ```
    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/basics/src/main/java/workflows/SignupWorkflow.java
    CODE_LOAD::java/src/main/java/concepts/services/SignupWorkflow.java?2
    ```
    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/basics/src/main/kotlin/workflows/SignupWorkflow.kt
    CODE_LOAD::kotlin/src/main/kotlin/concepts/services/SignupWorkflow.kt?2
    ```
    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/basics/part3/workflows.go
    CODE_LOAD::go/concepts/workflow/workflows.go?2
    ```
    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/basics/app/3_workflows.py
    CODE_LOAD::python/src/concepts/services/signup_workflow.py?2
    ```
    ```rust !!tabs Rust https://github.com/restatedev/examples/blob/main/rust/basics/src/p3_workflows.rs
    CODE_LOAD::rust/src/concepts/workflows.rs?2
    ```

    ## !!steps
    You can define other handlers in the same workflow that can run concurrently to the `run` handler and:
    - **Query** the workflow (get information out of it) by getting K/V state or awaiting promises that are resolved by the workflow.
    - **Signal** the workflow (send information to it) by resolving promises that the workflow waits on.
    For example, the click handler signals the workflow that the email link was clicked.

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/basics/src/3_workflows.ts
    CODE_LOAD::ts/src/concepts/services/signup_workflow.ts?3
    ```
    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/basics/src/main/java/workflows/SignupWorkflow.java
    CODE_LOAD::java/src/main/java/concepts/services/SignupWorkflow.java?3
    ```
    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/basics/src/main/kotlin/workflows/SignupWorkflow.kt
    CODE_LOAD::kotlin/src/main/kotlin/concepts/services/SignupWorkflow.kt?3
    ```
    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/basics/part3/workflows.go
    CODE_LOAD::go/concepts/workflow/workflows.go?3
    ```
    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/basics/app/3_workflows.py
    CODE_LOAD::python/src/concepts/services/signup_workflow.py?3
    ```
    ```rust !!tabs Rust https://github.com/restatedev/examples/blob/main/rust/basics/src/p3_workflows.rs
    CODE_LOAD::rust/src/concepts/workflows.rs?3
    ```

</Scrollycoding>


<SdkIcons
    sdkLinks={{
        description: "Learn more:",
        ts: "/develop/ts/overview#workflows",
        java: "/develop/java/overview#workflows",
        kotlin: "/develop/java/overview?sdk=kotlin#workflows",
        go: "/develop/go/overview#workflows",
        python: "/develop/python/overview#workflows",
        rust: "https://docs.rs/restate-sdk/latest/restate_sdk/#workflows"
    }}
/>

## Restate Server

The Restate Server sits like reverse-proxy or message broker in front of your services and proxies invocations to them.

The Restate Server is written in Rust, to be self-contained and resource-efficient.
It has an event-driven foundation to suit low-latency requirements.

<div className={"text-center"}>
    <img src="/img/concepts/restate-server-full.svg" alt="Restate Server" width="30%"/>
</div>

The Restate Server runs as a single binary with zero dependencies. It runs with low operational overhead on any platform, also locally.
You can run the Restate Server in a highly-available configuration, with multiple instances behind a load balancer.

Restate is also available as a [fully managed cloud service](https://restate.dev/cloud/), if all you want is to use it and let us operate it.
[Contact our team for more information.](https://restate.dev/get-restate-cloud/)

Learn more about the Restate Server:
- [Deploying Restate Servers and clusters](/deploy/overview)
- [Restate's architecture](/references/architecture)
- [Deep-dive architecture blog post with benchmark results](https://restate.dev/blog/the-anatomy-of-a-durable-execution-stack-from-first-principles/).
- [Durable Execution](/concepts/durable_execution): the main feature the Restate Server implements and how it works



