---
sidebar_position: 1
description: ""
hide_table_of_contents: true
---

import SdkIcons from "../../src/components/SdkIcons";
import Admonition from '@theme/Admonition';
import {Scrollycoding} from "../../src/components/code/scrollycoding";

# Durable Building Blocks

<Admonition type="note" icon="💡" title="Context">
    Distributed systems are inherently complex and failures are inevitable.
    Almost any application is a distributed system, since they are composed of different components that communicate over the network (e.g. services, databases, queues, etc).
    With every component, the number of possible failure scenarios increases: network partitions, hardware failures, timeouts, race conditions etc.
    Building reliable applications is a challenging task.
</Admonition>

Restate lets you write distributed applications that are resilient to failures.
It does this by providing a **distributed, durable version of common building blocks**.

For these building blocks, **Restate handles failure recovery, idempotency, state, and consistency**.
This way, you can implement otherwise tricky patterns in a few lines of code without worrying about these concerns.

You implement your business logic in handlers that have access to these building blocks via the Restate SDK, that is loaded as a dependency.

<SdkIcons sdkLinks={{
    description: "Restate currently supports the following languages:",
    ts: "/develop/ts/overview",
    java: "/develop/java/overview",
    kotlin: "/develop/java/overview?sdk=kotlin",
    go: "/develop/go/overview",
    python: "/develop/python/overview",
    rust: "https://docs.rs/restate-sdk/latest/restate_sdk/"
}}/>

Let's have a look at a handler that processes food orders:
<Scrollycoding>
    ## !!steps Durable functions
    Handlers take part in durable execution, meaning that Restate keeps track of their progress and recovers them to the previously reached state in case of failures.

    [Learn more](/concepts/durable_execution)

    ```ts !!tabs TypeScript order_processor.ts
    CODE_LOAD::ts/src/concepts/food_ordering.ts?1
    ```
    ```java !!tabs Java OrderWorkflow.java
    CODE_LOAD::java/src/main/java/concepts/buildingblocks/OrderWorkflow.java?1
    ```
    ```go !!tabs Go orderprocessor.go
    CODE_LOAD::go/concepts/foodordering.go?1
    ```
    ```python !!tabs Python order_processor.py
    CODE_LOAD::python/src/concepts/food_ordering.py?1
    ```

    ## !!steps Durable RPCs and queues
    Handlers can call other handlers in a resilient way, with or without waiting for the response.
    When a failure happens, Restate handles retries and recovers partial progress.

    <SdkIcons
        sdkLinks={{
            ts: "/develop/ts/service-communication",
            java: "/develop/java/service-communication",
            kotlin: "/develop/java/service-communication?sdk=kotlin",
            go: "/develop/go/service-communication",
            python: "/develop/python/service-communication",
            rust: "https://docs.rs/restate-sdk/latest/restate_sdk/context/trait.ContextClient.html"
        }}
    />

    ```ts !!tabs TypeScript order_processor.ts
    CODE_LOAD::ts/src/concepts/food_ordering.ts?2
    ```
    ```java !!tabs Java OrderWorkflow.java
    CODE_LOAD::java/src/main/java/concepts/buildingblocks/OrderWorkflow.java?2
    ```
    ```go !!tabs Go orderprocessor.go
    CODE_LOAD::go/concepts/foodordering.go?2
    ```
    ```python !!tabs Python order_processor.py
    CODE_LOAD::python/src/concepts/food_ordering.py?2
    ```

    ## !!steps Durable promises and timers
    Register promises in Restate to make them resilient to failures (e.g. webhooks, timers).
    Restate lets the handler suspend while awaiting the promise, and invokes it again when the result is available.
    A great match for function-as-a-service platforms.

    <SdkIcons
        sdkLinks={{
            ts: "/develop/ts/durable-timers",
            java: "/develop/java/durable-timers",
            kotlin: "/develop/java/durable-timers?sdk=kotlin",
            go: "/develop/go/durable-timers",
            python: "/develop/python/durable-timers",
            rust: "https://docs.rs/restate-sdk/latest/restate_sdk/context/trait.ContextTimers.html"
        }}
    />

    ```ts !!tabs TypeScript order_processor.ts
    CODE_LOAD::ts/src/concepts/food_ordering.ts?3
    ```
    ```java !!tabs Java OrderWorkflow.java
    CODE_LOAD::java/src/main/java/concepts/buildingblocks/OrderWorkflow.java?3
    ```
    ```go !!tabs Go orderprocessor.go
    CODE_LOAD::go/concepts/foodordering.go?3
    ```
    ```python !!tabs Python order_processor.py
    CODE_LOAD::python/src/concepts/food_ordering.py?3
    ```

    ## !!steps Consistent K/V state
    Persist application state in Restate with a simple concurrency model and no extra setup. Restate makes sure state remains consistent amid failures.

    <SdkIcons
        sdkLinks={{
            ts: "/develop/ts/state",
            java: "/develop/java/state",
            kotlin: "/develop/java/state?sdk=kotlin",
            go: "/develop/go/state",
            python: "/develop/python/state",
            rust: "https://docs.rs/restate-sdk/latest/restate_sdk/context/trait.ContextReadState.html"
        }}
    />

    ```ts !!tabs TypeScript order_processor.ts
    CODE_LOAD::ts/src/concepts/food_ordering.ts?4
    ```
    ```java !!tabs Java OrderWorkflow.java
    CODE_LOAD::java/src/main/java/concepts/buildingblocks/OrderWorkflow.java?4
    ```
    ```go !!tabs Go orderprocessor.go
    CODE_LOAD::go/concepts/foodordering.go?4
    ```
    ```python !!tabs Python order_processor.py
    CODE_LOAD::python/src/concepts/food_ordering.py?4
    ```

    ## !!steps Journaling actions
    Store the result of an action in Restate. The result gets replayed in case of failures and the action is not executed again.

    <SdkIcons
        sdkLinks={{
            ts: "/develop/ts/journaling-results",
            java: "/develop/java/journaling-results",
            kotlin: "/develop/java/journaling-results?sdk=kotlin",
            go: "/develop/go/journaling-results",
            python: "/develop/python/journaling-results",
            rust: "https://docs.rs/restate-sdk/latest/restate_sdk/context/trait.ContextSideEffects.html"
        }}
    />

    ```ts !!tabs TypeScript order_processor.ts
    CODE_LOAD::ts/src/concepts/food_ordering.ts?5
    ```
    ```java !!tabs Java OrderWorkflow.java
    CODE_LOAD::java/src/main/java/concepts/buildingblocks/OrderWorkflow.java?5
    ```
    ```go !!tabs Go orderprocessor.go
    CODE_LOAD::go/concepts/foodordering.go?5
    ```
    ```python !!tabs Python order_processor.py
    CODE_LOAD::python/src/concepts/food_ordering.py?5
    ```

</Scrollycoding>
