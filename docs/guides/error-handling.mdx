---
title: "Error Handling"
description: "Learn how to handle transient and terminal errors in your applications."
pagination_next: null
pagination_prev: null
---

import Admonition from "@theme/Admonition";
import {CodeWithTabs} from "../../src/components/code/code";

# Error Handling

Restate handles retries for failed invocations. By default, Restate infinitely retries all errors with an exponential backoff strategy.

This guide helps you fine-tune the retry behavior for your use cases.

## Infrastructure errors (transient) vs. application errors (terminal)

In Restate, we distinguish between two types of errors: transient errors and terminal errors.

- **Transient errors** are temporary and can be retried. They are typically caused by infrastructure issues (network problems, service overload, API unavailability,...).
- **Terminal errors** are permanent and should not be retried. They are typically caused by application logic (invalid input, business rule violation, ...).

## Handling transient errors via retries

Restate assumes by default that all errors are transient errors and therefore retryable.
If you do not want an error to be retried, you need to specifically label it as a terminal error ([see below](#application-errors-terminal)).

Restate lets you configure the retry strategy at different levels: at the Restate-level (global) and at the run-block-level.

### At the Restate-Level (Global)

This defines the default retry policy that will be used for all invocations, unless overridden at the service-, or run-block-level.

You can set the global retry policy in the [Restate Server configuration](/operate/configuration/server).
By default, Restate will use an **exponential backoff retry policy**:

```toml restate.toml
[worker.invoker.retry-policy]
type = "exponential" # retry strategy; required
initial-interval = "50ms" # time between the first and second retry; required
factor = 2.0 # factor used to calculate the next retry interval; required
max-interval = "10s" # max time between retries; default: unset (=interval keeps increasing)
```

You can tune this policy to your needs. Note that all durations should follow the [humantime format](https://docs.rs/humantime/latest/humantime/fn.parse_duration.html).

You can also use a **fixed-delay retry policy**:
```toml restate.toml
[worker.invoker.retry-policy]
type = "fixed-delay" # retry strategy; required
interval = "50ms" # time between retries; required
max-attempts = "10" # max number of attempts before terminal error; default: unset (=infinite)
```

If you set a maximum number of attempts, then the handler will throw a terminal error once the retries are exhausted.

Then run the Restate Server with:

```shell
restate-server --config-file restate.toml
```

Or set it [via environment variables](/operate/configuration/server#environment-variables), for example:
```shell
RESTATE_WORKER__INVOKER__RETRY_POLICY__TYPE=fixed-delay \
RESTATE_WORKER__INVOKER__RETRY_POLICY__INTERVAL=100ms \
restate-server
```

### At the Run-Block-Level

Handlers use run blocks to execute non-deterministic actions, often involving other systems and services (API call, DB write, ...).
These run blocks are especially prone to transient failures, and you might want to configure a specific retry policy for them.
Most Restate SDKs allow this:

<CodeWithTabs groupId={"sdk"}>
    ```ts !!tabs TypeScript
    CODE_LOAD::ts/src/guides/retries.ts?1
    ```

    ```python !!tabs Python
    CODE_LOAD::python/src/guides/retries.py?1
    ```

    ```java !!tabs Java
    CODE_LOAD::java/src/main/java/guides/RetryRunService.java?1
    ```

    ```kotlin !!tabs Kotlin
    CODE_LOAD::kotlin/src/main/kotlin/guides/RetryRunService.kt?1
    ```

    ```go !!tabs Go
    CODE_LOAD::go/guides/retries.go?1
    ```

    ```rust !!tabs Rust
    CODE_LOAD::rust/src/guides/retries.rs
    ```

</CodeWithTabs>


Note that these retries are coordinated and initiated by the Restate Server.
So the handler goes through the regular retry cycle of suspension and re-invocation.

If you set a maximum number of attempts, then the run block will fail with a TerminalException once the retries are exhausted.

<Admonition type="note" title="Other levels of retry policies">
Service-level retry policies are planned and will come soon.
</Admonition>

## Application errors (terminal)

By default, Restate infinitely retries all errors.
In some cases, you might not want to retry an error (e.g. because of business logic, because the issue is not transient, ...).

For these cases you can throw a terminal error. Terminal errors are permanent and are not retried by Restate.

You can throw a terminal error as follows:

<CodeWithTabs groupId={"sdk"}>
    ```ts !!tabs TypeScript
    CODE_LOAD::ts/src/develop/error_handling.ts
    ```

    ```python !!tabs Python
    CODE_LOAD::python/src/develop/error_handling.py
    ```

    ```java !!tabs Java
    CODE_LOAD::java/src/main/java/develop/ErrorHandling.java
    ```

    ```kotlin !!tabs Kotlin
    CODE_LOAD::kotlin/src/main/kotlin/develop/ErrorHandling.kt
    ```

    ```go !!tabs Go
    CODE_LOAD::go/develop/errorhandling.go
    ```

    ```rust !!tabs Rust
    CODE_LOAD::rust/src/guides/retries.rs#terminal_error
    ```
</CodeWithTabs>

You can throw terminal errors from any place in your handler, including run blocks.

Unless catched, terminal errors stop the execution and are propagated back to the caller.
If the caller is another Restate service, the terminal error will propagate across RPCs, and will get thrown at the line where the RPC was made.
If this is not caught, it will propagate further up the call stack until it reaches the original caller.

You can catch terminal errors just like any other error, and build control flow around this.
For example, the catch block can run undo actions for the actions you did earlier in your handler, to bring it to a consistent state before rethrowing the terminal error.

For example, to catch a terminal error of a run block:
<CodeWithTabs groupId={"sdk"}>
    ```ts !!tabs TypeScript
    CODE_LOAD::ts/src/guides/retries.ts#catch
    ```

    ```python !!tabs Python
    CODE_LOAD::python/src/guides/retries.py#catch
    ```

    ```java !!tabs Java
    CODE_LOAD::java/src/main/java/guides/RetryRunService.java#catch
    ```

    ```kotlin !!tabs Kotlin
    CODE_LOAD::kotlin/src/main/kotlin/guides/RetryRunService.kt#catch
    ```

    ```go !!tabs Go
    CODE_LOAD::go/guides/retries.go#catch
    ```

    ```rust !!tabs Rust
    CODE_LOAD::rust/src/guides/retries.rs#catch
    ```
</CodeWithTabs>

<Admonition type="note" title="Sagas with Restate">
    When you throw a terminal error, you might need to undo the actions you did earlier in your handler to make sure that your system remains in a consistent state.
    Have a look at our [sagas guide](/guides/sagas) to learn more.
</Admonition>


## Cancellations are Terminal Errors

You can cancel invocations via the [CLI](/operate/invocation#cancelling-invocations), UI and programmatically.
When you cancel an invocation, it throws a terminal error in the handler processing the invocation the next time it awaits a Promise or Future of a Restate Context action (e.g. run block, RPC, sleep,...; `RestatePromise` in TypeScript, `DurableFuture` in Java).
Unless caught, This terminal error will propagate up the call stack until it reaches the original caller.

Here again, the handler needs to have [compensation logic](/guides/sagas) in place to make sure the system remains in a consistent state, when you cancel an invocation.

## Timeouts between Restate and the service

There are two types of timeouts describing the behavior between Restate and the service.

### Inactivity timeout

When the Restate Server does not receive a next journal entry from a running handler within the inactivity timeout, it will ask the handler to suspend.
This timer guards against stalled service/handler invocations. Once it expires, Restate triggers a graceful termination by asking the service invocation to suspend (which preserves intermediate progress).

By default, the inactivity timeout is set to one minute.

You can increase the inactivity timeout if you have long-running `ctx.run` blocks, that lead to long pauses between journal entries. Otherwise, this timeout might kill the ongoing execution.

### Abort timeout

This timer guards against stalled service/handler invocations that are supposed to terminate.
The abort timeout is started after the 'inactivity timeout' has expired and the service/handler invocation has been asked to gracefully terminate.
Once the timer expires, it will abort the service/handler invocation.

By default, the abort timeout is set to one minute.
This timer potentially interrupts user code.
If the user code needs longer to gracefully terminate, then this value needs to be set accordingly.

<Admonition type="note" title="Long-running run blocks">
    If you have long-running `ctx.run` blocks, you need to increase both timeouts to prevent the handler from terminating prematurely.
</Admonition>


### Configuring the timeouts

You can set the inactivity timeout via the UI, the CLI or the [Restate Server configuration](/operate/configuration/server).

Via the CLI:

```shell
restate services config edit <SERVICE>
```
Then you can adapt the configuration file and save it for the new settings to take effect.

Via the Restate Server Configuration:

```toml restate.toml
[worker.invoker]
inactivity-timeout = "1m"
abort-timeout = "1m"
```

```shell
restate-server --config-file restate.toml
```

Both timeouts follow the [humantime](https://docs.rs/humantime/latest/humantime/) format.

Or set it [via environment variables](/operate/configuration/server#environment-variables), for example:
```shell
RESTATE_WORKER__INVOKER__INACTIVITY_TIMEOUT=5m \
  RESTATE_WORKER__INVOKER__ABORT_TIMEOUT=5m \
  restate-server
```


## Common patterns

These are some common patterns for handling errors in Restate:

### Sagas

Have a look at the [sagas guide](/guides/sagas) to learn how to revert your system back to a consistent state after a terminal error.
Keep track of compensating actions throughout your business logic and apply them in the catch block after a terminal error.

### Dead-letter queue
A [dead-letter queue (DLQ)](https://aws.amazon.com/what-is/dead-letter-queue/) is a queue where you can send messages that could not be processed due to errors.

You can implement this in Restate by wrapping your handler in a try-catch block. In the catch block you can forward the failed invocation to a DLQ Kafka topic or a catch-all handler which for example reports them or backs them up.

<details>
    <summary>Catching failed invocations before handler execution starts</summary>

    Some errors might happen before the handler code gets invoked/starts running (e.g. service does not exist, request decoding errors in SDK HTTP server, ...).
    By default, Restate fails these requests with `400`.

    Handle these as follows:
    - In case the caller waited for the response of the failed call, the caller can handle the propagation to the DLQ.
    - If the caller did not wait for the response (one-way send), you would lose these messages.
    - Decoding errors can be caught by doing the decoding inside the handler.
        The called handler then takes raw input and does the decoding and validation itself.
        In this case, it would be included in the try-catch block which would do the dispatching:

        <CodeWithTabs groupId={"sdk"}>
            ```ts !!tabs TypeScript
            CODE_LOAD::ts/src/guides/retries.ts#raw
            ```

            ```python !!tabs Python
            CODE_LOAD::python/src/guides/retries.py#raw
            ```

            ```java !!tabs Java

            CODE_LOAD::java/src/main/java/guides/RetryRunService.java#raw
            ```

            ```kotlin !!tabs Kotlin
            CODE_LOAD::kotlin/src/main/kotlin/guides/RetryRunService.kt#raw
            ```

            ```go !!tabs Go
            CODE_LOAD::go/guides/retries.go#raw
            ```

            ```rust !!tabs Rust
            CODE_LOAD::rust/src/guides/retries.rs#raw
            ```
        </CodeWithTabs>

        The other errors mainly occur due to misconfiguration of your setup (e.g. wrong service name, wrong handler name, forgot service registration...).
        You cannot handle those.

</details>

### Timeouts for context actions

You can set timeouts for context actions like calls, awakeables, etc. to bound the time they take:

<CodeWithTabs groupId={"sdk"}>
    ```ts !!tabs TypeScript
    CODE_LOAD::ts/src/guides/retries.ts#timeout
    ```

    ```python !!tabs Python
    CODE_LOAD::python/src/guides/retries.py#timeout
    ```

    ```java !!tabs Java
    CODE_LOAD::java/src/main/java/guides/RetryRunService.java#timeout
    ```

    ```kotlin !!tabs Kotlin
    CODE_LOAD::kotlin/src/main/kotlin/guides/RetryRunService.kt#timeout
    ```

    ```go !!tabs Go
    CODE_LOAD::go/guides/retries.go#timeout
    ```
</CodeWithTabs>
