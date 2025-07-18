---
id: tour
title: "Tour of Restate"
description: ""
---

import {TerminalWithTabs, Terminal} from "../../src/components/code/terminal";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';
import {SubtleStep} from "../../src/components/Stepper";
import TourAnimation from "../../src/components/TourAnimation";
import {CodeWithTabs} from "../../src/components/code/code";

<Tabs groupId="sdk" queryString>
<TabItem value="ts" label="TypeScript">
</TabItem>
<TabItem value="java" label="Java">
</TabItem>
<TabItem value="go" label="Go">
</TabItem>
<TabItem value="python" label="Python">
</TabItem>
<TabItem value="rust" label="Rust">
</TabItem>
</Tabs>

This tutorial guides you through the development of an end-to-end Restate application, and covers all the essential features.
After this tutorial, you should have a firm understanding of how Restate can help you and feel comfortable to tackle your next application on your own.

This tutorial implements a ticket reservation application for a theatre.
It allows users to add tickets for specific seats to their shopping cart.
After the user adds a ticket, the seat gets reserved for 15 minutes.
If the user doesn't pay for the ticket within that time interval, the reservation is released and the ticket becomes available to other users.

Restate applications are made up of services that expose handlers.
Handlers are functions that implement business logic.
Restate manages their invocation and execution.
Services communicate with one another using Remote Procedure Calls (RPC).
Our ticket example consists of three services:

<img src="/img/tour-overview.svg" width="700rem"/>

As we go, you will discover how Restate can help you with some intricacies in this application.

<Admonition type="note" title="Prerequisites">
<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">

- Latest stable version of [NodeJS](https://nodejs.org/en/) >= v18.17.1 and [npm CLI](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) >= 9.6.7 installed.
- [Install Restate Server and CLI](/develop/local_dev#running-restate-server--cli-locally)
- Optional: [Docker Engine](https://docs.docker.com/engine/install/) or [Podman](https://podman.io/docs/installation), if you want to run the Restate Server with Docker. And to run Jaeger.

This guide is written for:
- TypeScript SDK version: `VAR::TYPESCRIPT_SDK_VERSION`
- Restate Server Docker image: `docker.restate.dev/restatedev/restate:VAR::RESTATE_VERSION`

</TabItem>
<TabItem value="java" label="Java">
- JDK >= 17
- [Install Restate Server and CLI](/develop/local_dev#running-restate-server--cli-locally)
- Optional: [Docker Engine](https://docs.docker.com/engine/install/) or [Podman](https://podman.io/docs/installation), if you want to run the Restate Server with Docker. And to run Jaeger.

This guide is written for:
- Java SDK version: `VAR::JAVA_SDK_VERSION`
- Restate Server Docker image: `docker.restate.dev/restatedev/restate:VAR::RESTATE_VERSION`

</TabItem>
<TabItem value="go" label="Go">
- Go >= 1.21.0
- [Install Restate Server and CLI](/develop/local_dev#running-restate-server--cli-locally)
- Optional: [Docker Engine](https://docs.docker.com/engine/install/) or [Podman](https://podman.io/docs/installation), if you want to run the Restate Server with Docker. And to run Jaeger.

This guide is written for:
- Go SDK version: `VAR::GO_SDK_VERSION`
- Restate Server Docker image: `docker.restate.dev/restatedev/restate:VAR::RESTATE_VERSION`

</TabItem>
<TabItem value="python" label="Python">
- Python >= 3.11
- [Install Restate Server and CLI](/develop/local_dev#running-restate-server--cli-locally)
- Optional: [Docker Engine](https://docs.docker.com/engine/install/) or [Podman](https://podman.io/docs/installation), if you want to run the Restate Server with Docker. And to run Jaeger.

This guide is written for:
- Python SDK version: `VAR::PYTHON_SDK_VERSION`
- Restate Server Docker image: `docker.restate.dev/restatedev/restate:VAR::RESTATE_VERSION`

</TabItem>
<TabItem value="rust" label="Rust">
    - [Rust](https://rustup.rs/)
    - [Install Restate Server and CLI](/develop/local_dev#running-restate-server--cli-locally)
    - Optional: [Docker Engine](https://docs.docker.com/engine/install/) or [Podman](https://podman.io/docs/installation), if you want to run the Restate Server with Docker. And to run Jaeger.

    This guide is written for:
    - Rust SDK version: VAR::RUST_SDK_VERSION
    - Restate Server Docker image: `docker.restate.dev/restatedev/restate:VAR::RESTATE_VERSION`

</TabItem>
</Tabs>
</Admonition>

## Getting Started

<SubtleStep stepLabel="1" title="Set up the services">
<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">
Download the example and run locally with an IDE:
<CodeWithTabs>
    ```shell !!tabs CLI
    restate example typescript-tour-of-restate && cd typescript-tour-of-restate
    ```

    ```shell !!tabs wget
    wget https://github.com/restatedev/examples/releases/latest/download/typescript-tour-of-restate.zip &&
        unzip typescript-tour-of-restate.zip -d typescript-tour-of-restate &&
        rm typescript-tour-of-restate.zip
    ```
</CodeWithTabs>

Install the dependencies and build the app:
```shell
npm install && npm run build
```

Run the services

```shell
npm run dev
```

This [GitHub repository](https://github.com/restatedev/examples/tree/main/typescript/tutorials/tour-of-restate-typescript) contains the basic skeleton of the TypeScript services that you develop in this tutorial.


</TabItem>
<TabItem value="java" label="Java">

    <CodeWithTabs>
    ```shell !!tabs CLI
    restate example java-tour-of-restate && cd java-tour-of-restate
    ```

    ```shell !!tabs wget
    wget https://github.com/restatedev/examples/releases/latest/download/java-tour-of-restate.zip &&
        unzip java-tour-of-restate.zip -d java-tour-of-restate &&
        rm java-tour-of-restate.zip && cd java-tour-of-restate
    ```
    </CodeWithTabs>
    Run the services

    ```shell
    ./gradlew run
    ```

    This [GitHub repository](https://github.com/restatedev/examples/tree/main/java/tutorials/tour-of-restate-java) contains the basic skeleton of the Java services that you develop in this tutorial.


</TabItem>
<TabItem value="go" label="Go">

<CodeWithTabs>
```shell !!tabs CLI
restate example go-tour-of-restate && cd go-tour-of-restate
```

```shell !!tabs wget
wget https://github.com/restatedev/examples/releases/latest/download/go-tour-of-restate.zip &&
unzip go-tour-of-restate.zip -d go-tour-of-restate &&
rm go-tour-of-restate.zip && cd go-tour-of-restate
```
</CodeWithTabs>
Run the services

```shell
go run ./app
```

</TabItem>
<TabItem value="python" label="Python">
        Download the example and run locally with an IDE:
        <CodeWithTabs>
            ```shell !!tabs CLI
            restate example python-tour-of-restate && cd python-tour-of-restate
            ```

            ```shell !!tabs wget
            wget https://github.com/restatedev/examples/releases/latest/download/python-tour-of-restate.zip &&
            unzip python-tour-of-restate.zip -d python-tour-of-restate &&
            rm python-tour-of-restate.zip
            ```
        </CodeWithTabs>

        Setup your virtual environment:

        ```shell
        python3 -m venv .venv
        source .venv/bin/activate
        ```

        Install the requirements:

        ```shell
        pip install -r requirements.txt
        ```

        Run the services:

        ```shell
        python -m hypercorn --config hypercorn-config.toml tour/app/app:app
        ```

        This [GitHub repository](https://github.com/restatedev/examples/tree/main/python/tutorials/tour-of-restate-python) contains the basic skeleton of the Python services that you develop in this tutorial.

</TabItem>
    <TabItem value="rust" label="Rust">

        <CodeWithTabs>
            ```shell !!tabs CLI
            restate example rust-tour-of-restate && cd rust-tour-of-restate
            ```

            ```shell !!tabs wget
            wget https://github.com/restatedev/examples/releases/latest/download/rust-tour-of-restate.zip &&
            unzip rust-tour-of-restate.zip -d rust-tour-of-restate &&
            rm rust-tour-of-restate.zip && cd rust-tour-of-restate
            ```
        </CodeWithTabs>

        Run the services

        ```shell
        cargo run --bin app
        ```

    </TabItem>
</Tabs>

</SubtleStep>

<SubtleStep stepLabel="2" title="Launch Restate">

Restate is a single self-contained binary. No external dependencies needed. Check out our [Local Dev page](https://docs.restate.dev/develop/local_dev#running-restate-server--cli-locally) for instructions on how to install Restate Server, then do:

```shell
restate-server
```

    You can find the Restate UI running on port 9070 (`http://localhost:9070`) after starting the Restate Server.

</SubtleStep>


<SubtleStep stepLabel="3" title="Register the services with Restate">

Now, we need to tell Restate where our services are running.
You can register services via the UI (`http://localhost:9070`), the CLI or the Restate Admin API and supplying it the service endpoint URI:

    <TerminalWithTabs>
        # !!terminals

        ```shell !command CLI
        restate deployments register http://localhost:9080
        ```

        ```shell !output
        ❯ SERVICES THAT WILL BE ADDED:
        - CheckoutService
        Type: Service
        HANDLER  INPUT                                     OUTPUT
        handle   value of content-type 'application/json'  value of content-type 'application/json'

        - CartObject
        Type: VirtualObject ⬅️ 🚶🚶🚶
        HANDLER       INPUT                                     OUTPUT
        addTicket     value of content-type 'application/json'  value of content-type 'application/json'
        expireTicket  value of content-type 'application/json'  none
        checkout      none                                      value of content-type 'application/json'                                 value of content-type 'application/json'

        - TicketObject
        Type: VirtualObject ⬅️ 🚶🚶🚶
        HANDLER     INPUT  OUTPUT
        unreserve   none   none
        reserve     none   value of content-type 'application/json'
        markAsSold  none   none


        ✔ Are you sure you want to apply those changes? · yes
        ✅ DEPLOYMENT:
        SERVICE          REV
        TicketObject     1
        CheckoutService  1
        CartObject       1
        ```


        # !!terminals

        ```shell !command curl
        curl localhost:9070/deployments --json '{"uri": "http://localhost:9080"}'
        ```

        ```json !output curl
        {
            "id": "dp_11pXug0mWsff2NOoRBZbOcV",
            "services": [
        {
            "name": "TicketObject",
            /* ... Additional information on registered methods ...*/
        },
        {
            "name": "CartObject",
            /* ... Additional information on registered methods ...*/
        },
        {
            "name": "CheckoutService",
            /* ... Additional information on registered methods ...*/
        }
            ]
        }
        ```

    </TerminalWithTabs>

If you run Restate with Docker, replace `http://localhost:9080` by `http://host.docker.internal:9080`.
</SubtleStep>

<SubtleStep stepLabel="🚀" title="All set up!">
<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">
In `src/app` you will find the skeletons of the various services to help you start implementing the app.
    For example:
    ```typescript checkout_service.ts
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/typescript/tutorials/tour-of-restate-typescript/src/part1/checkout_service.ts#checkout
    ```

    Restate handlers have the Restate Context supplied as the first argument.
    This is the entrypoint to the SDK.

    The `app.ts` file contains the definition of the endpoint that hosts the services.


</TabItem>
<TabItem value="java" label="Java">
In `src/main/java/dev/restate/tour/app` you will find the skeletons of the various services to help you start implementing the app.
For example:
```java CheckoutService.java
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/java/tutorials/tour-of-restate-java/src/main/java/dev/restate/tour/part1/CheckoutService.java#service
```

Services are annotated by `@Service`. A service consists of a set of handlers, and each handler is annotated by `@Handler`.

Restate handlers have the Restate Context supplied as the first argument.
This is the entrypoint to the SDK.

The `AppMain.java` file contains the definition of the endpoint that hosts the services.
</TabItem>
<TabItem value="go" label="Go">
    In `app` you will find the skeletons of the various services to help you start implementing the app.
    For example:
    ```go checkoutservice.go
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/go/tutorials/tour-of-restate-go/part1/checkoutservice.go#checkout
    ```

    Restate handlers have the Restate Context supplied as the first argument.
    This is the entrypoint to the SDK.

    The `main.go` file contains the definition of the endpoint that hosts the services.

</TabItem>
<TabItem value="python" label="Python">
    In `tour/app` you will find the skeletons of the various services to help you start implementing the app.
    For example:
    ```python checkout_service.py
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/python/tutorials/tour-of-restate-python/tour/part1/checkout_service.py#checkout
    ```

    Restate handlers have the Restate Context supplied as the first argument.
    This is the entrypoint to the SDK.

    The `app.py` file contains the definition of the endpoint that hosts the services.

</TabItem>
    <TabItem value="rust" label="Rust">
        In `src/app` you will find the skeletons of the various services to help you start implementing the app.
        For example:
        ```rust checkout_service.rs
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/rust/tutorials/tour-of-restate-rust/src/part1/checkout_service.rs#checkout
        ```

        You implement your Rust Restate service by implementing a trait which contains the handlers.

        Restate handlers have the [Restate Context](https://docs.rs/restate-sdk/latest/restate_sdk/context/index.html) supplied as the first argument.
        This is the entrypoint to the SDK.

        The `main.rs` file contains the definition of the endpoint that hosts the services.

    </TabItem>
</Tabs>
</SubtleStep>


## Invoking Handlers
<Admonition type="note" title="Implement it yourself or follow along by looking at the code under part1"/>

Handlers can be invoked in several ways: via HTTP requests, programmatically with the SDK, or via Kafka events.

### Request-response calls over HTTP
Let's start with invoking our handler over HTTP.
We can either use the Restate UI playground or `curl`.

<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">
For example, add a ticket `seat2B` to the cart of Mary by calling the `addTicket` handler of the `CartObject`.

In the UI, click on the `CartObject` service, then on `Playground`, and invoke your handler from there with key `Mary` and body `"seat2B"`.

Or via `curl`:

```shell
curl localhost:8080/CartObject/Mary/addTicket --json '"seat2B"'
```

If this prints out `true`, then you have a working setup.

When Mary wants to proceed with the purchase, call the `checkout` handler of the `CartObject`.

Via `curl`:

```shell
curl -X POST localhost:8080/CartObject/Mary/checkout
```
</TabItem>
<TabItem value="java" label="Java">
For example, add a ticket `seat2B` to the cart of Mary by calling the `addTicket` handler of the `CartObject`:

In the UI, click on the `CartObject` service, then on `Playground`, and invoke your handler from there with key `Mary` and body `"seat2B"`.

Or via `curl`:

```shell
curl localhost:8080/CartObject/Mary/addTicket --json '"seat2B"'
```

If this prints out `true`, then you have a working setup.

When Mary wants to proceed with the purchase, call the `checkout` handler of the `CartObject`:

Via `curl`:

```shell
curl -X POST localhost:8080/CartObject/Mary/checkout
```
</TabItem>
<TabItem value="go" label="Go">
    For example, add a ticket `seat2B` to the cart of Mary by calling the `AddTicket` handler of the `CartObject`:

    In the UI, click on the `CartObject` service, then on `Playground`, and invoke your handler from there with key `Mary` and body `"seat2B"`.

    Or via `curl`:

    ```shell
    curl localhost:8080/CartObject/Mary/AddTicket --json '"seat2B"'
    ```

    If this prints out `true`, then you have a working setup.

    When Mary wants to proceed with the purchase, call the `Checkout` handler of the `CartObject`:

    Via `curl`:

    ```shell
    curl -X POST localhost:8080/CartObject/Mary/Checkout
    ```
</TabItem>
<TabItem value="py" label="Python">
        For example, add a ticket `seat2B` to the cart of Mary by calling the `addTicket` handler of the `CartObject`:

        In the UI, click on the `CartObject` service, then on `Playground`, and invoke your handler from there with key `Mary` and body `"seat2B"`.

        Or via `curl`:

        ```shell
        curl localhost:8080/CartObject/Mary/addTicket --json '"seat2B"'
        ```

        If this prints out `true`, then you have a working setup.

        When Mary wants to proceed with the purchase, call the `checkout` handler of the `CartObject`:

    Via `curl`:

        ```shell
        curl -X POST localhost:8080/CartObject/Mary/checkout
        ```
</TabItem>
    <TabItem value="rust" label="Rust">
        For example, add a ticket `seat2B` to the cart of Mary by calling the `addTicket` handler of the `CartObject`:

        In the UI, click on the `CartObject` service, then on `Playground`, and invoke your handler from there with key `Mary` and body `"seat2B"`.

        Or via `curl`:

        ```shell
        curl localhost:8080/CartObject/Mary/addTicket --json '"seat2B"'
        ```

        If this prints out `true`, then you have a working setup.

        When Mary wants to proceed with the purchase, call the `checkout` handler of the `CartObject`:

        Via `curl`:

        ```shell
        curl -X POST localhost:8080/CartObject/Mary/checkout
        ```
    </TabItem>
</Tabs>

We will use these two `curl` commands often when developing the code, so keep them handy.

<Admonition type="note" title="Restate as proxy">
    Restate acts as a proxy for your services. It forwards the request to the correct service and handler.
    Therefore, the request is sent to Restate and not directly to the service.
</Admonition>

<Admonition type="note" title={<>Why does the path contain <code>Mary</code>?</>}>
    Handlers are either a part of plain services or Virtual Objects.
    Virtual Objects are a special type of service that allows you to group handlers together, share state between them, and control concurrency.
    Each Virtual Object has a unique key.
    We will cover the difference in more detail later.
    For now, it's important to note that when invoking a handler within a Virtual Object, you need to specify its key.
    In our example, the `CartObject` and `TicketObject` are Virtual Objects, while the `CheckoutService` is a plain service.
    To add the ticket to Mary's cart, we need to specify the key `Mary` in the path to reach her Virtual Object.
</Admonition>

We can do the same programmatically within a handler by using the SDK. Let's try this out!

### Request-response calls between handlers

You can also call other handlers programmatically by using the clients generated by the Restate SDK.
Let's try this out!

<Tabs groupId="sdk" queryString className={"display-none"}>
    <TabItem value="ts" label="TypeScript">
        When we add a ticket to the cart, the `CartObject/addTicket` handler first needs to reserve the ticket for the user.
        It does that by calling the `TicketObject/reserve` handler:

        ```typescript cart_object.ts
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/typescript/tutorials/tour-of-restate-typescript/src/part1/cart_object.ts#add_ticket
        ```
        <details className="grey-details">
            <summary>Service logs</summary>

            ```log
            // withClass highlight-line
            [restate] [CartObject/addTicket][inv_1gdJBtdVEcM95mw1LLMMJY1Y0thJ9ugFGN][2024-03-18T16:30:28.790Z] DEBUG: Invoking function.
            [restate] [CartObject/addTicket][inv_1gdJBtdVEcM95mw1LLMMJY1Y0thJ9ugFGN][2024-03-18T16:30:28.792Z] DEBUG: Adding message to journal and sending to Restate ; InvokeEntryMessage
            [restate] [CartObject/addTicket][inv_1gdJBtdVEcM95mw1LLMMJY1Y0thJ9ugFGN][2024-03-18T16:30:28.792Z] DEBUG: Scheduling suspension in 30000 ms
            // withClass highlight-line
            [restate] [TicketObject/reserve][inv_1k78Krj3GqrK6odGaRe866kHZilkVf1H4l][2024-03-18T16:30:28.796Z] DEBUG: Invoking function.
            [restate] [TicketObject/reserve][inv_1k78Krj3GqrK6odGaRe866kHZilkVf1H4l][2024-03-18T16:30:28.796Z] DEBUG: Journaled and sent output message ; OutputStreamEntryMessage
            // withClass highlight-line
            [restate] [TicketObject/reserve][inv_1k78Krj3GqrK6odGaRe866kHZilkVf1H4l][2024-03-18T16:30:28.796Z] DEBUG: Function completed successfully.
            [restate] [CartObject/addTicket][inv_1gdJBtdVEcM95mw1LLMMJY1Y0thJ9ugFGN][2024-03-18T16:30:28.799Z] DEBUG: Received completion message from Restate, adding to journal. ; CompletionMessage
            [restate] [CartObject/addTicket][inv_1gdJBtdVEcM95mw1LLMMJY1Y0thJ9ugFGN][2024-03-18T16:30:28.800Z] DEBUG: Journaled and sent output message ; OutputStreamEntryMessage
            // withClass highlight-line
            [restate] [CartObject/addTicket][inv_1gdJBtdVEcM95mw1LLMMJY1Y0thJ9ugFGN][2024-03-18T16:30:28.800Z] DEBUG: Function completed successfully.
            ```

        </details>

        1. **Create the client** via `ctx.serviceClient` or `ctx.objectClient` (for Virtual Objects). Specify the service definition (`TicketObject`) and optionally the Virtual Object key (`ticketId`).
        2. **Specify the handler** you want to call and supply the request. Here `reserve()`.
        3. **Await the response** of the call.

        Send a request to `CartObject/addTicket` as we did [previously](#request-response-calls-over-http), and have a look at the service logs.

    </TabItem>
    <TabItem value="java" label="Java">
        When we add a ticket to the cart, the `CartObject/addTicket` handler first needs to reserve the ticket for the user.
        It does that by calling the `TicketObject/reserve` handler:

        ```java CartObject.java
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/java/tutorials/tour-of-restate-java/src/main/java/dev/restate/tour/part1/CartObject.java#add_ticket
        ```

        <details className="grey-details">
            <summary>Service logs</summary>

            ```log
            // withClass highlight-line
            2024-04-16 17:18:59 DEBUG [CartObject/addTicket] dev.restate.sdk.http.vertx.RequestHttpServerHandler - Handling request to CartObject/addTicket
            2024-04-16 17:18:59 INFO  [CartObject/addTicket] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Start processing invocation
            2024-04-16 17:19:00 DEBUG [CartObject/addTicket][inv_1aiqX0vFEFNH5LkrvugCbFBq1VKcNrjuzn] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to REPLAYING
            2024-04-16 17:19:00 DEBUG [CartObject/addTicket][inv_1aiqX0vFEFNH5LkrvugCbFBq1VKcNrjuzn] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [1](): InvokeEntryMessage
            // withClass highlight-line
            2024-04-16 17:19:00 DEBUG [TicketObject/reserve] dev.restate.sdk.http.vertx.RequestHttpServerHandler - Handling request to TicketObject/reserve
            2024-04-16 17:19:00 INFO  [TicketObject/reserve] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Start processing invocation
            2024-04-16 17:19:00 DEBUG [TicketObject/reserve][inv_1aAMfXkieWDz1fARH9n1r2H1YjjsTZxei5] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to REPLAYING
            2024-04-16 17:19:00 DEBUG [TicketObject/reserve][inv_1aAMfXkieWDz1fARH9n1r2H1YjjsTZxei5] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [1](): OutputEntryMessage
            2024-04-16 17:19:00 INFO  [TicketObject/reserve][inv_1aAMfXkieWDz1fARH9n1r2H1YjjsTZxei5] dev.restate.sdk.core.InvocationStateMachine - End invocation
            2024-04-16 17:19:00 DEBUG [TicketObject/reserve][inv_1aAMfXkieWDz1fARH9n1r2H1YjjsTZxei5] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to CLOSED
            2024-04-16 17:19:00 INFO  [TicketObject/reserve][inv_1aAMfXkieWDz1fARH9n1r2H1YjjsTZxei5] dev.restate.sdk.core.InvocationStateMachine - End invocation
            2024-04-16 17:19:00 DEBUG [CartObject/addTicket][inv_1aiqX0vFEFNH5LkrvugCbFBq1VKcNrjuzn] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [2](): OutputEntryMessage
            2024-04-16 17:19:00 INFO  [CartObject/addTicket][inv_1aiqX0vFEFNH5LkrvugCbFBq1VKcNrjuzn] dev.restate.sdk.core.InvocationStateMachine - End invocation
            2024-04-16 17:19:00 DEBUG [CartObject/addTicket][inv_1aiqX0vFEFNH5LkrvugCbFBq1VKcNrjuzn] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to CLOSED
            2024-04-16 17:19:00 INFO  [CartObject/addTicket][inv_1aiqX0vFEFNH5LkrvugCbFBq1VKcNrjuzn] dev.restate.sdk.core.InvocationStateMachine - End invocation
            ```
        </details>

        1. **Use the pre-generated client** (`TicketObject`): This gets generated when you compile the code for the first time.
        So if you haven't done that yet, run `./gradlew build` to generate the client.
        2. **Supply the context** (and specify the Virtual Object) key via `fromContext(ctx, ticketId)`.
        3. **Specify the handler** you want to call and supply the request. Here `reserve()`.
        4. **Await the response** of the call.

        Once you have added this to the code, restart the service, call the `CartObject/addTicket` method as we did [previously](#request-response-calls-over-http), and have a look at the service logs.

    </TabItem>
    <TabItem value="go" label="Go">
        When we add a ticket to the cart, the `CartObject/AddTicket` handler first needs to reserve the ticket for the user.
        It does that by calling the `TicketObject/Reserve` handler:

        ```go cartobject.go
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/go/tutorials/tour-of-restate-go/part1/cartobject.go#add_ticket
        ```
        <details className="grey-details">
            <summary>Service logs</summary>

            ```log
            2024/08/16 13:40:47 INFO Handling invocation method=CartObject/AddTicket invocationID=inv_1fmRNvSNVxNp0QGHxdcBOYZTbVbvHUMuQh
            2024/08/16 13:40:47 INFO Handling invocation method=TicketObject/Reserve invocationID=inv_19maBIcE9uRD2cN79SYc6Ef1KldA21IG1H
            2024/08/16 13:40:47 INFO Invocation completed successfully method=TicketObject/Reserve invocationID=inv_19maBIcE9uRD2cN79SYc6Ef1KldA21IG1H
            2024/08/16 13:40:47 INFO Invocation completed successfully method=CartObject/AddTicket invocationID=inv_1fmRNvSNVxNp0QGHxdcBOYZTbVbvHUMuQh
            ```

        </details>

        1. **Create the client** via `restate.Service` or `restate.Object` (for Virtual Objects). Specify the return type (`bool`) as a type parameter, the service name (`TicketObject`) and method (`Reserve`) and where necessary the Virtual Object key (`ticketId`).
        2. **Specify what type of call you want to make** - in this case we want a synchronous request-response call so we use `Request()`, passing `restate.Void{}` as this handler needs no input type.

        Send a request to `CartObject/AddTicket` as we did [previously](#request-response-calls-over-http), and have a look at the service logs.

    </TabItem>
    <TabItem value="python" label="Python">
        When we add a ticket to the cart, the `CartObject/addTicket` handler first needs to reserve the ticket for the user.
        It does that by calling the `TicketObject/reserve` handler:

        ```python cart_object.py
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/python/tutorials/tour-of-restate-python/tour/part1/cart_object.py#add_ticket
        ```

        1. Use **`ctx.service_call`** (for Services) or **`ctx.object_call`** (for Virtual Objects).
        2. **Specify the handler** you want to call and supply the request: Here, we supply the `reserve` method that we import from the `TicketObject`.
        For Virtual Objects, you also need to specify the key of the Virtual Object that you want to call. Here, this is the ticket ID.
        3. **Await the response** of the call.

        Send a request to `CartObject/addTicket` as we did [previously](#request-response-calls-over-http).
        You can see the calls to `addTicket` and `reserve` in the Restate Server logs.

    </TabItem>
    <TabItem value="rust" label="Rust">
        When we add a ticket to the cart, the `CartObject/addTicket` handler first needs to reserve the ticket for the user.
        It does that by calling the `TicketObject/reserve` handler:

        ```rust cart_object.rs
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/rust/tutorials/tour-of-restate-rust/src/part1/cart_object.rs#add_ticket
        ```

        1. **Create the client** via `ctx.service_client` or `ctx.object_client` (for Virtual Objects). Specify the service client definition (`TicketObjectClient`) and optionally the Virtual Object key (`ticket_id`).
        2. **Specify the handler** you want to call and supply the request. Here `reserve()`.
        3. **Await the response** of the call.

        Send a request to `CartObject/addTicket` as we did [previously](#request-response-calls-over-http), and have a look at the service logs.

    </TabItem>
</Tabs>


### Sending messages between handlers

We can also let handlers send messages to other handlers without waiting for a response.

<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">

In the example, when a seat gets added to the shopping cart, it gets reserved for 15 minutes.
When a user didn't proceed with the payment before the timeout, the `CartObject/expireTicket` handler is triggered.
Let the `expireTicket` handler call the `TicketObject/unreserve` handler.

```typescript cart_object.ts
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/typescript/tutorials/tour-of-restate-typescript/src/part1/cart_object.ts#expire_ticket
```

Specify that you want to call the `TicketObject` by supplying it to the `objectSendClient` function.
Then call the `unreserve` handler on the `TicketObject`.

Once you have added this to the code, call the `CartObject/expireTicket` handler:

```shell
curl localhost:8080/CartObject/Mary/expireTicket --json '"seat2B"'
```
<details className="grey-details">
    <summary>Service logs</summary>

    ```log
    [restate] [CartObject/expireTicket][inv_1gdJBtdVEcM942bjcDmb1c1khoaJe11Hbz][2024-03-18T16:14:24.671Z] DEBUG: Invoking function.
    [restate] [CartObject/expireTicket][inv_1gdJBtdVEcM942bjcDmb1c1khoaJe11Hbz][2024-03-18T16:14:24.672Z] DEBUG: Adding message to journal and sending to Restate ; BackgroundInvokeEntryMessage
    [restate] [CartObject/expireTicket][inv_1gdJBtdVEcM942bjcDmb1c1khoaJe11Hbz][2024-03-18T16:14:24.673Z] DEBUG: Journaled and sent output message ; OutputStreamEntryMessage
    // withClass highlight-line
    [restate] [CartObject/expireTicket][inv_1gdJBtdVEcM942bjcDmb1c1khoaJe11Hbz][2024-03-18T16:14:24.673Z] DEBUG: Function completed successfully.
    [restate] [TicketObject/unreserve][inv_1k78Krj3GqrK3GuJXkgaXBbg69R47TCeAN][2024-03-18T16:14:24.677Z] DEBUG: Invoking function.
    [restate] [TicketObject/unreserve][inv_1k78Krj3GqrK3GuJXkgaXBbg69R47TCeAN][2024-03-18T16:14:24.677Z] DEBUG: Journaled and sent output message ; OutputStreamEntryMessage
    // withClass highlight-line
    [restate] [TicketObject/unreserve][inv_1k78Krj3GqrK3GuJXkgaXBbg69R47TCeAN][2024-03-18T16:14:24.677Z] DEBUG: Function completed successfully.
    ```

</details>

The service logs show how the `expireTicket` handler gets executed and then the `unreserve` handler.
The call to `expireTicket` finishes earlier than the `unreserve` handler because `expireTicket` didn't wait for the response of the `unreserve` handler.

</TabItem>
<TabItem value="java" label="Java">

In the example, when a seat gets added to the shopping cart, it gets reserved for 15 minutes.
When a user didn't proceed with the payment before the timeout, the `CartObject/expireTicket` handler is triggered.
Let the `expireTicket` handler call the `TicketObject/unreserve` handler.

```java CartObject.java
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/java/tutorials/tour-of-restate-java/src/main/java/dev/restate/tour/part1/CartObject.java#expire_ticket
```
You now call `send()` on the generated client to send a message instead of doing a request-response call.
You also don't need to await the response, as you don't expect one.

Call the handler via:
```shell
curl localhost:8080/CartObject/Mary/expireTicket --json '"seat2B"'
```
<details className="grey-details">
    <summary>Service logs</summary>

    ```log
    // withClass highlight-line
    2024-04-16 17:27:45 DEBUG [CartObject/expireTicket] dev.restate.sdk.http.vertx.RequestHttpServerHandler - Handling request to CartObject/expireTicket
    2024-04-16 17:27:45 INFO  [CartObject/expireTicket] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Start processing invocation
    2024-04-16 17:27:45 DEBUG [CartObject/expireTicket][inv_1aiqX0vFEFNH0T0mRlvCk7xTVSB5xQIaKR] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to REPLAYING
    2024-04-16 17:27:45 DEBUG [CartObject/expireTicket][inv_1aiqX0vFEFNH0T0mRlvCk7xTVSB5xQIaKR] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [1](): BackgroundInvokeEntryMessage
    2024-04-16 17:27:45 DEBUG [CartObject/expireTicket][inv_1aiqX0vFEFNH0T0mRlvCk7xTVSB5xQIaKR] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [2](): OutputEntryMessage
    2024-04-16 17:27:45 INFO  [CartObject/expireTicket][inv_1aiqX0vFEFNH0T0mRlvCk7xTVSB5xQIaKR] dev.restate.sdk.core.InvocationStateMachine - End invocation
    2024-04-16 17:27:45 DEBUG [CartObject/expireTicket][inv_1aiqX0vFEFNH0T0mRlvCk7xTVSB5xQIaKR] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to CLOSED
    // withClass highlight-line
    2024-04-16 17:27:45 INFO  [CartObject/expireTicket][inv_1aiqX0vFEFNH0T0mRlvCk7xTVSB5xQIaKR] dev.restate.sdk.core.InvocationStateMachine - End invocation
    // withClass highlight-line
    2024-04-16 17:27:45 DEBUG [TicketObject/unreserve] dev.restate.sdk.http.vertx.RequestHttpServerHandler - Handling request to TicketObject/unreserve
    2024-04-16 17:27:45 INFO  [TicketObject/unreserve] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Start processing invocation
    2024-04-16 17:27:45 DEBUG [TicketObject/unreserve][inv_1aAMfXkieWDz6IcQAkXhOPoZ3T9A9KTC3D] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to REPLAYING
    2024-04-16 17:27:45 DEBUG [TicketObject/unreserve][inv_1aAMfXkieWDz6IcQAkXhOPoZ3T9A9KTC3D] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [1](): OutputEntryMessage
    2024-04-16 17:27:45 INFO  [TicketObject/unreserve][inv_1aAMfXkieWDz6IcQAkXhOPoZ3T9A9KTC3D] dev.restate.sdk.core.InvocationStateMachine - End invocation
    2024-04-16 17:27:45 DEBUG [TicketObject/unreserve][inv_1aAMfXkieWDz6IcQAkXhOPoZ3T9A9KTC3D] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to CLOSED
    2024-04-16 17:27:45 INFO  [TicketObject/unreserve][inv_1aAMfXkieWDz6IcQAkXhOPoZ3T9A9KTC3D] dev.restate.sdk.core.InvocationStateMachine - End invocation
    ```

</details>

The service logs show how the `expireTicket` handler gets executed and then the `unreserve` handler.
The call to `expireTicket` finishes earlier than the `unreserve` handler because `expireTicket` didn't wait for the response of the `unreserve` handler.

</TabItem>
<TabItem value="go" label="Go">

    In the example, when a seat gets added to the shopping cart, it gets reserved for 15 minutes.
    When a user didn't proceed with the payment before the timeout, the `CartObject/ExpireTicket` handler is triggered.
    Let the `ExpireTicket` handler call the `TicketObject/Unreserve` handler.

    ```go cartobject.go
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/go/tutorials/tour-of-restate-go/part1/cartobject.go#expire_ticket
    ```

    Specify that you want to call the `TicketObject` by supplying the service and method names to the `ObjectSend()` function.
    This function is an alternative to `Object()` which provides a client that can only send one-way messages
    and therefore doesn't need an output type parameter. Finally call the `Send` method on the returned client.

    Once you have added this to the code, call the `CartObject/ExpireTicket` handler:

    ```shell
    curl localhost:8080/CartObject/Mary/ExpireTicket --json '"seat2B"'
    ```
    <details className="grey-details">
        <summary>Service logs</summary>

        ```log
        2024/08/16 13:55:31 INFO Handling invocation method=CartObject/ExpireTicket invocationID=inv_1fmRNvSNVxNp6GGSrDXviABHoq8paj5Bqp
        // withClass highlight-line
        2024/08/16 13:55:31 INFO Invocation completed successfully method=CartObject/ExpireTicket invocationID=inv_1fmRNvSNVxNp6GGSrDXviABHoq8paj5Bqp
        2024/08/16 13:55:31 INFO Handling invocation method=TicketObject/Unreserve invocationID=inv_19maBIcE9uRD30z1j0kx3N3SOEPCngmSrL
        // withClass highlight-line
        2024/08/16 13:55:31 INFO Invocation completed successfully method=TicketObject/Unreserve invocationID=inv_19maBIcE9uRD30z1j0kx3N3SOEPCngmSrL
        ```

    </details>

    The service logs show how the `ExpireTicket` handler gets executed and then the `Unreserve` handler.
    The call to `ExpireTicket` finishes earlier than the `Unreserve` handler because `ExpireTicket` didn't wait for the response of the `Unreserve` handler.

</TabItem>
<TabItem value="python" label="Python">

        In the example, when a seat gets added to the shopping cart, it gets reserved for 15 minutes.
        When a user didn't proceed with the payment before the timeout, the `CartObject/expireTicket` handler is triggered.
        Let the `expireTicket` handler call the `TicketObject/unreserve` handler.

        ```python cart_object.py
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/python/tutorials/tour-of-restate-python/tour/part1/cart_object.py#expire_ticket
        ```

        Import the `unreserve` handler from the `TicketObject` and supply it to `ctx.object_send` together with the ticket ID.

        Once you have added this to the code, call the `CartObject/expireTicket` handler:

        ```shell
        curl localhost:8080/CartObject/Mary/expireTicket --json '"seat2B"'
        ```

        The Restate Server logs show how the `expireTicket` handler gets executed and then the `unreserve` handler.

</TabItem>
    <TabItem value="rust" label="Rust">

        In the example, when a seat gets added to the shopping cart, it gets reserved for 15 minutes.
        When a user didn't proceed with the payment before the timeout, the `CartObject/expireTicket` handler is triggered.
        Let the `expireTicket` handler call the `TicketObject/unreserve` handler.

        ```rust cart_object.rs
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/rust/tutorials/tour-of-restate-rust/src/part1/cart_object.rs#expire_ticket
        ```

        Specify that you want to call the `TicketObject` by supplying it to the `objectSendClient` function.
        Then call the `unreserve` handler on the `TicketObject`.

        Once you have added this to the code, call the `CartObject/expireTicket` handler:

        ```shell
        curl localhost:8080/CartObject/Mary/expireTicket --json '"seat2B"'
        ```
        <details className="grey-details">
            <summary>Restate Server logs</summary>

            ```log
            2024-12-04T15:07:45.433676Z INFO restate_invoker_impl::invocation_task::service_protocol_runner
                Executing invocation at deployment
                invocation.id: inv_1fmRNvSNVxNp4FUgwSGEjqoFhgJ0hGDuQF
                deployment.address: http://localhost:9080/
                deployment.service_protocol_version: 2
                path: /invoke/CartObject/expireTicket
                on rt:pp-6
            2024-12-04T15:07:45.477915Z INFO restate_invoker_impl::invocation_task::service_protocol_runner
                Executing invocation at deployment
                invocation.id: inv_19maBIcE9uRD7xz4t15JdI6n9E5NGfpx7z
                deployment.address: http://localhost:9080/
                deployment.service_protocol_version: 2
                path: /invoke/TicketObject/unreserve
                on rt:pp-16
            ```

        </details>

        The Restate Server logs show how the `expireTicket` handler gets executed and then the `unreserve` handler.
        The call to `expireTicket` finishes earlier than the `unreserve` handler because `expireTicket` didn't wait for the response of the `unreserve` handler.

    </TabItem>
</Tabs>

<Admonition type="tip" title="Restate as message queue">
Restate persists and retries failed one-way invocations. There is no need to set up message queues to ensure delivery!
</Admonition>

<Admonition type="info" title="Sending messages via `curl`">
To send messages via the UI or `curl`, add `/send` to the handler path:
<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">
    <Terminal>
    ```shell !command
    curl localhost:8080/CartObject/Mary/addTicket/send --json '"seat2B"'
    ```

    ```json !output
    {"invocationId":"inv_1aiqX0vFEFNH1Umgre58JiCLgHfTtztYK5","status":"Accepted"}
    ```
    </Terminal>
</TabItem>
<TabItem value="java" label="Java">
    <Terminal>
    ```shell !command
    curl localhost:8080/CartObject/Mary/addTicket/send --json '"seat2B"'
    ```

    ```json !output
    {"invocationId":"inv_1aiqX0vFEFNH1Umgre58JiCLgHfTtztYK5","status":"Accepted"}
    ```
    </Terminal>
</TabItem>
<TabItem value="go" label="Go">
    <Terminal>
    ```shell !command
    curl localhost:8080/CartObject/Mary/AddTicket/send --json '"seat2B"'
    ```

    ```json !output
    {"invocationId":"inv_1aiqX0vFEFNH1Umgre58JiCLgHfTtztYK5","status":"Accepted"}
    ```
    </Terminal>
</TabItem>
<TabItem value="python" label="Python">
    <Terminal>
    ```shell !command
    curl localhost:8080/CartObject/Mary/addTicket/send --json '"seat2B"'
    ```

    ```json !output
    {"invocationId":"inv_1aiqX0vFEFNH1Umgre58JiCLgHfTtztYK5","status":"Accepted"}
    ```
    </Terminal>
</TabItem>
</Tabs>

This returns the invocation ID. This is a unique identifier for the invocation.
You can use it to track the progress of the invocation via the CLI, and to correlate logs and metrics.
</Admonition>

### 📝 Try it out

<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">
Make the `CartObject/checkout` handler call the `CheckoutService/handle` handler.

For the request field, you can use a hard-coded string array for now: `["seat2B"]`.
You will fix this later on. Note that the `CheckoutService` is not a Virtual Object, so you don't need to specify a key.

<details>
    <summary>Solution</summary>

    Add the following code to the `CartObject/checkout` handler:

            ```typescript cart_object.ts
            CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/typescript/tutorials/tour-of-restate-typescript/src/part1/cart_object.ts#checkout
            ```

            Call `CartObject/checkout` as you did [earlier](#request-response-calls-over-http) and have a look at the logs again to see what happened:

            ```log
            [restate] [CartObject/checkout][inv_1gdJBtdVEcM919dOBhoVBm3fUMlaIHnANr][2024-03-19T07:57:24.018Z] DEBUG: Invoking function.
            [restate] [CartObject/checkout][inv_1gdJBtdVEcM919dOBhoVBm3fUMlaIHnANr][2024-03-19T07:57:24.019Z] DEBUG: Adding message to journal and sending to Restate ; InvokeEntryMessage
            [restate] [CartObject/checkout][inv_1gdJBtdVEcM919dOBhoVBm3fUMlaIHnANr][2024-03-19T07:57:24.020Z] DEBUG: Scheduling suspension in 30000 ms
            [restate] [CheckoutService/handle][inv_16WnWCiCVV5G2gUUevDM4uIli4v7TN9k2d][2024-03-19T07:57:24.023Z] DEBUG: Invoking function.
            [restate] [CheckoutService/handle][inv_16WnWCiCVV5G2gUUevDM4uIli4v7TN9k2d][2024-03-19T07:57:24.024Z] DEBUG: Journaled and sent output message ; OutputStreamEntryMessage
            [restate] [CheckoutService/handle][inv_16WnWCiCVV5G2gUUevDM4uIli4v7TN9k2d][2024-03-19T07:57:24.024Z] DEBUG: Function completed successfully.
            [restate] [CartObject/checkout][inv_1gdJBtdVEcM919dOBhoVBm3fUMlaIHnANr][2024-03-19T07:57:24.026Z] DEBUG: Received completion message from Restate, adding to journal. ; CompletionMessage
            [restate] [CartObject/checkout][inv_1gdJBtdVEcM919dOBhoVBm3fUMlaIHnANr][2024-03-19T07:57:24.027Z] DEBUG: Journaled and sent output message ; OutputStreamEntryMessage
            [restate] [CartObject/checkout][inv_1gdJBtdVEcM919dOBhoVBm3fUMlaIHnANr][2024-03-19T07:57:24.027Z] DEBUG: Function completed successfully.
            ```
</details>
</TabItem>
<TabItem value="java" label="Java">
Make the `CartObject/checkout` handler call the `CheckoutService/handle` handler.

For the request field, you can use a hard-coded string array for now: `["seat2B"]`.
You will fix this later on. Note that the `CheckoutService` is not a Virtual Object, so you don't need to specify a key.

<details>
    <summary>Solution</summary>

    Add the following code to the `CartObject/checkout` handler:

    ```java CartObject.java
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/java/tutorials/tour-of-restate-java/src/main/java/dev/restate/tour/part1/CartObject.java#checkout
    ```

    Restart the service and call the `CartObject/checkout` handler as you did earlier and have a look at the logs again to see what happened.

    ```log
    // withClass highlight-line
    2024-04-16 17:32:10 DEBUG [CartObject/checkout] dev.restate.sdk.http.vertx.RequestHttpServerHandler - Handling request to CartObject/checkout
    2024-04-16 17:32:10 INFO  [CartObject/checkout] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Start processing invocation
    2024-04-16 17:32:10 DEBUG [CartObject/checkout][inv_1aiqX0vFEFNH7u1kZjvyH4KJpuO9j4njCp] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to REPLAYING
    2024-04-16 17:32:10 DEBUG [CartObject/checkout][inv_1aiqX0vFEFNH7u1kZjvyH4KJpuO9j4njCp] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [1](): InvokeEntryMessage
    // withClass highlight-line
    2024-04-16 17:32:10 DEBUG [CheckoutService/handle] dev.restate.sdk.http.vertx.RequestHttpServerHandler - Handling request to CheckoutService/handle
    2024-04-16 17:32:10 INFO  [CheckoutService/handle] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Start processing invocation
    2024-04-16 17:32:10 DEBUG [CheckoutService/handle][inv_12rkfeAcppNY3cI4F6DBZK8fir8uaIrIBP] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to REPLAYING
    2024-04-16 17:32:11 DEBUG [CheckoutService/handle][inv_12rkfeAcppNY3cI4F6DBZK8fir8uaIrIBP] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [1](): OutputEntryMessage
    2024-04-16 17:32:11 INFO  [CheckoutService/handle][inv_12rkfeAcppNY3cI4F6DBZK8fir8uaIrIBP] dev.restate.sdk.core.InvocationStateMachine - End invocation
    2024-04-16 17:32:11 DEBUG [CheckoutService/handle][inv_12rkfeAcppNY3cI4F6DBZK8fir8uaIrIBP] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to CLOSED
    2024-04-16 17:32:11 INFO  [CheckoutService/handle][inv_12rkfeAcppNY3cI4F6DBZK8fir8uaIrIBP] dev.restate.sdk.core.InvocationStateMachine - End invocation
    2024-04-16 17:32:11 DEBUG [CartObject/checkout][inv_1aiqX0vFEFNH7u1kZjvyH4KJpuO9j4njCp] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [2](): OutputEntryMessage
    2024-04-16 17:32:11 INFO  [CartObject/checkout][inv_1aiqX0vFEFNH7u1kZjvyH4KJpuO9j4njCp] dev.restate.sdk.core.InvocationStateMachine - End invocation
    2024-04-16 17:32:11 DEBUG [CartObject/checkout][inv_1aiqX0vFEFNH7u1kZjvyH4KJpuO9j4njCp] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to CLOSED
    2024-04-16 17:32:11 INFO  [CartObject/checkout][inv_1aiqX0vFEFNH7u1kZjvyH4KJpuO9j4njCp] dev.restate.sdk.core.InvocationStateMachine - End invocation
    ```
</details>
</TabItem>
<TabItem value="go" label="Go">
Make the `CartObject/Checkout` handler call the `CheckoutService/Handle` handler.

For the request field, you can use a hard-coded string array for now: `["seat2B"]`.
You will fix this later on. Note that the `CheckoutService` is not a Virtual Object, so you don't need to specify a key.

<details>
    <summary>Solution</summary>

    Add the following code to the `CartObject/Checkout` handler:

    ```go cartobject.go
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/go/tutorials/tour-of-restate-go/part1/cartobject.go#checkout
    ```

    Call `CartObject/Checkout` as you did [earlier](#request-response-calls-over-http) and have a look at the logs again to see what happened:

    ```log
    2024/08/16 13:41:03 INFO Handling invocation method=CartObject/Checkout invocationID=inv_1fmRNvSNVxNp3lG8MTJNCop4OwmqZXVRi9
    2024/08/16 13:41:03 INFO Handling invocation method=CheckoutService/Handle invocationID=inv_1keKt2264Zem3IoLhpf8KDmHMJnmbgUbsJ
    2024/08/16 13:41:03 INFO Invocation completed successfully method=CheckoutService/Handle invocationID=inv_1keKt2264Zem3IoLhpf8KDmHMJnmbgUbsJ
    2024/08/16 13:41:03 INFO Invocation completed successfully method=CartObject/Checkout invocationID=inv_1fmRNvSNVxNp3lG8MTJNCop4OwmqZXVRi9    ```
    ```
</details>
</TabItem>
    <TabItem value="python" label="Python">
        Make the `CartObject/checkout` handler call the `CheckoutService/handle` handler.

        For the request field, you can use a hard-coded string array for now: `["seat2B"]`.
        You will fix this later on. Note that the `CheckoutService` is not a Virtual Object, so you don't need to specify a key.

        <details>
            <summary>Solution</summary>

            Add the following code to the `CartObject/checkout` handler:

            ```python cart_object.py
            CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/python/tutorials/tour-of-restate-python/tour/part1/cart_object.py#checkout
            ```

            Call `CartObject/checkout` as you did [earlier](#request-response-calls-over-http) and have a look at the Restate Server logs again to see what happened:
        </details>
    </TabItem>
    <TabItem value="rust" label="Rust">
        Make the `CartObject/checkout` handler call the `CheckoutService/handle` handler.

        For the request field, you can use a hard-coded string array for now: `["seat2B"]`.
        You will fix this later on. Note that the `CheckoutService` is not a Virtual Object, so you don't need to specify a key.

        <details>
            <summary>Solution</summary>

            Add the following code to the `CartObject/checkout` handler:

            ```rust cart_object.rs
            CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/rust/tutorials/tour-of-restate-rust/src/part1/cart_object.rs#checkout
            ```

            This uses the `Json` wrapper type to enable serialization. Check the [serde docs](https://docs.rs/restate-sdk/latest/restate_sdk/serde/index.html) for more information.
            Call `CartObject/checkout` as you did [earlier](#request-response-calls-over-http) and have a look at the logs again to see what happened.

        </details>
    </TabItem>
</Tabs>

## Durable Execution

The calls we just did seem like regular RPC calls as you might know them from other service frameworks.
But under the hood a lot more is happening.

Restate makes RPC calls resilient by letting the Restate Server and SDK cooperate.
Restate tracks the execution of code in a journal and can replay it in case of a failure.
This is called **Durable Execution.**

Have a look at the animation to understand what happened under-the-hood:

<TourAnimation/>

Whenever a failure would happen, Restate would be able to recover the latest state of the handler by sending over the journal.
The code would fast-forward to the point where it crashed, and continue executing from there on.

<Tabs groupId="sdk" queryString className={"display-none"}>
    <TabItem value="ts" label="TypeScript">
        To see the recovery of partial progress in practice, let's make the `CartObject/addTicket` handler crash right after the call.

        ```typescript cart_object.ts
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/typescript/tutorials/tour-of-restate-typescript/src/part1/cart_object.ts#add_ticket
        ```

        Add the following code after the reservation call, to let the code throw an error after the call:
        ```typescript
        throw new Error("Failing");
        ```

        Call `CartObject/addTicket` again and have a look at the service logs.


        <details className={"grey-details"}>
            <summary>Service logs</summary>

            ```log
            // withClass highlight-line
            [restate] [CartObject/addTicket][inv_1aiqX0vFEFNH0TF1pLRFBDFosQCCTAN1M5][2024-04-16T13:28:20.245Z] DEBUG:  Adding message to journal and sending to Restate ; InvokeEntryMessage
            [restate] [CartObject/addTicket][inv_1aiqX0vFEFNH0TF1pLRFBDFosQCCTAN1M5][2024-04-16T13:28:20.246Z] DEBUG:  Scheduling suspension in 30000 ms
            [restate] [TicketObject/reserve][inv_1iGFK6hGrtOf3jcD8PupmCOJz1SDzvfPi1][2024-04-16T13:28:20.296Z] DEBUG:  Invoking function.
            [restate] [TicketObject/reserve][inv_1iGFK6hGrtOf3jcD8PupmCOJz1SDzvfPi1][2024-04-16T13:28:20.296Z] DEBUG:  Journaled and sent output message ; OutputEntryMessage
            // withClass highlight-line
            [restate] [TicketObject/reserve][inv_1iGFK6hGrtOf3jcD8PupmCOJz1SDzvfPi1][2024-04-16T13:28:20.296Z] DEBUG:  Function completed successfully.
            [restate] [CartObject/addTicket][inv_1aiqX0vFEFNH0TF1pLRFBDFosQCCTAN1M5][2024-04-16T13:28:20.362Z] DEBUG:  Received completion message from Restate, adding to journal.
            // withClass highlight-line ; CompletionMessage
            Trace: [restate] [CartObject/addTicket][inv_1aiqX0vFEFNH0TF1pLRFBDFosQCCTAN1M5][2024-04-16T13:28:20.363Z] TRACE:  Function completed with an error: Failing Error: Failing
            ... rest of trace ...
            [restate] [CartObject/addTicket][inv_1aiqX0vFEFNH0TF1pLRFBDFosQCCTAN1M5][2024-04-16T13:28:20.372Z] DEBUG:  Invocation ended with retryable error. ; ErrorMessage
            // withClass highlight-line
            [restate] [CartObject/addTicket][inv_1aiqX0vFEFNH0TF1pLRFBDFosQCCTAN1M5][2024-04-16T13:28:20.437Z] DEBUG:  Resuming (replaying) function.
            // withClass highlight-line
            [restate] [CartObject/addTicket][inv_1aiqX0vFEFNH0TF1pLRFBDFosQCCTAN1M5][2024-04-16T13:28:20.437Z] DEBUG:  Matched and replayed message from journal ; InvokeEntryMessage
            // withClass highlight-line
            Trace: [restate] [CartObject/addTicket][inv_1aiqX0vFEFNH0TF1pLRFBDFosQCCTAN1M5][2024-04-16T13:28:20.437Z] TRACE:  Function completed with an error: Failing Error: Failing
            ... rest of trace ...
            ```

        </details>


    </TabItem>
    <TabItem value="java" label="Java">
        To see the recovery of partial progress in practice, let's make the `CartObject/addTicket` handler crash right after the call.

        ```java CartObject.java
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/java/tutorials/tour-of-restate-java/src/main/java/dev/restate/tour/part1/CartObject.java#add_ticket
        ```

        Instead of returning true, let the code fail after the call:

        ```java
        throw new IllegalStateException("The handler failed");
        ```

        Call `CartObject/addTicket` again and have a look at the service logs.

        <details className={"grey-details"}>
            <summary>Service logs</summary>

            ```log
            // withClass highlight-line
            2024-04-16 17:33:59 DEBUG [CartObject/addTicket] dev.restate.sdk.http.vertx.RequestHttpServerHandler - Handling request to CartObject/addTicket
            2024-04-16 17:33:59 INFO  [CartObject/addTicket] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Start processing invocation
            2024-04-16 17:33:59 DEBUG [CartObject/addTicket][inv_1aiqX0vFEFNH5uLBb8M6CjbRkVUcVScH1T] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to REPLAYING
            2024-04-16 17:33:59 DEBUG [CartObject/addTicket][inv_1aiqX0vFEFNH5uLBb8M6CjbRkVUcVScH1T] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [1](): InvokeEntryMessage
            // withClass highlight-line
            2024-04-16 17:33:59 DEBUG [TicketObject/reserve] dev.restate.sdk.http.vertx.RequestHttpServerHandler - Handling request to TicketObject/reserve
            2024-04-16 17:33:59 INFO  [TicketObject/reserve] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Start processing invocation
            2024-04-16 17:33:59 DEBUG [TicketObject/reserve][inv_1aAMfXkieWDz6Dn3DPBWPXOWCarIhmgCSl] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to REPLAYING
            2024-04-16 17:33:59 DEBUG [TicketObject/reserve][inv_1aAMfXkieWDz6Dn3DPBWPXOWCarIhmgCSl] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [1](): OutputEntryMessage
            2024-04-16 17:33:59 INFO  [TicketObject/reserve][inv_1aAMfXkieWDz6Dn3DPBWPXOWCarIhmgCSl] dev.restate.sdk.core.InvocationStateMachine - End invocation
            2024-04-16 17:33:59 DEBUG [TicketObject/reserve][inv_1aAMfXkieWDz6Dn3DPBWPXOWCarIhmgCSl] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to CLOSED
            2024-04-16 17:33:59 INFO  [TicketObject/reserve][inv_1aAMfXkieWDz6Dn3DPBWPXOWCarIhmgCSl] dev.restate.sdk.core.InvocationStateMachine - End invocation
            // withClass highlight-line
            2024-04-16 17:33:59 WARN  [CartObject/addTicket][inv_1aiqX0vFEFNH5uLBb8M6CjbRkVUcVScH1T] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Error when processing the invocation
            java.lang.IllegalStateException: The handler failed
            ... rest of trace ...
            2024-04-16 17:33:59 WARN  [CartObject/addTicket][inv_1aiqX0vFEFNH5uLBb8M6CjbRkVUcVScH1T] dev.restate.sdk.core.InvocationStateMachine - Invocation failed
            java.lang.IllegalStateException: The handler failed
            ... rest of trace ...
            2024-04-16 17:33:59 DEBUG [CartObject/addTicket][inv_1aiqX0vFEFNH5uLBb8M6CjbRkVUcVScH1T] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to CLOSED
            2024-04-16 17:33:59 INFO  [CartObject/addTicket][inv_1aiqX0vFEFNH5uLBb8M6CjbRkVUcVScH1T] dev.restate.sdk.core.InvocationStateMachine - End invocation
            // withClass highlight-line
            2024-04-16 17:33:59 DEBUG [CartObject/addTicket] dev.restate.sdk.http.vertx.RequestHttpServerHandler - Handling request to CartObject/addTicket
            2024-04-16 17:33:59 INFO  [CartObject/addTicket] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Start processing invocation
            2024-04-16 17:33:59 DEBUG [CartObject/addTicket][inv_1aiqX0vFEFNH5uLBb8M6CjbRkVUcVScH1T] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to REPLAYING
            // withClass highlight-line
            2024-04-16 17:33:59 WARN  [CartObject/addTicket][inv_1aiqX0vFEFNH5uLBb8M6CjbRkVUcVScH1T] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Error when processing the invocation
            java.lang.IllegalStateException: The handler failed
            ... rest of trace ...
            2024-04-16 17:33:59 WARN  [CartObject/addTicket][inv_1aiqX0vFEFNH5uLBb8M6CjbRkVUcVScH1T] dev.restate.sdk.core.InvocationStateMachine - Invocation failed
            java.lang.IllegalStateException: The handler failed
            ... rest of trace ...
            ```

        </details>
    </TabItem>
    <TabItem value="go" label="Go">
        To see the recovery of partial progress in practice, let's make the `CartObject/AddTicket` handler crash right after the call.

        ```go cartobject.go
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/go/tutorials/tour-of-restate-go/part1/cartobject.go#add_ticket
        ```

        Add the following code after the reservation call, to let the code throw an error after the call:
        ```go
        return false, fmt.Errorf("Failing")
        ```

        Call `CartObject/AddTicket` again and have a look at the service logs.

        <details className={"grey-details"}>
            <summary>Service logs</summary>

            ```log
            // withClass highlight-line
            2024/08/16 15:22:01 INFO Handling invocation method=CartObject/AddTicket invocationID=inv_1fmRNvSNVxNp5kQH2M8E6VUscJII4P9QjL
            2024/08/16 15:22:01 INFO Handling invocation method=TicketObject/Reserve invocationID=inv_19maBIcE9uRD0VSkEQjYYaGPjXrHpUjZ8l
            // withClass highlight-line
            2024/08/16 15:22:01 INFO Invocation completed successfully method=TicketObject/Reserve invocationID=inv_19maBIcE9uRD0VSkEQjYYaGPjXrHpUjZ8l
            // withClass highlight-line
            2024/08/16 15:22:01 ERROR Invocation returned a non-terminal failure method=CartObject/AddTicket invocationID=inv_1fmRNvSNVxNp5kQH2M8E6VUscJII4P9QjL err=Failed
            2024/08/16 15:22:01 INFO Handling invocation method=CartObject/AddTicket invocationID=inv_1fmRNvSNVxNp5kQH2M8E6VUscJII4P9QjL
            // withClass highlight-line
            2024/08/16 15:22:01 ERROR Invocation returned a non-terminal failure method=CartObject/AddTicket invocationID=inv_1fmRNvSNVxNp5kQH2M8E6VUscJII4P9QjL err=Failed
            2024/08/16 15:22:01 INFO Handling invocation method=CartObject/AddTicket invocationID=inv_1fmRNvSNVxNp5kQH2M8E6VUscJII4P9QjL
            // withClass highlight-line
            2024/08/16 15:22:01 ERROR Invocation returned a non-terminal failure method=CartObject/AddTicket invocationID=inv_1fmRNvSNVxNp5kQH2M8E6VUscJII4P9QjL err=Failed
            ... rest of trace ...
            ```

        </details>


    </TabItem>
    <TabItem value="python" label="Python">
        To see the recovery of partial progress in practice, let's make the `CartObject/addTicket` handler crash right after the call.

        ```python cart_object.py
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/python/tutorials/tour-of-restate-python/tour/part1/cart_object.py#add_ticket
        ```

        Add the following code after the reservation call, to let the code throw an error after the call:
        ```python
        raise Exception("Failing")
        ```

        Call `CartObject/addTicket` again and have a look at the Restate Server logs to see what happens.


    </TabItem>
    <TabItem value="rust" label="Rust">
        To see the recovery of partial progress in practice, let's make the `CartObject/addTicket` handler crash right after the call.

        ```rust cart_object.rs
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/rust/tutorials/tour-of-restate-rust/src/part1/cart_object.rs#add_ticket
        ```

        Add the following code instead of `Ok(true)`, to let the code throw an error after the call:
        ```rust
        Err(HandlerError::from("Failing"))
        ```

        Call `CartObject/addTicket` again and have a look at the Restate Server logs.


        <details className={"grey-details"}>
            <summary>Restate Server logs</summary>

            ```log
            2024-12-04T15:25:39.282811Z INFO restate_ingress_http::handler::service_handler
                Processing ingress request
                on rs:ingress-21
                in restate_ingress_http::handler::service_handler::ingress
                restate.invocation.id: inv_1fmRNvSNVxNp1VFYSBSCKmVgfRkWZbVzfb
                restate.invocation.target: CartObject/{key}/addTicket
            2024-12-04T15:25:39.286546Z INFO restate_invoker_impl::invocation_task::service_protocol_runner
                Executing invocation at deployment
                invocation.id: inv_1fmRNvSNVxNp1VFYSBSCKmVgfRkWZbVzfb
                deployment.address: http://localhost:9080/
                deployment.service_protocol_version: 2
                path: /invoke/CartObject/addTicket
                on rt:pp-6
            2024-12-04T15:25:39.330590Z INFO restate_invoker_impl::invocation_task::service_protocol_runner
                Executing invocation at deployment
                invocation.id: inv_19maBIcE9uRD3UPxndjMNW5lJAjAmeUeZz
                deployment.address: http://localhost:9080/
                deployment.service_protocol_version: 2
                path: /invoke/TicketObject/reserve
                on rt:pp-16
            2024-12-04T15:25:39.375611Z WARN restate_invoker_impl
                Error when executing the invocation, retrying in 54ms 813us 629ns.
                error: [RT0007] Error message received from the SDK with related entry Some(InvocationErrorRelatedEntry { related_entry_index: Some(1), related_entry_name: Some(""), related_entry_type: Some(Call) }): [500] Handler failed with retryable error: "Failing"'.
                Handler failed with retryable error: "Failing"'
                restate.error.code: RT0007
                restate.invocation.id: inv_1fmRNvSNVxNp1VFYSBSCKmVgfRkWZbVzfb
                restate.invocation.target: CartObject/Mary/addTicket
                on rt:pp-6

            2024-12-04T15:25:39.431335Z INFO restate_invoker_impl::invocation_task::service_protocol_runner
                Executing invocation at deployment
                invocation.id: inv_1fmRNvSNVxNp1VFYSBSCKmVgfRkWZbVzfb
                deployment.address: http://localhost:9080/
                deployment.service_protocol_version: 2
                path: /invoke/CartObject/addTicket
                on rt:pp-6
            2024-12-04T15:25:39.432803Z WARN restate_invoker_impl
                Error when executing the invocation, retrying in 122ms 933us 816ns.
                error: [RT0007] Error message received from the SDK with related entry Some(InvocationErrorRelatedEntry { related_entry_index: Some(1), related_entry_name: Some(""), related_entry_type: Some(Call) }): [500] Handler failed with retryable error: "Failing"'.
                Handler failed with retryable error: "Failing"'
                restate.error.code: RT0007
                restate.invocation.id: inv_1fmRNvSNVxNp1VFYSBSCKmVgfRkWZbVzfb
                restate.invocation.target: CartObject/Mary/addTicket
                on rt:pp-6
            ```

        </details>
    </TabItem>
</Tabs>

You see the retries taking place. And you see that only the first time the call to the `TicketObject` was made.
The other times, the call was skipped and the journaled response was replayed.

[By default](/references/server_config#default-configuration), Restate will keep retrying failed invocations until they succeed.
If you want to cancel an invocation in a retry loop, you can use the CLI to do this. Let's have a look at that next.

<Admonition type={"note"} title={"Error handling in Restate"}>
    Discover more about Restate error handling, retry strategies, and common patterns in the [Error Handling guide.](/guides/error-handling)
</Admonition>

## Debugging with the UI and CLI

Now that we have a failing invocation, let's take the opportunity to show you how you can get more information about what is going on via the UI or CLI.
Find the failing invocation in the list and have a look at it!

### Debugging with the UI

The UI lets you debug invocations from the invocations tab, where you can find information on retry counts, error messages, the journal, the deployment, and more.

### Debugging with the CLI

The CLI is a management tool that lets you interact with the Restate Server.
You can use it to boostrap a new project, but also to get information about the services and invocations.

Have a look at some useful commands and try them out yourself.

List the services:

<Terminal>

    ```shell !command
    restate services list
    ```

    ```shell !output
    NAME             REVISION  FLAVOR    DEPLOYMENT TYPE  DEPLOYMENT ID
    🌎  CartObject       1         ⬅️ 🚶🚶🚶  HTTP 2           dp_11pXug0mWsff2NOoRBZbOcV
    🌎  CheckoutService  1                   HTTP 2           dp_11pXug0mWsff2NOoRBZbOcV
    🌎  TicketObject     1         ⬅️ 🚶🚶🚶  HTTP 2           dp_11pXug0mWsff2NOoRBZbOcV`,
    `$ restate services describe CartObject
    📜 Service Information:
    ―――――――――――――――――――――――
    Name:             CartObject
    Service type:     VirtualObject
    Revision:         1
    Public:           true
    Deployment ID:    dp_11pXug0mWsff2NOoRBZbOcV
    Deployment Type:  HTTP 2
    Protocol Style:   Streaming
    Endpoint:         http://localhost:9080/
    Created at:       2024-04-23T12:32:16.691000000Z


    🔌 Handlers:
    ――――――――――――
    HANDLER       INPUT TYPE                 OUTPUT TYPE
    addTicket     one of "empty or value of  value with content-type "application/json"
    content-type */*"
    checkout      one of "empty or value of  value with content-type "application/json"
    content-type */*"
    expireTicket  one of "empty or value of  value with content-type "application/json"
    content-type */*"
    ```
</Terminal>

List the ongoing invocations:

<Terminal>
    ```shell !command
    restate invocations list
    ```

    ```shell !output
    ❯ [2024-04-23 14:41:59.365 +02:00] inv_1fmRNvSNVxNp5PTqHI4HLJ17HpxzhB3MEV
    Target:      CartObject/Mary/addTicket
    Status:      backing-off  (18 seconds and 284 ms. Retried 9 time(s). Next
    retry in in 8 seconds and 220 ms))
    Deployment:  dp_11pXug0mWsff2NOoRBZbOcV [required]
    Error:       [2024-04-23 14:42:13.706 +02:00]
    [500] Failing
    Caused by:   UNKNOWN
    ```
</Terminal>

You find the invocation that is retrying in the list.
Use its invocation ID (`inv_...`), to dig deeper and describe the invocation:

<Terminal>
    ```shell !command
    restate invocations describe inv_1fmRNvSNVxNp5PTqHI4HLJ17HpxzhB3MEV
    ```

    ```shell !output
    📜 Invocation Information:
    ――――――――――――――――――――――――――
    Created at:   2024-04-23 14:41:59.365 +02:00 (a minute ago)
    Target:       CartObject/Mary/addTicket
    Status:       backing-off  (1 minute, 23 seconds and 937 ms. Retried 14
    time(s). Next retry in in 991 ms))
    Deployment:   dp_11pXug0mWsff2NOoRBZbOcV [required]
    Error:        [2024-04-23 14:43:13.248 +02:00]
    [500] Failing
    Caused by:    UNKNOWN
    Modified at:  2024-04-23 14:41:59.388 +02:00

    💡   This invocation is bound to run on deployment 'dp_11pXug0mWsff2NOoRBZbOcV'. To guarantee
    safety and correctness, invocations that made progress on a deployment
    cannot move to newer deployments automatically.

    🚂 Invocation Progress:
    ―――――――――――――――――――――――
    [Ingress]
    └──(this)─> CartObject/Mary/addTicket
    ▸
    ├──── ☑️  #1 Call TicketObject/seat2B/reserve inv_19maBIcE9uRD1CrHgpGXZ7FcXPsz4bzkbL
    └────>> backing-off
    ```
</Terminal>

You can cancel the invocation, or kill it with `--kill`:

<Terminal>
    ```shell !command
    restate invocations cancel --kill inv_1fmRNvSNVxNp5PTqHI4HLJ17HpxzhB3MEV
    ```

    ```shell !output
    ❯ [2024-04-23 14:41:59.365 +02:00] inv_1fmRNvSNVxNp5PTqHI4HLJ17HpxzhB3MEV
    Target:      CartObject/Mary/addTicket
    Status:      backing-off  (25 minutes, 29 seconds and 200 ms. Retried 141
    time(s). Next retry in in 12 seconds and 94 ms))
    Deployment:  dp_11pXug0mWsff2NOoRBZbOcV [required]
    Error:       [2024-04-23 15:07:27.860 +02:00]
    [500] Failing
    Caused by:   UNKNOWN

    ✔ Are you sure you want to kill this invocation · yes

    ✅ Request was sent successfully
    ```
</Terminal>

[Cancelling](https://docs.restate.dev/operate/invocation#cancelling-invocations) lets you stop the invocation from retrying, to start running any compensations.
[Killing](https://docs.restate.dev/operate/invocation#killing-invocations) ends the invocation without running any compensations.

<Admonition type="note">
Remove the throwing of the exception from your code before you continue.
</Admonition>

<Admonition type="info">
🚩 Explore the intermediate solution in `part1`, and run it with:

<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">

```shell
npm run part1
```

</TabItem>
<TabItem value="java" label="Java">

```shell
./gradlew -PmainClass=dev.restate.tour.part1.AppMain run
```

</TabItem>
<TabItem value="go" label="Go">

```shell
go run ./part1
```

</TabItem>
    <TabItem value="python" label="Python">

        ```shell
        python3 -m hypercorn -b localhost:9080 tour/part1/app:app
        ```

    </TabItem>
     <TabItem value="rust" label="Rust">

        ```shell
        cargo run --bin part1
        ```

    </TabItem>
</Tabs>
</Admonition>

## Scheduling Async Tasks

<Admonition type="note" title="Implement it yourself or follow along by looking at the code under part2"/>

When a handler calls another handler, Restate registers the call and makes sure it happens.
You can also ask Restate to execute the call at a later point in the future, by adding a delay parameter to the call.
Restate then registers the call and triggers it after the delay has passed.

In the application, a ticket gets reserved for 15 minutes.
If the user doesn't pay within that time interval, then it becomes available again to other users.

<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">
Let the `CartObject/addTicket` handler call the `CartObject/expireTicket` handler with a delay of 15 minutes:

```typescript cart_object.ts
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/typescript/tutorials/tour-of-restate-typescript/src/part2/cart_object.ts#add_ticket
```

To test it out, put the delay to a lower value, for example 5 seconds, call the `addTicket` function, and see in the logs how the call to `CartObject/expireTicket` is executed 5 seconds later.

<details className="grey-details">
    <summary>Service logs</summary>
    ```log
    ... logs from reserve call ...
    [restate] [CartObject/addTicket][inv_1gdJBtdVEcM90xbqbDEnOzNgilf2WmjZTP][2024-03-19T08:49:43.081Z] DEBUG: Received completion message from Restate, adding to journal. ; CompletionMessage
    // withClass highlight-line
    [restate] [CartObject/addTicket][inv_1gdJBtdVEcM90xbqbDEnOzNgilf2WmjZTP][2024-03-19T08:49:43.081Z] DEBUG: Adding message to journal and sending to Restate ; BackgroundInvokeEntryMessage
    [restate] [CartObject/addTicket][inv_1gdJBtdVEcM90xbqbDEnOzNgilf2WmjZTP][2024-03-19T08:49:43.081Z] DEBUG: Journaled and sent output message ; OutputStreamEntryMessage
    [restate] [CartObject/addTicket][inv_1gdJBtdVEcM90xbqbDEnOzNgilf2WmjZTP][2024-03-19T08:49:43.081Z] DEBUG: Function completed successfully.
    [restate] [CartObject/expireTicket][inv_1gdJBtdVEcM93r8tce9IfwnbiAsk8lCevD][2024-03-19T08:49:48.092Z] DEBUG: Invoking function.
    [restate] [CartObject/expireTicket][inv_1gdJBtdVEcM93r8tce9IfwnbiAsk8lCevD][2024-03-19T08:49:48.093Z] DEBUG: Adding message to journal and sending to Restate ; BackgroundInvokeEntryMessage
    [restate] [CartObject/expireTicket][inv_1gdJBtdVEcM93r8tce9IfwnbiAsk8lCevD][2024-03-19T08:49:48.093Z] DEBUG: Journaled and sent output message ; OutputStreamEntryMessage
    [restate] [CartObject/expireTicket][inv_1gdJBtdVEcM93r8tce9IfwnbiAsk8lCevD][2024-03-19T08:49:48.093Z] DEBUG: Function completed successfully.
    // withClass highlight-line
    [restate] [TicketObject/unreserve][inv_1k78Krj3GqrK529L4BRmz8ntFtiw2DkahH][2024-03-19T08:49:48.141Z] DEBUG: Invoking function.
    [restate] [TicketObject/unreserve][inv_1k78Krj3GqrK529L4BRmz8ntFtiw2DkahH][2024-03-19T08:49:48.141Z] DEBUG: Journaled and sent output message ; OutputStreamEntryMessage
    [restate] [TicketObject/unreserve][inv_1k78Krj3GqrK529L4BRmz8ntFtiw2DkahH][2024-03-19T08:49:48.141Z] DEBUG: Function completed successfully.
    ```
</details>

</TabItem>
<TabItem value="java" label="Java">
Let the `CartObject/addTicket` handler call the `CartObject/expireTicket` handler with a delay of 15 minutes:

```java CartObject.java
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/java/tutorials/tour-of-restate-java/src/main/java/dev/restate/tour/part2/CartObject.java#add_ticket
```

To test it out, put the delay to a lower value, for example 5 seconds, call the `addTicket` function, and see in the logs how the call to `CartObject/expireTicket` is executed 5 seconds later.

<details className="grey-details">
    <summary>Service logs</summary>
    ```log
    ... logs from reserve call ...
    2024-04-17 08:08:10 DEBUG [CartObject/addTicket][inv_1aiqX0vFEFNH3fRqvARAGmeIcbyLXImG3L] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to CLOSED
    // withClass highlight-line
    2024-04-17 08:08:10 INFO  [CartObject/addTicket][inv_1aiqX0vFEFNH3fRqvARAGmeIcbyLXImG3L] dev.restate.sdk.core.InvocationStateMachine - End invocation
    // withClass highlight-line
    2024-04-17 08:08:15 DEBUG [CartObject/expireTicket] dev.restate.sdk.http.vertx.RequestHttpServerHandler - Handling request to CartObject/expireTicket
    2024-04-17 08:08:15 INFO  [CartObject/expireTicket] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Start processing invocation
    2024-04-17 08:08:15 DEBUG [CartObject/expireTicket][inv_1aiqX0vFEFNH5R28lg9wg1c3CtOJOhHEM9] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to REPLAYING
    2024-04-17 08:08:15 DEBUG [CartObject/expireTicket][inv_1aiqX0vFEFNH5R28lg9wg1c3CtOJOhHEM9] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [1](): BackgroundInvokeEntryMessage
    2024-04-17 08:08:15 DEBUG [CartObject/expireTicket][inv_1aiqX0vFEFNH5R28lg9wg1c3CtOJOhHEM9] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [2](): OutputEntryMessage
    2024-04-17 08:08:15 INFO  [CartObject/expireTicket][inv_1aiqX0vFEFNH5R28lg9wg1c3CtOJOhHEM9] dev.restate.sdk.core.InvocationStateMachine - End invocation
    2024-04-17 08:08:15 DEBUG [CartObject/expireTicket][inv_1aiqX0vFEFNH5R28lg9wg1c3CtOJOhHEM9] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to CLOSED
    2024-04-17 08:08:15 INFO  [CartObject/expireTicket][inv_1aiqX0vFEFNH5R28lg9wg1c3CtOJOhHEM9] dev.restate.sdk.core.InvocationStateMachine - End invocation
    2024-04-17 08:08:15 DEBUG [TicketObject/unreserve] dev.restate.sdk.http.vertx.RequestHttpServerHandler - Handling request to TicketObject/unreserve
    2024-04-17 08:08:15 INFO  [TicketObject/unreserve] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Start processing invocation
    2024-04-17 08:08:15 DEBUG [TicketObject/unreserve][inv_1aAMfXkieWDz0btTCuaF2NHgJEdX2tXHCF] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to REPLAYING
    2024-04-17 08:08:15 DEBUG [TicketObject/unreserve][inv_1aAMfXkieWDz0btTCuaF2NHgJEdX2tXHCF] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [1](): OutputEntryMessage
    2024-04-17 08:08:15 INFO  [TicketObject/unreserve][inv_1aAMfXkieWDz0btTCuaF2NHgJEdX2tXHCF] dev.restate.sdk.core.InvocationStateMachine - End invocation
    2024-04-17 08:08:15 DEBUG [TicketObject/unreserve][inv_1aAMfXkieWDz0btTCuaF2NHgJEdX2tXHCF] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to CLOSED
    2024-04-17 08:08:15 INFO  [TicketObject/unreserve][inv_1aAMfXkieWDz0btTCuaF2NHgJEdX2tXHCF] dev.restate.sdk.core.InvocationStateMachine - End invocation
    ```
</details>

</TabItem>
<TabItem value="go" label="Go">
    Let the `CartObject/AddTicket` handler call the `CartObject/ExpireTicket` handler with a delay of 15 minutes:

    ```go cartobject.go
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/go/tutorials/tour-of-restate-go/part2/cartobject.go#add_ticket
    ```

    To test it out, put the delay to a lower value, for example 5 seconds, call the `AddTicket` function, and see in the logs how the call to `CartObject/ExpireTicket` is executed 5 seconds later.

    <details className="grey-details">
        <summary>Service logs</summary>
        ```log
        2024/08/16 15:33:41 INFO Handling invocation method=CartObject/AddTicket invocationID=inv_1fmRNvSNVxNp6JdmgIQ7cfkYv1aUgCa3ER
        2024/08/16 15:33:41 INFO Handling invocation method=TicketObject/Reserve invocationID=inv_19maBIcE9uRD3LcEEnLudAidH5TXVNerfP
        2024/08/16 15:33:41 INFO Invocation completed successfully method=TicketObject/Reserve invocationID=inv_19maBIcE9uRD3LcEEnLudAidH5TXVNerfP
        2024/08/16 15:33:41 INFO Invocation completed successfully method=CartObject/AddTicket invocationID=inv_1fmRNvSNVxNp6JdmgIQ7cfkYv1aUgCa3ER
        // withClass highlight-line
        2024/08/16 15:33:46 INFO Handling invocation method=CartObject/ExpireTicket invocationID=inv_1fmRNvSNVxNp2Je39FKxZGCuaWYqw2OvyV
        2024/08/16 15:33:46 INFO Invocation completed successfully method=CartObject/ExpireTicket invocationID=inv_1fmRNvSNVxNp2Je39FKxZGCuaWYqw2OvyV
        // withClass highlight-line
        2024/08/16 15:33:46 INFO Handling invocation method=TicketObject/Unreserve invocationID=inv_19maBIcE9uRD72CK05c2mkJvQZr352Qhvr
        2024/08/16 15:33:46 INFO Invocation completed successfully method=TicketObject/Unreserve invocationID=inv_19maBIcE9uRD72CK05c2mkJvQZr352Qhvr
        ```
    </details>

</TabItem>
<TabItem value="python" label="Python">
Let the `CartObject/addTicket` handler call the `CartObject/expireTicket` handler with a delay of 15 minutes:

```python cart_object.py
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/python/tutorials/tour-of-restate-python/tour/part2/cart_object.py#add_ticket
```

To test it out, put the delay to a lower value, for example 5 seconds, call the `addTicket` function, and see in the Restate Server logs how the call to `CartObject/expireTicket` is executed 5 seconds later.

</TabItem>

    <TabItem value="rust" label="Rust">
        Let the `CartObject/addTicket` handler call the `CartObject/expireTicket` handler with a delay of 15 minutes:

        ```rust cart_object.rs
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/rust/tutorials/tour-of-restate-rust/src/part2/cart_object.rs#add_ticket
        ```

        To test it out, put the delay to a lower value, for example 5 seconds, call the `addTicket` function, and see in the logs how the call to `CartObject/expireTicket` is executed 5 seconds later.

        <details className="grey-details">
            <summary>Restate Server logs</summary>

            ```log
            2024-12-04T16:05:26.046821Z INFO restate_ingress_http::handler::service_handler
                Processing ingress request
                on rs:ingress-19
                in restate_ingress_http::handler::service_handler::ingress
                restate.invocation.id: inv_1fmRNvSNVxNp1rdNvJChChda9nyIp1IODT
                restate.invocation.target: CartObject/{key}/addTicket
            2024-12-04T16:05:26.050495Z INFO restate_invoker_impl::invocation_task::service_protocol_runner
                Executing invocation at deployment
                invocation.id: inv_1fmRNvSNVxNp1rdNvJChChda9nyIp1IODT
                deployment.address: http://localhost:9080/
                deployment.service_protocol_version: 2
                path: /invoke/CartObject/addTicket
                on rt:pp-6
            2024-12-04T16:05:26.094783Z INFO restate_invoker_impl::invocation_task::service_protocol_runner
                Executing invocation at deployment
                invocation.id: inv_19maBIcE9uRD490XkuIzbkI2RSPlU2Ts9X
                deployment.address: http://localhost:9080/
                deployment.service_protocol_version: 2
                path: /invoke/TicketObject/reserve
                on rt:pp-16
            2024-12-04T16:05:31.148166Z INFO restate_invoker_impl::invocation_task::service_protocol_runner
                Executing invocation at deployment
                invocation.id: inv_1fmRNvSNVxNp1rOBOQvbrKvGkxTtO2iUW5
                deployment.address: http://localhost:9080/
                deployment.service_protocol_version: 2
                path: /invoke/CartObject/expireTicket
                on rt:pp-6
            2024-12-04T16:05:31.152414Z INFO restate_invoker_impl::invocation_task::service_protocol_runner
                Executing invocation at deployment
                invocation.id: inv_19maBIcE9uRD0WfZdbDpQeCljoQyujUWg9
                deployment.address: http://localhost:9080/
                deployment.service_protocol_version: 2
                path: /invoke/TicketObject/unreserve
                on rt:pp-16
            ```

        </details>

    </TabItem>
</Tabs>

Don't forget to set the delay back to 15 minutes.

<Admonition type="tip" title={"No workflow orchestrator or cron jobs needed!"}>
Durable timers are a powerful feature that can be used to implement workflows, schedule async tasks, or plan background jobs.
Restate makes them resilient to failures and ensures that they get executed. No extra infrastructure needed!
</Admonition>

<Admonition type="info" title="Suspendable sleep">
Another timer-like feature of the SDK is suspendable sleep.
Restate will make sure that the function gets resumed after the specified duration has passed.
When running on function-as-a-service platforms, your function can suspend in the meantime, so you don't pay for the wait time.
<Tabs groupId="sdk" queryString className={"display-none"}>
    <TabItem value="ts" label="TypeScript">

        ```ts
        CODE_LOAD::ts/src/get_started/tour.ts#sleep
        ```

    </TabItem>
    <TabItem value="java" label="Java">

        ```java
        CODE_LOAD::java/src/main/java/get_started/Tour.java#sleep
        ```

    </TabItem>
    <TabItem value="go" label="Go">

        ```ts
        CODE_LOAD::go/getstarted/tour.go#sleep
        ```

    </TabItem>
    <TabItem value="python" label="Python">

        ```python
        CODE_LOAD::python/src/get_started/tour.py#sleep
        ```

    </TabItem>
    <TabItem value="rust" label="Rust">

        ```rust
        CODE_LOAD::rust/src/get_started/tour.rs#sleep
        ```

    </TabItem>
</Tabs>

</Admonition>


<Admonition type="info">
🚩 Explore the intermediate solution in `part2`, and run it with:

<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">

```shell
npm run part2
```

</TabItem>
<TabItem value="java" label="Java">

```shell
./gradlew -PmainClass=dev.restate.tour.part2.AppMain run
```

</TabItem>
<TabItem value="go" label="Go">

```shell
go run ./part2
```

</TabItem>
<TabItem value="python" label="Python">

```shell
python3 -m hypercorn -b localhost:9080 tour/part2/app:app
```

</TabItem>
    <TabItem value="rust" label="Rust">

        ```shell
        cargo run --bin part2
        ```

    </TabItem>
</Tabs>
</Admonition>


## Virtual Objects vs. Services
<Admonition type="note" title="Implement it yourself or follow along by looking at the code under part3"/>

At the beginning of this tutorial, we mentioned that the `TicketObject` and `CartObject` services are Virtual Objects.

**Virtual Objects** are identified by a key and allow you to store K/V state in Restate.
For each Virtual Object (key), only one invocation can run at a time (across all the handlers of that Virtual Object).

**Services**, on the other hand, do not have access to K/V state, and handlers can run concurrently.

<Admonition type={"tip"} title={"Virtual Objects simplify many use cases"}>
With access to consistent K/V state and strong concurrency guarantees, implementing the `TicketObject` in a resilient and consistent way becomes straightforward.
When a user reserves a ticket, we want to be sure that no other concurrent requests are reserving the same ticket at the same time.
To get this behaviour, we key the `TicketObject` on ticket ID. We now have a single Virtual Object per ticket.
</Admonition>

<Admonition type="caution" title={"Long-running operations in Virtual Objects"}>
    If you do long-running operations in a Virtual Object, no other invocations are processed the meantime.
    For example, if you would implement the expiration of the ticket in the `CartObject` service by sleeping for 15 minutes:

    <Tabs groupId="sdk" queryString className={"display-none"}>
        <TabItem value="ts" label="TypeScript">

            ```typescript
            CODE_LOAD::ts/src/get_started/tour.ts#sleep_and_send
            ```

        </TabItem>
        <TabItem value="java" label="Java">

            ```java
            CODE_LOAD::java/src/main/java/get_started/Tour.java#sleep_and_send
            ```

        </TabItem>
        <TabItem value="go" label="Go">

            ```go
            CODE_LOAD::go/getstarted/tour.go#sleep_and_send
            ```

        </TabItem>
        <TabItem value="python" label="Python">

            ```python
            CODE_LOAD::python/src/get_started/tour.py#sleep_and_send
            ```

        </TabItem>
        <TabItem value="rust" label="Rust">

            ```rust
            CODE_LOAD::rust/src/get_started/tour.rs#sleep_and_send
            ```

        </TabItem>
    </Tabs>
    The user wouldn't be able to add any other tickets, nor buy the tickets.
    If you do a delayed call, the invocation isn't ongoing until the delay has passed, so the Virtual Object is not locked.
</Admonition>

## Consistent K/V state

Restate offers a key-value store to store application state for Virtual Objects.

<Admonition type="tip" title="No need for session databases!">
Restate's state is guaranteed to be consistent across retries and invocations.
This eliminates the need for a session database.
</Admonition>

### Getting and setting K/V state

<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">

Adapt the `CartObject/addTicket` function to keep track of the cart items.
After reserving the product, you add the ticket to the shopping cart.
Have a look at the highlighted code:

```ts cart_object.ts
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/typescript/tutorials/tour-of-restate-typescript/src/part3/cart_object.ts#add_ticket
```

To retrieve the cart, you use `ctx.get`.
This returns `null` if the value has never been set.

After you added the ticket to the cart array, you set the state to the new value with `ctx.set`.

</TabItem>
<TabItem value="java" label="Java">

Adapt the `CartObject/addTicket` function to keep track of the cart items.
After reserving the product, you add the ticket to the shopping cart.
Have a look at the highlighted code:

```java CartObject.java
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/java/tutorials/tour-of-restate-java/src/main/java/dev/restate/tour/part3/CartObject.java#add_ticket
```

To retrieve the cart, you use `ctx.get` with a state key that describes the name and the [(de)serializers](/develop/java/serialization) to be used.
    `ctx.get` returns an Optional, only containing a value if one was set before.

After you added the ticket to the cart array, you set the state to the new value with `ctx.set`.

</TabItem>
<TabItem value="go" label="Go">

    Adapt the `CartObject/AddTicket` function to keep track of the cart items.
    After reserving the product, you add the ticket to the shopping cart.
    Have a look at the highlighted code:

    ```go cartobject.go
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/go/tutorials/tour-of-restate-go/part3/cartobject.go#add_ticket
    ```

    To retrieve the cart, you use `restate.Get`.
    This returns the zero value if there's no value for this key; a nil slice is a useful result in this case.

    After you added the ticket to the cart array, you set the state to the new value with `restate.Set`.

</TabItem>
<TabItem value="python" label="Python">

Adapt the `CartObject/addTicket` function to keep track of the cart items.
After reserving the product, you add the ticket to the shopping cart.
Have a look at the highlighted code:

```python cart_object.py
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/python/tutorials/tour-of-restate-python/tour/part3/cart_object.py#add_ticket
```

To retrieve the cart, you use `ctx.get`.
This returns `null` if the value has never been set.

After you added the ticket to the cart array, you set the state to the new value with `ctx.set`.

</TabItem>
    <TabItem value="rust" label="Rust">

        Adapt the `CartObject/addTicket` function to keep track of the cart items.
        After reserving the product, you add the ticket to the shopping cart.
        Have a look at the highlighted code:

        ```rust cart_object.rs
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/rust/tutorials/tour-of-restate-rust/src/part3/cart_object.rs#add_ticket
        ```

        To retrieve the cart, you use `ctx.get`.
        This returns an `Option`, containing the value if it has ever been set.

        After you added the ticket to the cart array, you set the state to the new value with `ctx.set`.

    </TabItem>
</Tabs>

You can store multiple key-value pairs, by using different state keys.
Here, you get the value under the key `"tickets"`.
Restate returns the cart belonging to the current Virtual Object (for example, user `Mary`).

<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">
Run the services and call the `addTicket` function, to see the interaction with state.

<details className="grey-details">
<summary>Service logs</summary>

```log
... logs from reserve call ...
// withClass highlight-line
[restate] [CartObject/addTicket][inv_1gdJBtdVEcM97yGYEG5NWYtbMlnSAGHGY9][2024-03-19T08:55:20.941Z] DEBUG: Adding message to journal and sending to Restate ; GetStateEntryMessage
// withClass highlight-line
[restate] [CartObject/addTicket][inv_1gdJBtdVEcM97yGYEG5NWYtbMlnSAGHGY9][2024-03-19T08:55:20.941Z] DEBUG: Adding message to journal and sending to Restate ; SetStateEntryMessage
... logs from expireTicket call ...
```

</details>
</TabItem>
<TabItem value="java" label="Java">
Run the services and call the `addTicket` function, to see the interaction with state.

<details className="grey-details">
<summary>Service logs</summary>

```log

... reserve call ...
2024-04-17 08:13:23 DEBUG [CartObject/addTicket] dev.restate.sdk.http.vertx.RequestHttpServerHandler - Handling request to CartObject/addTicket
2024-04-17 08:13:23 INFO  [CartObject/addTicket] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Start processing invocation
2024-04-17 08:13:23 DEBUG [CartObject/addTicket][inv_1aiqX0vFEFNH7nJWPQ0NFyGKHOyNmoE3hn] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to REPLAYING
2024-04-17 08:13:23 DEBUG [CartObject/addTicket][inv_1aiqX0vFEFNH7nJWPQ0NFyGKHOyNmoE3hn] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [1](): InvokeEntryMessage
// withClass highlight-line
2024-04-17 08:13:23 DEBUG [CartObject/addTicket][inv_1aiqX0vFEFNH7nJWPQ0NFyGKHOyNmoE3hn] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [2](): GetStateEntryMessage
// withClass highlight-line
2024-04-17 08:13:23 DEBUG [CartObject/addTicket][inv_1aiqX0vFEFNH7nJWPQ0NFyGKHOyNmoE3hn] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [3](): SetStateEntryMessage
2024-04-17 08:13:23 DEBUG [CartObject/addTicket][inv_1aiqX0vFEFNH7nJWPQ0NFyGKHOyNmoE3hn] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [4](): BackgroundInvokeEntryMessage
2024-04-17 08:13:23 DEBUG [CartObject/addTicket][inv_1aiqX0vFEFNH7nJWPQ0NFyGKHOyNmoE3hn] dev.restate.sdk.core.InvocationStateMachine - Current journal entry [5](): OutputEntryMessage
2024-04-17 08:13:23 INFO  [CartObject/addTicket][inv_1aiqX0vFEFNH7nJWPQ0NFyGKHOyNmoE3hn] dev.restate.sdk.core.InvocationStateMachine - End invocation
2024-04-17 08:13:23 DEBUG [CartObject/addTicket][inv_1aiqX0vFEFNH7nJWPQ0NFyGKHOyNmoE3hn] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to CLOSED
2024-04-17 08:13:23 INFO  [CartObject/addTicket][inv_1aiqX0vFEFNH7nJWPQ0NFyGKHOyNmoE3hn] dev.restate.sdk.core.InvocationStateMachine - End invocation
```

</details>
</TabItem>
<TabItem value="go" label="Go">
Run the services with TRACE loglevel (`slog.SetLogLoggerLevel(-8)` in Go >= 1.22) and call the `AddTicket` function, to see the interaction with state.

<details className="grey-details">
<summary>Service logs</summary>

```log
... logs from reserve call ...
// withClass highlight-line
2024/08/16 16:25:37 DEBUG-4 Sending message to runtime method=CartObject/AddTicket invocationID=inv_1fmRNvSNVxNp62ejaow32hBZDNwwSzc63v type=GetStateEntryMessage
2024/08/16 16:25:37 DEBUG Processed completion method=CartObject/AddTicket invocationID=inv_1fmRNvSNVxNp62ejaow32hBZDNwwSzc63v index=1
// withClass highlight-line
2024/08/16 16:25:37 DEBUG-4 Sending message to runtime method=CartObject/AddTicket invocationID=inv_1fmRNvSNVxNp62ejaow32hBZDNwwSzc63v type=SetStateEntryMessage
2024/08/16 16:25:37 DEBUG-4 Sending message to runtime method=CartObject/AddTicket invocationID=inv_1fmRNvSNVxNp62ejaow32hBZDNwwSzc63v type=OneWayCallEntryMessage
2024/08/16 16:25:37 INFO Invocation completed successfully method=CartObject/AddTicket invocationID=inv_1fmRNvSNVxNp62ejaow32hBZDNwwSzc63v
```
</details>
</TabItem>
<TabItem value="python" label="Python"></TabItem>
<TabItem value="rust" label="Rust"></TabItem>
</Tabs>

<Admonition type="tip" title="Local state access">
When starting the invocation, Restate attaches the application state to the request.
So when you operate on the state in your function, you get access to a local copy of the state for fast access.
</Admonition>

<Tabs groupId="sdk" queryString className={"display-none"}>
    <TabItem value="ts" label="TypeScript">
        Also adapt the `CartObject/checkout` function, to use the tickets:

        ```typescript cart_object.ts
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/typescript/tutorials/tour-of-restate-typescript/src/part3/cart_object.ts#checkout
        ```

        After the tickets are checked out, you clear the state with `ctx.clear`.

    </TabItem>
    <TabItem value="java" label="Java">
        Also adapt the `CartObject/checkout` function, to use the tickets:

        ```java CartObject.java
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/java/tutorials/tour-of-restate-java/src/main/java/dev/restate/tour/part3/CartObject.java#checkout
        ```

        After the tickets are checked out, you clear the state with `ctx.clear`.

    </TabItem>
    <TabItem value="go" label="Go">
        Also adapt the `CartObject/Checkout` function, to use the tickets:

        ```go cartobject.go
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/go/tutorials/tour-of-restate-go/part3/cartobject.go#checkout
        ```

        After the tickets are checked out, you clear the state with `restate.Clear`.

    </TabItem>
    <TabItem value="python" label="Python">
        Also adapt the `CartObject/checkout` function, to use the tickets:

        ```python cart_object.py
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/python/tutorials/tour-of-restate-python/tour/part3/cart_object.py#checkout
        ```

        After the tickets are checked out, you clear the state with `ctx.clear`.

    </TabItem>
    <TabItem value="rust" label="Rust">
        Also adapt the `CartObject/checkout` function, to use the tickets:

        ```rust cart_object.rs
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/rust/tutorials/tour-of-restate-rust/src/part3/cart_object.rs#checkout
        ```

        After the tickets are checked out, you clear the state with `ctx.clear`.

    </TabItem>
</Tabs>

### Inspecting K/V state

Restate exposes information on invocations and application state.
You can watch the state of the `CartObject` service, via:

<TerminalWithTabs>

    # !!terminals

    ```shell !command CLI
    restate kv get -w -n 1 CartObject Mary
    ```

    ```json !output
    🤖 State:
    ―――――――――

    Service  CartObject
    Key      Mary

    KEY      VALUE
    tickets  [
    "seat2B"
    ]
    ```

    # !!terminals

    ```shell !command psql
    watch -n 1 'psql -h localhost -p 9071 -c "SELECT * FROM state WHERE service_name like '\''%CartObject%'\''";'
    ```

    ```json !output
    🤖 State:
    ―――――――――

    Service  CartObject
    Key      Mary

    KEY      VALUE
    tickets  [
    "seat2B"
    ]
    ```
</TerminalWithTabs>


Add some tickets to the state to see how the query result gets updated.

Then, send a checkout request as [earlier](#request-response-calls-over-http), and notice that the state is now empty.


### 📝 Try it out

<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">
#### Finishing `CartObject/expireTicket`

You have almost fully implemented the `CartObject`. Let's finish `CartObject/expireTicket`.

Before you call `unreserve`, you first need to check if the ticket is still held by the user.
Retrieve the state and check if the ticket ID is in there.
If this is the case, then you call `TicketObject/unreserve` and remove it from the state.

<details>
<summary>Solution</summary>
```ts cart_object.ts
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/typescript/tutorials/tour-of-restate-typescript/src/part3/cart_object.ts#expire_ticket
```

Call the `expireTicket` handler with:
```shell
curl localhost:8080/CartObject/Mary/expireTicket --json '"seat2B"'
```
</details>
</TabItem>
<TabItem value="java" label="Java">
#### Finishing `CartObject/expireTicket`

You have almost fully implemented the `CartObject`. Let's finish `CartObject/expireTicket`.

Before you call `unreserve`, you first need to check if the ticket is still held by the user.
Retrieve the state and check if the ticket ID is in there.
If this is the case, then you call `TicketObject/unreserve` and remove it from the state.

<details>
<summary>Solution</summary>
```java CartObject.java
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/java/tutorials/tour-of-restate-java/src/main/java/dev/restate/tour/part3/CartObject.java#expire_ticket
```

Call the `expireTicket` handler with:
```shell
curl localhost:8080/CartObject/Mary/expireTicket --json '"seat2B"'
```
</details>
</TabItem>
<TabItem value="go" label="Go">
#### Finishing `CartObject/ExpireTicket`

You have almost fully implemented the `CartObject`. Let's finish `CartObject/ExpireTicket`.

Before you call `Unreserve`, you first need to check if the ticket is still held by the user.
Retrieve the state and check if the ticket ID is in there.
If this is the case, then you call `TicketObject/Unreserve` and remove it from the state.

<details>
<summary>Solution</summary>
```go cartobject.go
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/go/tutorials/tour-of-restate-go/part3/cartobject.go#expire_ticket
```

Call the `ExpireTicket` handler with:
```shell
curl localhost:8080/CartObject/Mary/ExpireTicket --json '"seat2B"'
```
</details>
</TabItem>
<TabItem value="python" label="Python">
#### Finishing `CartObject/expireTicket`

You have almost fully implemented the `CartObject`. Let's finish `CartObject/expireTicket`.

Before you call `unreserve`, you first need to check if the ticket is still held by the user.
Retrieve the state and check if the ticket ID is in there.
If this is the case, then you call `TicketObject/unreserve` and remove it from the state.

<details>
<summary>Solution</summary>
```python cart_object.py
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/python/tutorials/tour-of-restate-python/tour/part3/cart_object.py#expire_ticket
```

Call the `expireTicket` handler with:
```shell
curl localhost:8080/CartObject/Mary/expireTicket --json '"seat2B"'
```
</details>
</TabItem>
        <TabItem value="rust" label="Rust">
        #### Finishing `CartObject/expireTicket`

        You have almost fully implemented the `CartObject`. Let's finish `CartObject/expireTicket`.

        Before you call `unreserve`, you first need to check if the ticket is still held by the user.
        Retrieve the state and check if the ticket ID is in there.
        If this is the case, then you call `TicketObject/unreserve` and remove it from the state.

        <details>
            <summary>Solution</summary>
            ```rust cart_object.rs
            CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/rust/tutorials/tour-of-restate-rust/src/part3/cart_object.rs#expire_ticket
            ```

            Call the `expireTicket` handler with:
            ```shell
            curl localhost:8080/CartObject/Mary/expireTicket --json '"seat2B"'
            ```
        </details>
    </TabItem>
</Tabs>

#### Implementing the `TicketObject`

Track the status of the tickets in the `TicketObject` by storing it in the state and transitioning from one state to another, like a state machine.
The possible states are available (default), reserved, and sold.
Implement the handlers in the `TicketObject` to reserve, unreserve, and mark a ticket as sold.

While you are developing them, monitor the state of the `TicketObject` via:

<CodeWithTabs>

    ```shell !!tabs CLI
    restate kv get -w -n 1 TicketObject seat2B
    ```

    ```shell !!tabs psql
    watch -n 1 'psql -h localhost -p 9071 -c "select * from state where service_name like '\''%TicketObject%'\''";'
    ```
</CodeWithTabs>

<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">
<SubtleStep title="TicketObject/reserve" stepLabel="1">
1. Retrieve the value for the `"status"` state key.
2. If the value is set to `TicketStatus.Available`, then change it to `TicketStatus.Reserved` and
return `true` (reservation successful).
3. If the status isn't set to `TicketStatus.Available`, then return `false`.

<details>
<summary>Solution</summary>
```typescript ticket_object.ts
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/typescript/tutorials/tour-of-restate-typescript/src/part3/ticket_object.ts#reserve
```

Now, you can't reserve the same ticket multiple times anymore.
Call `addTicket` multiple times for the same ID. The first time it returns `true`, afterwards `false`.
</details>
</SubtleStep>
<SubtleStep stepLabel="2" title="TicketObject/unreserve">
Clear the `"status"`, if it's not equal to `TicketStatus.Sold`.
<details>
<summary>Solution</summary>
```ts ticket_object.ts
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/typescript/tutorials/tour-of-restate-typescript/src/part3/ticket_object.ts#unreserve
```

Now, the ticket reservation status is cleared when the delayed `expireTicket` call triggers.
Play around with reducing the delay of the `expireTicket` call in the `addTicket` handler.
Try to reserve the same ticket ID multiple times, and see how you are able to reserve it again after the `unreserve` handler executed.

</details>
</SubtleStep>
<SubtleStep stepLabel="3" title="TicketObject/markAsSold">
Set the `"status"` to `TicketStatus.Sold` if it's reserved.

<details>
<summary>Solution</summary>
```ts ticket_object.ts
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/typescript/tutorials/tour-of-restate-typescript/src/part3/ticket_object.ts#mark_as_sold
```
In the next section, you implement the `CheckoutService/handle` function that calls `markAsSold`.
This ties the final parts together.
</details>
</SubtleStep>
</TabItem>
<TabItem value="java" label="Java">
<SubtleStep title="TicketObject/reserve" stepLabel="1">
1. Retrieve the value for the `"status"` state key.
2. If the value is set to `TicketStatus.Available`, then change it to `TicketStatus.Reserved` and
return `true` (reservation successful).
3. If the status isn't set to `TicketStatus.Available`, then return `false`.

<details>
<summary>Solution</summary>
```java TicketObject.java
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/java/tutorials/tour-of-restate-java/src/main/java/dev/restate/tour/part3/TicketObject.java#reserve
```

Now, you can't reserve the same ticket multiple times anymore.
Call `addTicket` multiple times for the same ID. The first time it returns `true`, afterwards `false`.
</details>
</SubtleStep>
<SubtleStep stepLabel="2" title="TicketObject/unreserve">
Clear the `"status"`, if it's not equal to `TicketStatus.Sold`.
<details>
<summary>Solution</summary>
```java TicketObject.java
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/java/tutorials/tour-of-restate-java/src/main/java/dev/restate/tour/part3/TicketObject.java#unreserve
```

Now, the ticket reservation status is cleared when the delayed `expireTicket` call triggers.
Play around with reducing the delay of the `expireTicket` call in the `addTicket` handler.
Try to reserve the same ticket ID multiple times, and see how you are able to reserve it again after the `unreserve` handler executed.

</details>
</SubtleStep>
<SubtleStep stepLabel="3" title="TicketObject/markAsSold">
Set the `"status"` to `TicketStatus.Sold` if it's reserved.

<details>
<summary>Solution</summary>
```java TicketObject.java
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/java/tutorials/tour-of-restate-java/src/main/java/dev/restate/tour/part3/TicketObject.java#mark_as_sold
```
In the next section, you implement the `CheckoutService/handle` function that calls `markAsSold`.
This ties the final parts together.
</details>
</SubtleStep>
</TabItem>
<TabItem value="go" label="Go">
<SubtleStep title="TicketObject/Reserve" stepLabel="1">
1. Retrieve the value for the `"status"` state key.
2. If the value is set to `auxiliary.TicketStatusAvailable`, then change it to `TicketStatusReserved` and
return `true` (reservation successful).
3. If the status isn't set to `TicketStatusAvailable`, then return `false`.

<details>
<summary>Solution</summary>
```go ticketobject.go
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/go/tutorials/tour-of-restate-go/part3/ticketobject.go#reserve
```

Now, you can't reserve the same ticket multiple times anymore.
Call `AddTicket` multiple times for the same ID. The first time it returns `true`, afterwards `false`.
</details>
</SubtleStep>
<SubtleStep stepLabel="2" title="TicketObject/Unreserve">
Clear the `"status"`, if it's not equal to `auxiliary.TicketStatusSold`.
<details>
<summary>Solution</summary>
```go ticketobject.go
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/go/tutorials/tour-of-restate-go/part3/ticketobject.go#unreserve
```

Now, the ticket reservation status is cleared when the delayed `ExpireTicket` call triggers.
Play around with reducing the delay of the `ExpireTicket` call in the `AddTicket` handler.
Try to reserve the same ticket ID multiple times, and see how you are able to reserve it again after the `Unreserve` handler executed.

</details>
</SubtleStep>
<SubtleStep stepLabel="3" title="TicketObject/MarkAsSold">
Set the `"status"` to `auxiliary.TicketStatusSold` if it's reserved.

<details>
<summary>Solution</summary>
```go ticketobject.go
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/go/tutorials/tour-of-restate-go/part3/ticketobject.go#mark_as_sold
```
In the next section, you implement the `CheckoutService/Handle` function that calls `MarkAsSold`.
This ties the final parts together.
</details>
</SubtleStep>
</TabItem>
<TabItem value="python" label="Python">
        <SubtleStep title="TicketObject/reserve" stepLabel="1">
            1. Retrieve the value for the `"status"` state key.
            2. If the value is set to `"AVAILABLE"`, then change it to `"RESERVED"` and
            return `true` (reservation successful).
            3. If the status isn't set to `"AVAILABLE"`, then return `false`.

            <details>
                <summary>Solution</summary>
                ```python ticket_object.py
                CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/python/tutorials/tour-of-restate-python/tour/part3/ticket_object.py#reserve
                ```

                Now, you can't reserve the same ticket multiple times anymore.
                Call `addTicket` multiple times for the same ID. The first time it returns `true`, afterwards `false`.
            </details>
        </SubtleStep>
        <SubtleStep stepLabel="2" title="TicketObject/unreserve">
            Clear the `"status"`, if it's not equal to `"SOLD"`.
            <details>
                <summary>Solution</summary>
                ```python ticket_object.py
                CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/python/tutorials/tour-of-restate-python/tour/part3/ticket_object.py#unreserve
                ```

                Now, the ticket reservation status is cleared when the delayed `expireTicket` call triggers.
                Play around with reducing the delay of the `expireTicket` call in the `addTicket` handler.
                Try to reserve the same ticket ID multiple times, and see how you are able to reserve it again after the `unreserve` handler executed.

            </details>
        </SubtleStep>
        <SubtleStep stepLabel="3" title="TicketObject/markAsSold">
            Set the `"status"` to `"SOLD"` if it's reserved.

            <details>
                <summary>Solution</summary>
                ```python ticket_object.py
                CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/python/tutorials/tour-of-restate-python/tour/part3/ticket_object.py#mark_as_sold
                ```
                In the next section, you implement the `CheckoutService/handle` function that calls `markAsSold`.
                This ties the final parts together.
            </details>
        </SubtleStep>
</TabItem>
    <TabItem value="rust" label="Rust">
        <SubtleStep title="TicketObject/reserve" stepLabel="1">
            1. Retrieve the value for the `"status"` state key.
            2. If the value is set to `TicketStatus::Available`, then change it to `TicketStatus::Reserved` and
            return `true` (reservation successful).
            3. If the status isn't set to `TicketStatus::Available`, then return `false`.

            <details>
                <summary>Solution</summary>
                ```rust ticket_object.rs
                CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/rust/tutorials/tour-of-restate-rust/src/part3/ticket_object.rs#reserve
                ```

                Now, you can't reserve the same ticket multiple times anymore.
                Call `addTicket` multiple times for the same ID. The first time it returns `true`, afterwards `false`.
            </details>
        </SubtleStep>
        <SubtleStep stepLabel="2" title="TicketObject/unreserve">
            Clear the `"status"`, if it's not equal to `TicketStatus::Sold`.
            <details>
                <summary>Solution</summary>
                ```rs ticket_object.rs
                CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/rust/tutorials/tour-of-restate-rust/src/part3/ticket_object.rs#unreserve
                ```

                Now, the ticket reservation status is cleared when the delayed `expireTicket` call triggers.
                Play around with reducing the delay of the `expireTicket` call in the `addTicket` handler.
                Try to reserve the same ticket ID multiple times, and see how you are able to reserve it again after the `unreserve` handler executed.

            </details>
        </SubtleStep>
        <SubtleStep stepLabel="3" title="TicketObject/markAsSold">
            Set the `"status"` to `TicketStatus::Sold` if it's reserved.

            <details>
                <summary>Solution</summary>
                ```rs ticket_object.rs
                CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/rust/tutorials/tour-of-restate-rust/src/part3/ticket_object.rs#mark_as_sold
                ```

                In the next section, you implement the `CheckoutService/handle` function that calls `markAsSold`.
                This ties the final parts together.
            </details>
        </SubtleStep>
    </TabItem>
</Tabs>

<Admonition type="info">
🚩 Explore the intermediate solution in `part3`, and run it with:

<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">

```shell
npm run part3
```

</TabItem>
<TabItem value="java" label="Java">

```shell
./gradlew -PmainClass=dev.restate.tour.part3.AppMain run
```

</TabItem>
<TabItem value="go" label="Go">

```shell
go run ./part3
```

</TabItem>
<TabItem value="python" label="Python">

    ```shell
    python3 -m hypercorn -b localhost:9080 tour/part3/app:app
    ```

</TabItem>
<TabItem value="rust" label="Rust">

```shell
cargo run --bin part3
```

</TabItem>
</Tabs>
</Admonition>


## Journaling actions

<Admonition type="note" title="Implement it yourself or follow along by looking at the code under part4"/>

Restate's Durable Execution mechanism tracks the progress of the code execution in a journal.
Once an action/result has made it to the journal, it will not be re-executed on retries.

<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">
You can store the return value of any function in the journal, by using `ctx.run`.
This lets you capture potentially non-deterministic computation and interaction with external systems in a safe way.
The SDK also offers helper functions for creating UUIDs and generating random numbers.

<Admonition type="info" title="Handler logic needs to be deterministic">
For the replay to work, code needs to be deterministic, otherwise the replayed entries do not line up with the code execution on retries.
So use `ctx.run` to store the result of non-deterministic operations!
</Admonition>

We can use this feature to do exactly-once payments in `CheckoutService/handle`:
</TabItem>
<TabItem value="java" label="Java">
You can store the return value of any function in the journal, by using `ctx.run`.
This lets you capture potentially non-deterministic computation and interaction with external systems in a safe way.
The SDK also offers helper functions for creating UUIDs and generating random numbers.

<Admonition type="info" title="Handler logic needs to be deterministic">
For the replay to work, code needs to be deterministic, otherwise the replayed entries do not line up with the code execution on retries.
So use `ctx.run` to store the result of non-deterministic operations!
</Admonition>

We can use this feature to do exactly-once payments in `CheckoutService/handle`:
</TabItem>
<TabItem value="go" label="Go">
You can store the return value of any function in the journal, by using `restate.Run`.
This lets you capture potentially non-deterministic computation and interaction with external systems in a safe way.
The SDK also offers helper functions for creating UUIDs and generating random numbers.

<Admonition type="info" title="Handler logic needs to be deterministic">
For the replay to work, code needs to be deterministic, otherwise the replayed entries do not line up with the code execution on retries.
So use `restate.Run` to store the result of non-deterministic operations!
</Admonition>

We can use this feature to do exactly-once payments in `CheckoutService/Handle`:
</TabItem>
<TabItem value="python" label="Python">
        You can store the return value of any function in the journal, by using `ctx.run`.
        This lets you capture potentially non-deterministic computation and interaction with external systems in a safe way.

        <Admonition type="info" title="Handler logic needs to be deterministic">
            For the replay to work, code needs to be deterministic, otherwise the replayed entries do not line up with the code execution on retries.
            So use `ctx.run` to store the result of non-deterministic operations!
        </Admonition>

        We can use this feature to do exactly-once payments in `CheckoutService/handle`:
</TabItem>
<TabItem value="rust" label="Rust">
You can store the return value of any function in the journal, by using `ctx.run`.
This lets you capture potentially non-deterministic computation and interaction with external systems in a safe way.
The SDK also offers helper functions for creating UUIDs and generating random numbers.

<Admonition type="info" title="Handler logic needs to be deterministic">
For the replay to work, code needs to be deterministic, otherwise the replayed entries do not line up with the code execution on retries.
So use `ctx.run` to store the result of non-deterministic operations!
</Admonition>

We can use this feature to do exactly-once payments in `CheckoutService/handle`:
</TabItem>
</Tabs>

<SubtleStep stepLabel="1" title="Generate an idempotency token">
<Tabs groupId="sdk" queryString className={"display-none"}>
    <TabItem value="ts" label="TypeScript">
        Let's use the SDK helper functions to generate a unique payment identifier and store it in Restate.
        Once the token is stored, it will be the same on retries.
        Try it out by printing the idempotency key and then throwing an error:


        ```ts checkout_service.ts
        CODE_LOAD::ts/src/get_started/tour.ts#uuid
        ```

        Call `CartObject/checkout` and have a look at the logs to see what happens.

        <details className="grey-details">
        <summary>Service logs</summary>
        ```log
        ... logs of `CartObjectService/CheckoutService` ...
        [restate] [CheckoutService/handle][inv_1jhuapyO2Bpg3prqzrAJOFs99mt7jv5x3r][2024-03-19T09:15:30.498Z] DEBUG: Invoking function.
        // withClass highlight-line
        My idempotency key: e25b747f-ecfb-443b-8939-1935392aab6b
        Trace: [restate] [CheckoutService/handle][inv_1jhuapyO2Bpg3prqzrAJOFs99mt7jv5x3r][2024-03-19T09:15:30.499Z] TRACE: Function completed with an error: Something happened! Error: Something happened!
        ... rest of trace  ...
        [restate] [CheckoutService/handle][inv_1jhuapyO2Bpg3prqzrAJOFs99mt7jv5x3r][2024-03-19T09:15:30.512Z] DEBUG: Invocation ended with retryable error. ; ErrorMessage
        [restate] [CheckoutService/handle][inv_1jhuapyO2Bpg3prqzrAJOFs99mt7jv5x3r][2024-03-19T09:15:30.568Z] DEBUG: Invoking function.
        // withClass highlight-line
        My idempotency key: e25b747f-ecfb-443b-8939-1935392aab6b
        Trace: [restate] [CheckoutService/handle][inv_1jhuapyO2Bpg3prqzrAJOFs99mt7jv5x3r][2024-03-19T09:15:30.568Z] TRACE: Function completed with an error: Something happened! Error: Something happened!
        ... rest of trace  ...
        [restate] [CheckoutService/handle][inv_1jhuapyO2Bpg3prqzrAJOFs99mt7jv5x3r][2024-03-19T09:15:30.568Z] DEBUG: Invocation ended with retryable error. ; ErrorMessage
        ... retries continue ...
        ```
        </details>
    </TabItem>
    <TabItem value="java" label="Java">
        Let's use the SDK helper functions to generate a unique payment identifier and store it in Restate.
        Once the token is stored, it will be the same on retries.
        Try it out by printing the idempotency key and then throwing an error:


        ```java CheckoutService.java
        CODE_LOAD::java/src/main/java/get_started/Tour.java#uuid
        ```

        Call `CartObject/checkout` and have a look at the logs to see what happens.

        <details className="grey-details">
        <summary>Service logs</summary>
        ```log
        2024-04-17 08:33:52 DEBUG [CheckoutService/handle] dev.restate.sdk.http.vertx.RequestHttpServerHandler - Handling request to CheckoutService/handle
        2024-04-17 08:33:52 INFO  [CheckoutService/handle] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Start processing invocation
        2024-04-17 08:33:52 DEBUG [CheckoutService/handle][inv_155UJNoky4WU38J6ReFTcsOP0S1XiFjWWl] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to REPLAYING
        // withClass highlight-line
        My idempotency key: e43f57b8-ab19-27f2-3693-2e7dd6bda399
        2024-04-17 08:33:52 WARN  [CheckoutService/handle][inv_155UJNoky4WU38J6ReFTcsOP0S1XiFjWWl] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Error when processing the invocation
        java.lang.IllegalStateException: The handler failed
        ... rest of trace ...
        2024-04-17 08:33:52 DEBUG [CheckoutService/handle][inv_155UJNoky4WU38J6ReFTcsOP0S1XiFjWWl] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to CLOSED
        2024-04-17 08:33:52 INFO  [CheckoutService/handle][inv_155UJNoky4WU38J6ReFTcsOP0S1XiFjWWl] dev.restate.sdk.core.InvocationStateMachine - End invocation
        2024-04-17 08:33:52 DEBUG [CheckoutService/handle] dev.restate.sdk.http.vertx.RequestHttpServerHandler - Handling request to CheckoutService/handle
        2024-04-17 08:33:52 INFO  [CheckoutService/handle] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Start processing invocation
        // withClass highlight-line
        2024-04-17 08:33:52 DEBUG [CheckoutService/handle][inv_155UJNoky4WU38J6ReFTcsOP0S1XiFjWWl] dev.restate.sdk.core.InvocationStateMachine - Transitioning state machine to REPLAYING
        // withClass highlight-line
        My idempotency key: e43f57b8-ab19-27f2-3693-2e7dd6bda399
        2024-04-17 08:33:52 WARN  [CheckoutService/handle][inv_155UJNoky4WU38J6ReFTcsOP0S1XiFjWWl] dev.restate.sdk.core.ResolvedEndpointHandlerImpl - Error when processing the invocation
        java.lang.IllegalStateException: The handler failed
        ... rest of trace ...
        ```
        </details>
    </TabItem>
    <TabItem value="go" label="Go">
        Let's use the SDK helper functions to generate a unique payment identifier and store it in Restate.
        Once the token is stored, it will be the same on retries.
        Try it out by printing the idempotency key and then throwing an error:


        ```go checkoutservice.go
        CODE_LOAD::go/getstarted/tour.go#uuid
        ```

        Call `CartObject/Checkout` and have a look at the logs to see what happens.

        <details className="grey-details">
        <summary>Service logs</summary>
        ```
        2024/08/16 17:14:53 INFO Handling invocation method=CheckoutService/Handle invocationID=inv_1lPHOWXVSzKi3YKaekWZqw8vVMjyli4utz
        // withClass highlight-line
        Generated idempotency key 9594910a-3612-4888-9e0a-c3ae58fc2dce
        2024/08/16 17:14:53 ERROR Invocation returned a non-terminal failure method=CheckoutService/Handle invocationID=inv_1lPHOWXVSzKi3YKaekWZqw8vVMjyli4utz err="Something happened!"
        2024/08/16 17:14:53 INFO Handling invocation method=CheckoutService/Handle invocationID=inv_1lPHOWXVSzKi3YKaekWZqw8vVMjyli4utz
        // withClass highlight-line
        Generated idempotency key 9594910a-3612-4888-9e0a-c3ae58fc2dce
        2024/08/16 17:14:53 ERROR Invocation returned a non-terminal failure method=CheckoutService/Handle invocationID=inv_1lPHOWXVSzKi3YKaekWZqw8vVMjyli4utz err="Something happened!"
        ```
        </details>
    </TabItem>
    <TabItem value="python" label="Python">
        Let's use `ctx.run` to generate a unique payment identifier and store it in Restate.
        Once the token is stored, it will be the same on retries.
        Try it out by printing the idempotency key and then throwing an error:


        ```python checkout_service.py
        CODE_LOAD::python/src/get_started/tour.py#uuid
        ```

        Call `CartObject/checkout` and have a look at the logs to see what happens.

        <details className="grey-details">
        <summary>Service logs</summary>
        ```log
        // withClass highlight-line
        My idempotency key is:  84452572-5d8a-48ea-91a5-e3e6f011b4eb
        Traceback (most recent call last):
        ... rest of trace ...
        raise Exception("Something happened!")
        Exception: Something happened!
        // withClass highlight-line
        My idempotency key is:  84452572-5d8a-48ea-91a5-e3e6f011b4eb
        Traceback (most recent call last):
        ... rest of trace ...
        raise Exception("Something happened!")
        Exception: Something happened!
            // withClass highlight-line
        My idempotency key is:  84452572-5d8a-48ea-91a5-e3e6f011b4eb
        ... retries continue ...
        ```
        </details>
    </TabItem>
    <TabItem value="rust" label="Rust">
        Let's use the SDK helper functions to generate a unique payment identifier and store it in Restate.
        Once the token is stored, it will be the same on retries.
        Try it out by printing the idempotency key and then throwing an error:

        ```rust checkout_service.rs
        CODE_LOAD::rust/src/get_started/tour.rs#uuid
        ```

        Call `CartObject/checkout` and have a look at the logs to see what happens.

        <details className="grey-details">
        <summary>Service logs</summary>
        ```log
        2024-12-04T17:50:58.891562Z  INFO restate_sdk::http_server: Starting listening on 0.0.0.0:9080
        2024-12-04T17:51:20.885578Z  INFO app::checkout_service: idempotent key: 6bf87695-0c3a-d69a-3af0-8cb74ccbbe24
        2024-12-04T17:51:20.990296Z  INFO app::checkout_service: idempotent key: 6bf87695-0c3a-d69a-3af0-8cb74ccbbe24
        2024-12-04T17:51:21.110006Z  INFO app::checkout_service: idempotent key: 6bf87695-0c3a-d69a-3af0-8cb74ccbbe24
        ```
        </details>
    </TabItem>
</Tabs>
</SubtleStep>

<SubtleStep stepLabel="2" title="Trigger the payment">
<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">
Execute the payment via an external payment provider `PaymentClient`
The payment provider will deduplicate payments based on the idempotency token.
We assume every ticket costs 40 dollars.

```typescript checkout_service.ts
CODE_LOAD::ts/src/get_started/tour.ts#checkout
```

</TabItem>
<TabItem value="java" label="Java">
Execute the payment via an external payment provider via `PaymentClient.get().call(idempotencyKey, amount)`.
The payment provider will deduplicate payments based on the idempotency token.
We assume every ticket costs 40 dollars.

```java CheckoutService.java
CODE_LOAD::java/src/main/java/get_started/Tour.java#checkout
```

</TabItem>
<TabItem value="go" label="Go">
Execute the payment via an external payment provider via `auxiliary.PaymentClient{}.Call(idempotencyKey, amount)`.
The payment provider will deduplicate payments based on the idempotency token.
We assume every ticket costs 40 dollars.

```go checkoutservice.go
CODE_LOAD::go/getstarted/tour.go#checkout
```
</TabItem>
<TabItem value="python" label="Python">
Execute the payment via an external payment provider via `payment_client.call(idempotency_key, total_price)`.
The payment provider will deduplicate payments based on the idempotency token.
We assume every ticket costs 40 dollars.

```python checkout_service.py
CODE_LOAD::python/src/get_started/checkout.py#checkout
```

</TabItem>
<TabItem value="rust" label="Rust">
Execute the payment via an external payment provider `PaymentClient`
The payment provider will deduplicate payments based on the idempotency token.
We assume every ticket costs 40 dollarstypescript.

```rust checkout_service.rs
CODE_LOAD::rust/src/get_started/tour.rs#checkout
```

</TabItem>
</Tabs>

</SubtleStep>

### 📝 Try it out

Let's finish the checkout flow by sending the email notifications and marking the tickets as sold.

<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">
<SubtleStep stepLabel="1" title="Implement the email notifications">
After the `CheckoutService/handle` handler has handled the payment, you need to notify the users of the payment status:
- **Payment success**: notify the users via `EmailClient.get().notifyUserOfPaymentSuccess(request.userId)`.
- **Payment failure**: notify the users via the `EmailClient.get().notifyUserOfPaymentFailure(request.userId)`.

<details>
<summary>Solution</summary>
```ts checkout_service.ts
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/typescript/tutorials/tour-of-restate-typescript/src/part4/checkout_service.ts#checkout
```
</details>
</SubtleStep>

<SubtleStep stepLabel="2" title="Mark tickets as sold">
Let the `CartObject/checkout` handler mark all tickets as sold by calling `TicketObject/markAsSold` for each ticket.

<details>
<summary>Solution</summary>
```typescript cart_object.ts
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/typescript/tutorials/tour-of-restate-typescript/src/part4/cart_object.ts#checkout
```
</details>

</SubtleStep>
</TabItem>
<TabItem value="java" label="Java">
<SubtleStep stepLabel="1" title="Implement the email notifications">
After the `CheckoutService/handle` handler has handled the payment, you need to notify the users of the payment status:
- **Payment success**: notify the users via `EmailClient.get().notifyUserOfPaymentSuccess(request.getUserId())`.
- **Payment failure**: notify the users via the `EmailClient.get().notifyUserOfPaymentFailure(request.getUserId())`.

<details>
<summary>Solution</summary>
```java CheckoutService.java
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/java/tutorials/tour-of-restate-java/src/main/java/dev/restate/tour/part4/CheckoutService.java#checkout
```
</details>
</SubtleStep>

<SubtleStep stepLabel="2" title="Mark tickets as sold">
Let the `CartObject/checkout` handler mark all tickets as sold by calling `TicketObject/markAsSold` for each ticket.

<details>
<summary>Solution</summary>
```java CartObject.java
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/java/tutorials/tour-of-restate-java/src/main/java/dev/restate/tour/part4/CartObject.java#checkout
```
</details>

</SubtleStep>
</TabItem>
<TabItem value="go" label="Go">
<SubtleStep stepLabel="1" title="Implement the email notifications">
After the `CheckoutService/Handle` handler has handled the payment, you need to notify the users of the payment status:
- **Payment success**: notify the users via `EmailClient{}.NotifyUserOfPaymentSuccess(request.UserId)`.
- **Payment failure**: notify the users via the `EmailClient{}.NotifyUserOfPaymentFailure(request.UserId)`.

<details>
<summary>Solution</summary>
```go checkoutservice.go
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/go/tutorials/tour-of-restate-go/part4/checkoutservice.go#checkout
```
</details>
</SubtleStep>

<SubtleStep stepLabel="2" title="Mark tickets as sold">
Let the `CartObject/checkout` handler mark all tickets as sold by calling `TicketObject/markAsSold` for each ticket.

<details>
<summary>Solution</summary>
```go cartobject.go
CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/go/tutorials/tour-of-restate-go/part4/cartobject.go#checkout
```
</details>

</SubtleStep>
</TabItem>
<TabItem value="python" label="Python">
    <SubtleStep stepLabel="1" title="Implement the email notifications">
        After the `CheckoutService/handle` handler has handled the payment, you need to notify the users of the payment status:
        - **Payment success**: notify the users via `email_client.notify_user_of_payment_success(order['user_id'])`.
        - **Payment failure**: notify the users via the `email_client.notify_user_of_payment_failure(order['user_id'])`.

        <details>
            <summary>Solution</summary>
            ```python checkout_service.py
            CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/python/tutorials/tour-of-restate-python/tour/part4/checkout_service.py#checkout
            ```
        </details>
    </SubtleStep>
    <SubtleStep stepLabel="2" title="Mark tickets as sold">
        Let the `CartObject/checkout` handler mark all tickets as sold by calling `TicketObject/markAsSold` for each ticket.

        <details>
            <summary>Solution</summary>
            ```typescript cart_object.ts
            CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/python/tutorials/tour-of-restate-python/tour/part4/cart_object.py#checkout
            ```
        </details>

    </SubtleStep>
</TabItem>
    <TabItem value="rust" label="Rust">
        <SubtleStep stepLabel="1" title="Implement the email notifications">
            After the `CheckoutService/handle` handler has handled the payment, you need to notify the users of the payment status:
            - **Payment success**: notify the users via `EmailClient.notify_user_of_payment_success(&user_id)`.
            - **Payment failure**: notify the users via the `EmailClient.notify_user_of_payment_failure(&user_id)`.

            <details>
                <summary>Solution</summary>
                ```rust checkout_service.rs
                CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/rust/tutorials/tour-of-restate-rust/src/part4/checkout_service.rs#checkout
                ```
            </details>
        </SubtleStep>

        <SubtleStep stepLabel="2" title="Mark tickets as sold">
            Let the `CartObject/checkout` handler mark all tickets as sold by calling `TicketObject/markAsSold` for each ticket.

            <details>
                <summary>Solution</summary>
                ```rust cart_object.rs
                CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/main/rust/tutorials/tour-of-restate-rust/src/part4/cart_object.rs#checkout
                ```
            </details>

        </SubtleStep>
    </TabItem>
</Tabs>

🥳 You have now fully implemented the ticket reservation system!
Try it out by reserving some new tickets and buying them by checking out the cart.

<Admonition type="info">
🚩 Explore the intermediate solution in `part4`, and run it with:

<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">

```shell
npm run part4
```

</TabItem>
<TabItem value="java" label="Java">

```shell
./gradlew -PmainClass=dev.restate.tour.part4.AppMain run
```

</TabItem>
<TabItem value="go" label="Go">

```shell
go run ./part4
```

</TabItem>
<TabItem value="python" label="Python">

    ```shell
    python3 -m hypercorn -b localhost:9080 tour/part4/app:app
    ```

</TabItem>
    <TabItem value="rust" label="Rust">

        ```shell
        cargo run --bin part4
        ```

    </TabItem>
</Tabs>
</Admonition>

## Idempotency for any request
As you saw, generating idempotency keys inside your handlers and storing them in Restate is easy.
But this doesn't guard us yet against retries of the HTTP request to Restate.

<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">
For example, if the caller of the `addTicket` handler didn't receive the success response of its first request, it might retry the request.
</TabItem>
<TabItem value="java" label="Java">
For example, if the caller of the `addTicket` handler didn't receive the success response of its first request, it might retry the request.
</TabItem>
<TabItem value="go" label="Go">
For example, if the caller of the `AddTicket` handler didn't receive the success response of its first request, it might retry the request.
</TabItem>
<TabItem value="python" label="Python">
For example, if the caller of the `addTicket` handler didn't receive the success response of its first request, it might retry the request.
</TabItem>
</Tabs>
The second request will return `false` because the ticket already got reserved the first time, but the caller won't know about this.

To cover this, you can add an `idempotency-key` header to the incoming request to let Restate deduplicate them.

<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">
In our example, when we call the `CartObject/addTicket` handler, the first time the response is `true` and the second time it's `false`.
However, if we use the same idempotency key, the second call will return `true` as well, because it will return the result of the first call:

```shell
curl localhost:8080/CartObject/Mary/addTicket \
    -H 'idempotency-key: ad5472esg4dsg525dssdfa5loi'  \
    --json '"seat2C"'
```
</TabItem>
<TabItem value="java" label="Java">
In our example, when we call the `CartObject/addTicket` handler, the first time the response is `true` and the second time it's `false`.
However, if we use the same idempotency key, the second call will return `true` as well, because it will return the result of the first call:

```shell
curl localhost:8080/CartObject/Mary/addTicket \
    -H 'idempotency-key: ad5472esg4dsg525dssdfa5loi'  \
    --json '"seat2C"'
```
</TabItem>
<TabItem value="go" label="Go">
In our example, when we call the `CartObject/AddTicket` handler, the first time the response is `true` and the second time it's `false`.
However, if we use the same idempotency key, the second call will return `true` as well, because it will return the result of the first call:

```shell
curl localhost:8080/CartObject/Mary/AddTicket \
    -H 'idempotency-key: ad5472esg4dsg525dssdfa5loi'  \
    --json '"seat2C"'
```
</TabItem>
<TabItem value="python" label="Python">
    In our example, when we call the `CartObject/addTicket` handler, the first time the response is `true` and the second time it's `false`.
    However, if we use the same idempotency key, the second call will return `true` as well, because it will return the result of the first call:

    ```shell
    curl localhost:8080/CartObject/Mary/addTicket \
    -H 'idempotency-key: ad5472esg4dsg525dssdfa5loi'  \
    --json '"seat2C"'
    ```
</TabItem>
</Tabs>


You can also see from the service logs that the handler wasn't executed the second time.

<Admonition type="tip" title="End-to-end idempotency">
Restate gives you idempotency for any service, handler and request for free.
No extra setup.
</Admonition>

<Admonition type="info">
You only need this when invoking handlers over HTTP.
When a handler calls another handler, Restate automatically takes care of the idempotency.
</Admonition>

## Tracing
Restate exposes OpenTelemetry traces of your invocations.

<SubtleStep stepLabel="1" title="Run Jaeger">

```shell
docker run -d --name jaeger -p 4317:4317 -p 16686:16686 jaegertracing/jaeger:2.4.0
```
</SubtleStep>
<SubtleStep stepLabel="2" title="Relaunch Restate with tracing enabled">

    <CodeWithTabs>
    ```shell !!tabs binary
    restate-server --tracing-endpoint http://localhost:4317
    ```

    ```shell !!tabs Docker
    docker run --name restate_dev -p 8080:8080 -p 9070:9070 -p 9071:9071 \
        -e RESTATE_TRACING_ENDPOINT=http://host.docker.internal:4317 \
        --add-host=host.docker.internal:host-gateway docker.restate.dev/restatedev/restate:VAR::RESTATE_VERSION
    ```
    </CodeWithTabs>
</SubtleStep>
<SubtleStep stepLabel="3" title="Send a few requests">
  <Tabs groupId="sdk" queryString className={"display-none"}>
  <TabItem value="ts" label="TypeScript">

        ```shell
        curl localhost:8080/CartObject/Mary/addTicket --json '"seat2A"'
        curl localhost:8080/CartObject/Mary/addTicket --json '"seat2B"'
        curl localhost:8080/CartObject/Mary/addTicket --json '"seat2C"'
        curl -X POST localhost:8080/CartObject/Mary/checkout
        ```
  </TabItem>
  <TabItem value="java" label="Java">
        ```shell
        curl localhost:8080/CartObject/Mary/addTicket --json '"seat2A"'
        curl localhost:8080/CartObject/Mary/addTicket --json '"seat2B"'
        curl localhost:8080/CartObject/Mary/addTicket --json '"seat2C"'
        curl -X POST localhost:8080/CartObject/Mary/checkout
        ```
  </TabItem>
  <TabItem value="go" label="Go">
        ```shell
        curl localhost:8080/CartObject/Mary/AddTicket --json '"seat2A"'
        curl localhost:8080/CartObject/Mary/AddTicket --json '"seat2B"'
        curl localhost:8080/CartObject/Mary/AddTicket --json '"seat2C"'
        curl -X POST localhost:8080/CartObject/Mary/Checkout
        ```
  </TabItem>
<TabItem value="python" label="Python">

  ```shell
  curl localhost:8080/CartObject/Mary/addTicket --json '"seat2A"'
  curl localhost:8080/CartObject/Mary/addTicket --json '"seat2B"'
  curl localhost:8080/CartObject/Mary/addTicket --json '"seat2C"'
  curl -X POST localhost:8080/CartObject/Mary/checkout
  ```
</TabItem>
  </Tabs>

</SubtleStep>
<SubtleStep stepLabel="4" title="Go to the Jaeger UI">
http://localhost:16686
</SubtleStep>
<SubtleStep stepLabel="5" title="Inspect the traces">

Select the `CartObject` service from the service dropdown.
<Tabs groupId="sdk" queryString className={"display-none"}>
<TabItem value="ts" label="TypeScript">
You should see the `addTicket` and `checkout` requests listed.
Have a look at the traces of the `checkout` call:
</TabItem>
<TabItem value="java" label="Java">
You should see the `addTicket` and `checkout` requests listed.
Have a look at the traces of the `checkout` call:
</TabItem>
<TabItem value="go" label="Go">
You should see the `AddTicket` and `Checkout` requests listed.
Have a look at the traces of the `Checkout` call:
</TabItem>
<TabItem value="python" label="Python">
You should see the `addTicket` and `checkout` requests listed.
Have a look at the traces of the `checkout` call:
</TabItem>
</Tabs>

![CheckoutService call traces](/img/tracing_tour.png)

You can see the calls that were done to Restate, for example invoke, sleep, one way call, get state, etc., and their timings.
If you expand one of the traces, you can see tags describing some metadata of the context call, for example invocation ID and the request.
</SubtleStep>
For more information, have a look at the [tracing docs](/operate/monitoring/tracing).

## 🏁 The end
You reached the end of this tutorial!

Let's recap what you did! You have built a ticket reservation system that is resilient, consistent, and scalable.
We used Restate to provide us with durable, distributed building blocks to simplify the implementation of the system.
Let's list a few of them:

| What you implemented                                                     | What you didn't implement, as Restate handles it for you                                       |
|--------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| ✅ Request-response invocations                                           | ❌ Handling retries, timeouts, etc.                                                            |
| ✅ Sending messages                                                       | ❌ Deploy and operate message queues for async requests                                        |
| ✅ Idempotent HTTP calls                                        | ❌ Write deduplication logic                                       |
| ✅ Durable Execution: retries, partial progress recovery, and suspensions | ❌ Manual retry logic and partial progress recovery                                 |
| ✅ Durable timers: sleeping and scheduling async tasks                    | ❌ Workflow orchestrators or cron jobs for scheduling tasks                                     |
| ✅ Virtual Objects: concurrency guarantees and shared state               | ❌ Guards for keeping state consistent across retries, concurrent requests, and scaling out.    |
| ✅ K/V state: storing and inspecting                                      | ❌ Session databases for state. State consistency guards.                                       |
| ✅ Storing computation results in the journal                             | ❌ Logic to make operations idempotent (e.g. generate idempotency keys)                         |

You now know the essentials to start developing Restate services! Have a look at the next steps to explore further.

## Next steps
- [Run the examples](https://github.com/restatedev/examples)
- [Read the Concepts](/concepts/durable_building_blocks): although most of this has been covered in this tutorial
- [Check out the SDK documentation](/develop/)
