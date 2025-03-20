---
sidebar_position: 3
description: ""
---

import FeatureList from "../../src/components/FeatureList"
import {Scrollycoding} from "../../src/components/code/scrollycoding";
import {
    Terminal
} from "../../src/components/code/terminal";
import SdkIcons from "../../src/components/SdkIcons";

# Invocations

An invocation is a request to execute a handler that is part of a Restate service.

There are three ways to invoke a handler:

<FeatureList features={[
    {
        title: 'HTTP requests',
        iconPath: '/img/http-icon.svg',
        description: (
            <p>
                Send a request to the Restate Server (port <code>8080</code>), with the handler name in the path, and the payload body.
                <br/>
                <a href="/invoke/http">Learn more</a>
            </p>
        ),
    },
    {
        title: 'Programmatically',
        iconPath: '/img/code-icon.svg',
        description: (
            <p>
                Use the SDK to send requests within Restate handlers. Or use generated HTTP clients anywhere else.
                <br/>
                <a href="/invoke/clients">Learn more</a>
            </p>
        ),
    },
    {
        title: 'Kafka events',
        iconPath: '/img/kafka-icon.svg',
        description: (
            <p>
                Restate subscribes to a Kafka topic, and invokes a handler should for each message that arrives.
                <br/>
                <a href="/invoke/kafka">Learn more</a>
            </p>
        ),
    },
]}/>

All invocations are proxied through the Restate Server, which registers the request, routes the request to the correct handler, and drives the execution of the handler.

Invocations get a unique identifier. This identifier is used to track the progress of the invocation, and lets you correlate logs and metrics.

## Invocation types

<Scrollycoding>

    ## !!steps
    **Request-response invocations** allow you to call another handler and wait for the response.

    ```typescript !!tabs TypeScript
    CODE_LOAD::ts/src/concepts/invocations/rpc.ts#rpc_call
    ```
    ```typescript !!tabs TypeScript
    CODE_LOAD::ts/src/concepts/invocations/ingress/rpc.ts#rpc_call_node
    ```

    ```java !!tabs Java
    CODE_LOAD::java/src/main/java/concepts/invocations/RpcCalls.java#rpc
    ```
    ```java !!tabs Java
    CODE_LOAD::java/src/main/java/concepts/invocations/RpcCalls.java#rpc_java
    ```

    ```go !!tabs Go
    CODE_LOAD::go/concepts/invocations/call/call.go#rpc_call
    ```
    ```python !!tabs Python
    CODE_LOAD::python/src/concepts/invocations/rpc.py#rpc_call
    ```
    ```bash !!tabs curl
    curl localhost:8080/GreeterService/greet --json '"Hi"'
    ```

    ## !!steps
    **One-way invocations** allow you to trigger an asynchronous action.
    This returns an invocation ID with which you can retrieve the result of the invocation later, if desired.

    ```typescript !!tabs TypeScript
    CODE_LOAD::ts/src/concepts/invocations/one_way.ts#one_way_call
    ```
    ```typescript !!tabs TypeScript
    CODE_LOAD::ts/src/concepts/invocations/ingress/one_way.ts#one_way_call_node
    ```

    ```java !!tabs Java
    CODE_LOAD::java/src/main/java/concepts/invocations/OneWayCalls.java#one_way_call
    ```
    ```java !!tabs Java
    CODE_LOAD::java/src/main/java/concepts/invocations/OneWayCalls.java#one_way_call_java
    ```

    ```go !!tabs Go
    CODE_LOAD::go/concepts/invocations/send/send.go#one_way_call
    ```
    ```python !!tabs Python
    CODE_LOAD::python/src/concepts/invocations/one_way.py#one_way_call
    ```
    ```bash !!tabs curl
    curl localhost:8080/GreeterService/greet/send --json '"Hi"'
    ```

    ## !!steps
    **Delayed invocations** allow you to schedule an invocation for a later point in time.

    ```typescript !!tabs TypeScript
    CODE_LOAD::ts/src/concepts/invocations/delayed.ts#delayed_call
    ```
    ```typescript !!tabs TypeScript
    CODE_LOAD::ts/src/concepts/invocations/ingress/delayed.ts#delayed_call_node
    ```

    ```java !!tabs Java
    CODE_LOAD::java/src/main/java/concepts/invocations/DelayedCalls.java#delayed_call
    ```
    ```java !!tabs Java
    CODE_LOAD::java/src/main/java/concepts/invocations/DelayedCalls.java#delayed_call_java
    ```

    ```go !!tabs Go
    CODE_LOAD::go/concepts/invocations/delayed_send/delayed_send.go#delayed_call
    ```
    ```python !!tabs Python
    CODE_LOAD::python/src/concepts/invocations/delayed.py#delayed_call
    ```
    ```bash !!tabs curl
    curl localhost:8080/GreeterService/greet/send?delay=10s --json '"Hi"'
    ```

</Scrollycoding>

<SdkIcons
    sdkLinks={{
        description: "Or have a look at the SDK documentation on service communication:",
        ts: "/develop/ts/overview#virtual-objects",
        java: "/develop/java/overview#virtual-objects",
        kotlin: "/develop/java/overview?sdk=kotlin#virtual-objects",
        go: "/develop/go/overview#virtual-objects",
        python: "/develop/python/overview#virtual-objects",
        rust: "https://docs.rs/restate-sdk/latest/restate_sdk/#virtual-objects"
    }}
/>

Learn more about [HTTP invocations](/invoke/http), [SDK clients](/invoke/clients), [Kafka events](/invoke/kafka).

## Idempotent invocations
You can add an idempotency key to your request header to make the invocation idempotent.
Restate will then deduplicate requests with the same idempotency key, and will only execute the handler once.
Duplicate requests will get the same response as the first request, or will latch on to the first invocation if it's still running.

```bash
curl localhost:8080/GreeterService/greet \
# !focus
  -H 'idempotency-key: ad5472esg4dsg525dssdfa5loi' \
  --json '"Hi"'
```

## Inspecting invocations
Restate proxies and manages inbound as well as service-to-service invocations.
This makes it a great source of observability data for your application.
You can inspect invocations via the UI:

<img src="/img/concepts/ui_invocation_debug.png"/>


Or via the CLI:
<Terminal>

    ```shell !command
    restate services list
    ```

    ```shell !output
         NAME             REVISION  FLAVOR    DEPLOYMENT TYPE  DEPLOYMENT ID
     🌎  CartObject       1         ⬅️ 🚶🚶🚶  HTTP 2           dp_11pXug0mWsff2NOoRBZbOcV
     🌎  CheckoutService  1                   HTTP 2           dp_11pXug0mWsff2NOoRBZbOcV
     🌎  TicketObject     1         ⬅️ 🚶🚶🚶  HTTP 2           dp_11pXug0mWsff2NOoRBZbOcV
    ```
</Terminal>

<Terminal>
    ```shell !command
    restate services describe CartObject
    ```

    ```shell !output
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

Restate also [exposes traces](/operate/monitoring/tracing) via OpenTelemetry, which can be sent to your observability platform of choice (e.g. Jaeger).

<div className="text--center">
<img src="/img/Jaeger.svg" alt="Jaeger" class="bordered" width="20%"/>
<img src="/img/OpenTelemetry.svg" alt="Jaeger" class="bordered" width="20%"/>
</div>


## Cancelling and killing invocations

You can cancel and kill invocations via the Restate UI, the CLI, or with the SDK clients.
- For cancellations, Restate will gracefully stop the handler by executing all compensation actions.
- For kills, Restate will immediately stop the handler without executing any compensation actions.

If necessary, you can register compensating actions in your handlers to ensure that the system remains consistent amid cancellations ([sagas guide](/guides/sagas)).

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

