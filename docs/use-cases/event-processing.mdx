---
title: "Event Processing"
sidebar_position: 3
description: "Write event processing apps with Restate"
hide_table_of_contents: true
hide_title: true
---

import FeatureWidget from "../../src/components/FeatureWidget"
import FeatureSpotlight from "../../src/components/FeatureSpotlight"
import TwoColumnText from "../../src/components/TwoColumnText";
import ExampleWidget from "../../src/components/ExampleWidget"
import FeatureList from "../../src/components/FeatureList"
import SpotlightCard from "../../src/components/SpotlightCard"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"
import {Scrollycoding} from "../../src/components/code/scrollycoding";
import Admonition from "@theme/Admonition";

<div className={"row"}>
    <div className={"col col--6 col-lg-6 col-md-12"}>
        <h1 className={"padding-top--lg text--left"}>Event Processing</h1>
        <h1 className={"use-case-subtitle text--left"}>Lightweight, transactional event processing.</h1>
        <p className={"use-case-description padding-bottom--lg text--left"}>Process Kafka events with durable, transactional workflows.<br/>
            Restate takes care of the event plumbing and pushes events to your handler.</p>
    </div>
    <div className={"col col--6 col-lg-6 col-md-12"}>
        <img src={"/img/use_cases/use-case-event-driven-light.svg"} alt={"Event Processing"} className={"use-case-img"}/>
    </div>
</div>

<hr/>
<p className={"padding-bottom--lg"}></p>

<FeatureList className={"padding-bottom--lg"} features={[
    {
        title: 'Lightweight, resilient functions',
        iconPath: '/img/code-icon.svg',
        description: "Restate automatically handles retries and recovers execution progress after failures. Restate is a single binary and your code runs as a standard application in Docker containers or serverless environments, with no extra infrastructure required.",
    },
    {
        title: 'From complex workflows to rapid ETL tasks',
        iconPath: '/img/use_cases/trident.svg',
        description: "Restate processes in parallel by key rather than partition, preventing long-running functions from blocking other keys. Functions support complex patterns including loops, timers, and dynamic execution paths.",
    },
    {
        title: 'Zero Kafka consumer management',
        iconPath: '/img/use_cases/forward-email.svg',
        description: "Restate pushes events directly to your handlers, eliminating the need to implement consumers, manage subscriptions, or track offsets.",
    },
]}/>

<p className={"padding-bottom--lg"}></p>

## Transactional event processing with Restate

<Scrollycoding>

    ### !!steps Durable business logic and side effects

    Restate persists execution progress and automatically retries from the exact point of failure.
    When you perform side effects in a `run` block, Restate persists the result and replays it after crashes, enabling resilient workflow-like code.

    [Learn more](https://docs.restate.dev/concepts/durable_execution)

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/src/eventtransactions/user_feed.ts
    CODE_LOAD::ts/src/use_cases/event_processing/transactional_event_processing.ts?3
    ```

    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/patterns-use-cases/src/main/java/my/example/eventtransactions/UserFeed.java
    CODE_LOAD::java/src/main/java/usecases/eventprocessing/eventtransactions/UserFeed.java?3
    ```

    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/patterns-use-cases/src/main/kotlin/my/example/eventtransactions/UserFeed.kt
    CODE_LOAD::kotlin/src/main/kotlin/usecases/eventprocessing/UserFeed.kt?3
    ```

    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/patterns-use-cases/src/eventtransactions/userfeed.go
    CODE_LOAD::go/usecases/eventprocessing/eventtransactions/userfeed.go?3
    ```

    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/patterns-use-cases//eventtransactions/user_feed.py
    CODE_LOAD::python/src/use_cases/event_processing/user_feed.py?3
    ```

    ### !!steps Zero Kafka consumer management
    Connect functions to Kafka topics and let Restate handle all consumer management — including polling for records, committing offsets, and recovery.

    [Learn more](/guides/kafka-quickstart)

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/src/eventtransactions/user_feed.ts
    CODE_LOAD::ts/src/use_cases/event_processing/transactional_event_processing.ts?1
    ```

    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/patterns-use-cases/src/main/java/my/example/eventtransactions/UserFeed.java
    CODE_LOAD::java/src/main/java/usecases/eventprocessing/eventtransactions/UserFeed.java?1
    ```

    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/patterns-use-cases/src/main/kotlin/my/example/eventtransactions/UserFeed.kt
    CODE_LOAD::kotlin/src/main/kotlin/usecases/eventprocessing/UserFeed.kt?1
    ```

    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/patterns-use-cases/src/eventtransactions/userfeed.go
    CODE_LOAD::go/usecases/eventprocessing/eventtransactions/userfeed.go?1
    ```

    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/patterns-use-cases//eventtransactions/user_feed.py
    CODE_LOAD::python/src/use_cases/event_processing/user_feed.py?1
    ```

    ### !!steps Queue per key
    Events are routed to objects based on Kafka keys, with Restate ensuring sequential, in-order processing for each key.
    Processing delays for one key never block events for other keys.
    In the example, slow moderation checks do not block posts for other users.

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/src/eventtransactions/user_feed.ts
    CODE_LOAD::ts/src/use_cases/event_processing/transactional_event_processing.ts?5
    ```

    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/patterns-use-cases/src/main/java/my/example/eventtransactions/UserFeed.java
    CODE_LOAD::java/src/main/java/usecases/eventprocessing/eventtransactions/UserFeed.java?5
    ```

    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/patterns-use-cases/src/main/kotlin/my/example/eventtransactions/UserFeed.kt
    CODE_LOAD::kotlin/src/main/kotlin/usecases/eventprocessing/UserFeed.kt?5
    ```

    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/patterns-use-cases/src/eventtransactions/userfeed.go
    CODE_LOAD::go/usecases/eventprocessing/eventtransactions/userfeed.go?5
    ```

    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/patterns-use-cases//eventtransactions/user_feed.py
    CODE_LOAD::python/src/use_cases/event_processing/user_feed.py?5
    ```


    ### !!steps Schedule events or postpone processing

    Flexibly postpone event processing or schedule asynchronous tasks for immediate or future execution.
    Restate tracks all timers and triggers execution exactly when needed.
    Restate's queue per key, makes sure that slow moderation checks do not block posts for other users.

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/src/eventtransactions/user_feed.ts
    CODE_LOAD::ts/src/use_cases/event_processing/transactional_event_processing.ts?2
    ```

    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/patterns-use-cases/src/main/java/my/example/eventtransactions/UserFeed.java
    CODE_LOAD::java/src/main/java/usecases/eventprocessing/eventtransactions/UserFeed.java?2
    ```

    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/patterns-use-cases/src/main/kotlin/my/example/eventtransactions/UserFeed.kt
    CODE_LOAD::kotlin/src/main/kotlin/usecases/eventprocessing/UserFeed.kt?2
    ```

    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/patterns-use-cases/src/eventtransactions/userfeed.go
    CODE_LOAD::go/usecases/eventprocessing/eventtransactions/userfeed.go?2
    ```

    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/patterns-use-cases//eventtransactions/user_feed.py
    CODE_LOAD::python/src/use_cases/event_processing/user_feed.py?2
    ```


    ### !!steps Flexible control flow

    Unlike traditional stream processing systems, Restate imposes no restrictions on control flow (e.g., DAGs).
    Each event creates its own execution path through your code and builds a dedicated recovery log.

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/src/eventtransactions/user_feed.ts
    CODE_LOAD::ts/src/use_cases/event_processing/transactional_event_processing.ts?4
    ```

    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/patterns-use-cases/src/main/java/my/example/eventtransactions/UserFeed.java
    CODE_LOAD::java/src/main/java/usecases/eventprocessing/eventtransactions/UserFeed.java?4
    ```

    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/patterns-use-cases/src/main/kotlin/my/example/eventtransactions/UserFeed.kt
    CODE_LOAD::kotlin/src/main/kotlin/usecases/eventprocessing/UserFeed.kt?4
    ```

    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/patterns-use-cases/src/eventtransactions/userfeed.go
    CODE_LOAD::go/usecases/eventprocessing/eventtransactions/userfeed.go?4
    ```

    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/patterns-use-cases//eventtransactions/user_feed.py
    CODE_LOAD::python/src/use_cases/event_processing/user_feed.py?4
    ```


    ### !!steps Scale with serverless

    Deploy your functions on serverless platforms where Restate pushes events to them and scale based on demand.

    [Learn more](https://restate.dev/blog/we-replaced-400-lines-of-stepfunctions-asl-with-40-lines-of-typescript-by-making-lambdas-suspendable/)

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/src/eventtransactions/user_feed.ts
    CODE_LOAD::ts/src/use_cases/event_processing/transactional_event_processing.ts?6
    ```

    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/patterns-use-cases/src/main/java/my/example/eventtransactions/UserFeed.java
    CODE_LOAD::java/src/main/java/usecases/eventprocessing/eventtransactions/UserFeed.java?6
    ```

    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/patterns-use-cases/src/main/kotlin/my/example/eventtransactions/UserFeed.kt
    CODE_LOAD::kotlin/src/main/kotlin/usecases/eventprocessing/UserFeed.kt?6
    ```

    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/patterns-use-cases/src/eventtransactions/userfeed.go
    CODE_LOAD::go/usecases/eventprocessing/eventtransactions/userfeed.go?6
    ```

    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/patterns-use-cases//eventtransactions/user_feed.py
    CODE_LOAD::python/src/use_cases/event_processing/user_feed.py?6
    ```


</Scrollycoding>

<SpotlightCard>
    <FeatureSpotlight
        title={"Event handlers as regular, lightweight functions"}
        description={<p>Let Restate manage your Kafka subscriptions and deliver events directly to your functions. <br/> Your handlers run as standard services in your existing infrastructure with no special requirements.
        </p>}
        imgPath={"/img/use_cases/event_processing-white.svg"}
    />
</SpotlightCard>

## Stateful event processing with Restate

Implement stateful event handlers with Restate.

<Scrollycoding className={"workflows-scroller"}>

    ### !!steps K/V State and Event Enrichment
    Store persistent, consistent state directly in Restate and access it from any handler of the service. State is delivered with each request, allowing you to operate on local data without external database calls.

    [Learn more](/concepts/services#virtual-objects)

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/src/eventenrichment/package_tracker.ts
    CODE_LOAD::ts/src/use_cases/event_processing/event_enrichment.ts?1
    ```

    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/patterns-use-cases/src/main/java/my/example/eventenrichment/PackageTracker.java
    CODE_LOAD::java/src/main/java/usecases/eventprocessing/eventenrichment/PackageTracker.java?1
    ```

    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/patterns-use-cases/src/main/kotlin/my/example/eventenrichment/PackageTracker.kt
    CODE_LOAD::kotlin/src/main/kotlin/usecases/eventprocessing/PackageTracker.kt?1
    ```

    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/patterns-use-cases/src/eventenrichment/packagetracker.go
    CODE_LOAD::go/usecases/eventprocessing/eventenrichment/packagetracker.go?1
    ```

    ```py !!tabs Python https://github.com/restatedev/examples/blob/main/python/patterns-use-cases//eventenrichment/package_tracker.py
    CODE_LOAD::python/src/use_cases/event_processing/package_tracker.py?1
    ```

    ### !!steps Agents, actors and state machines

    Build event-driven agents, actors, digital twins, and state machines with Kafka integration.
    Restate provides simple concurrency guarantees while ensuring full resilience and consistency without additional infrastructure.


    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/src/eventenrichment/package_tracker.ts
    CODE_LOAD::ts/src/use_cases/event_processing/event_enrichment.ts?2
    ```

    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/patterns-use-cases/src/main/java/my/example/eventenrichment/PackageTracker.java
    CODE_LOAD::java/src/main/java/usecases/eventprocessing/eventenrichment/PackageTracker.java?2
    ```

    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/patterns-use-cases/src/main/kotlin/my/example/eventenrichment/PackageTracker.kt
    CODE_LOAD::kotlin/src/main/kotlin/usecases/eventprocessing/PackageTracker.kt?2
    ```

    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/patterns-use-cases/src/eventenrichment/packagetracker.go
    CODE_LOAD::go/usecases/eventprocessing/eventenrichment/packagetracker.go?2
    ```

    ```py !!tabs Python https://github.com/restatedev/examples/blob/main/python/patterns-use-cases//eventenrichment/package_tracker.py
    CODE_LOAD::python/src/use_cases/event_processing/package_tracker.py?2
    ```


    ### !!steps Combine Kafka and RPC

    Use the same functions for both Kafka events and RPC calls without code changes.
    Process events from multiple sources — registration requests via HTTP, location updates via Kafka, and queries from dashboards — all using the same handlers.

    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/src/eventenrichment/package_tracker.ts
    CODE_LOAD::ts/src/use_cases/event_processing/event_enrichment.ts?3
    ```

    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/patterns-use-cases/src/main/java/my/example/eventenrichment/PackageTracker.java
    CODE_LOAD::java/src/main/java/usecases/eventprocessing/eventenrichment/PackageTracker.java?3
    ```

    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/patterns-use-cases/src/main/kotlin/my/example/eventenrichment/PackageTracker.kt
    CODE_LOAD::kotlin/src/main/kotlin/usecases/eventprocessing/PackageTracker.kt?3
    ```

    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/patterns-use-cases/src/eventenrichment/packagetracker.go
    CODE_LOAD::go/usecases/eventprocessing/eventenrichment/packagetracker.go?3
    ```

    ```py !!tabs Python https://github.com/restatedev/examples/blob/main/python/patterns-use-cases//eventenrichment/package_tracker.py
    CODE_LOAD::python/src/use_cases/event_processing/package_tracker.py?3
    ```

</Scrollycoding>

<SpotlightCard>
    <TwoColumnText features={[
        {
            title: 'LOW-LATENCY',
            description: <>Restate processes events at high speed using a dedicated queue per key, pushing events to your functions for maximum parallel throughput. <br/><br/>  <a href={"https://restate.dev/blog/the-anatomy-of-a-durable-execution-stack-from-first-principles/#some-performance-numbers"}>Learn more</a></>,
        },
        {
            title: 'DURABLE EXECUTION',
            description: <>Restate handles all Kafka interaction complexities, guarantees exactly-once processing, and recovers event handlers to the precise point before any failure. <br/><br/>  <a href={"https://restate.dev/what-is-durable-execution/"}>Learn more</a></>,
        },
    ]}/>
</SpotlightCard>

<SpotlightCard>
    <FeatureSpotlight
        title={"Detailed Observability"}
        description={<p>Understand what is happening in your event-driven apps, by using the UI, the CLI, and the built-in tracing.<br/>Debug failing executions, inspect the K/V state, and manage deployments.</p>}
        imgPath={"/img/use_cases/workflow_ui.png"}
        imgSize={"100%"}
        button1={"What can you do with UI?"}
        link1={"https://restate.dev/blog/announcing-restate-ui/"}
        button2={"What can you do with CLI?"}
        link2={"/operate/introspection/"}
    />
</SpotlightCard>

## What you can build with Event Processing and Restate

<ExampleWidget itemsPerRow={3} features={[
    {
        title: 'Event-driven state machines',
        description: "Track deliveries by processing location updates from Kafka and automatically transitioning orders through their lifecycle states.",
        links: [
            {url: "https://github.com/restatedev/examples/tree/main/java/end-to-end-applications/food-ordering#the-delivery-workflow", icon: "/img/java.svg"},
            {url: "https://github.com/restatedev/examples/tree/main/kotlin/end-to-end-applications/food-ordering#the-delivery-workflow", icon: "/img/kotlin.svg"},
            {url: "https://github.com/restatedev/examples/tree/main/typescript/end-to-end-applications/food-ordering#the-delivery-workflow", icon: "/img/typescript.svg"},
        ],
    },
    {
        title: 'Stateful actors',
        description: "Build systems like transit fare calculators that maintain state, combine event streams, schedule follow-up tasks, and execute durable payment operations.",
        links: [
            {url: "https://github.com/restatedev/examples/tree/main/java/end-to-end-applications/subway-fare-calculator", icon: "/img/java.svg"},
        ],
    },
    {
        title: 'Webhook event processing',
        description: "Point your webhook to Restate for automatic retry handling and fault-tolerant processing with exactly-once semantics.",
        links: [
            {url: "/guides/durable-webhooks", icon: "/img/arrow-right.svg"},
        ],
    },
    {
        title: 'Delayed message queue',
        description: "Schedule messages for future execution. Restate handles scheduling, delivery, and processing with built-in durability.",
        links: [
            {url: "https://github.com/restatedev/examples/blob/main/java/patterns-use-cases/README.md#delayed-message-queue", icon: "/img/java.svg"},
            {url: "https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/README.md#delayed-message-queue", icon: "/img/typescript.svg"},
            {url: "https://github.com/restatedev/examples/blob/main/go/patterns-use-cases/README.md#delayed-message-queue", icon: "/img/go.svg"},
            {url: "https://github.com/restatedev/examples/blob/main/python/patterns-use-cases/README.md#delayed-message-queue", icon: "/img/python.svg"},
        ],
    },
    {
        title: 'Conditional reminders',
        description: "Implement intelligent retry loops that send reminders until specific conditions are met, showcasing Restate's flexible control flow capabilities.",
        links: [
            {url: "https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/README.md#scheduling-tasks", icon: "/img/typescript.svg"},
            {url: "https://github.com/restatedev/examples/blob/main/go/patterns-use-cases/README.md#scheduling-tasks", icon: "/img/go.svg"},
        ],
    },
    {
        title: 'Wondering about a specific use case?',
        description: "Let’s brainstorm together on Discord or Slack.",
        links: [
            {url: "https://discord.gg/skW3AZ6uGd", icon: "/img/discord-icon.svg"},
            {url: "https://join.slack.com/t/restatecommunity/shared_invite/zt-2v9gl005c-WBpr167o5XJZI1l7HWKImA", icon: "/img/slack.svg"}
        ]
    },
]}>
</ExampleWidget>

<Admonition type="note" title={"Didn't see your use case?"}>
💡 You can connect any handler to a Kafka topic, so have a look at the other use case pages for more inspiration.
</Admonition>

## Developer Resources

<FeatureWidget features={[
    {
        title: 'Docs',
        description: (
            "Read the docs to learn more."
        ),
        ts: "/invoke/kafka?sdk=ts",
        java: "/invoke/kafka?sdk=java",
        go: "/invoke/kafka?sdk=go",
        python: "/invoke/kafka?sdk=python",
    },
    {
        title: 'Kafka + Restate Quickstart',
        description: "Get started with your first Restate Kafka handler.",
        links: [
            {url: "/guides/kafka-quickstart", icon: "/img/arrow-right.svg"},
        ]
    },
    {
        title: 'Need help?',
        description: "Join the Restate Discord or Slack communities",
        links: [
            {url: "https://discord.gg/skW3AZ6uGd", icon: "/img/discord-icon.svg"},
            {url: "https://join.slack.com/t/restatecommunity/shared_invite/zt-2v9gl005c-WBpr167o5XJZI1l7HWKImA", icon: "/img/slack.svg"}
        ]
    }
]}/>
