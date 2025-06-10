---
title: "Sagas"
description: "Implementing undo operations in case of failures, to keep your system consistent"
pagination_next: null
pagination_prev: null
---

import Admonition from "@theme/Admonition";
import {Step} from "../../src/components/Stepper";
import {CodeWithTabs} from "../../src/components/code/code";

# Sagas

When building distributed systems, it is crucial to ensure that the system remains consistent even in the presence of failures.
One way to achieve this is by using the [Saga pattern](https://learn.microsoft.com/en-us/azure/architecture/reference-architectures/saga/saga).

<Admonition type={"tip"} title={"What is a Saga?"}>
    A *Saga* is a design pattern for handling transactions that span multiple services.
    It breaks the process into a sequence of local operations, each with a corresponding **compensating action**.

    If a failure occurs partway through, these compensations are triggered to **undo** completed steps, ensuring your system stays consistent even when things go wrong.
</Admonition>

## How does Restate help?

Restate makes it easy to implement resilient sagas in your code:
- **Durable Execution**: Restate guarantees that your code runs to completion. If a transient failure occurs, Restate automatically retries from the point of failure and ensures that all compensations run.
- **Resilience built-in**: No need to manually track state or retry logic. Restate handles all persistence and compensation orchestration for you.
- **Code-first approach**: Define sagas using regular code, no DSLs. Track compensations in a list, and execute them on non-transient failures.

<img src={"/img/guides/sagas/saga_invocation.png"} alt="Sagas UI" />

## Example

Here is a typical travel booking workflow, where you book a flight, then rent a car, and finally book a hotel.
If any step fails for a non-transient reason (e.g. driver license not accepted, hotel full), we want to roll back the previous steps to keep the system consistent.

<img src={"/img/guides/sagas/saga_diagram.svg"} alt="Sagas example diagram" width={"550px"}/>

**Restate lets us implement this purely in code without any DSLs or extra infrastructure.**
- Wrap your business logic in a try-block, and throw a terminal error for cases where you want to compensate and finish.
- For each step you do in your try-block, add a compensation to a list.
- In the catch block, in case of a terminal error, you run the compensations in reverse order, and rethrow the error.

Note that for Golang we use `defer` to run the compensations at the end.

<CodeWithTabs groupId={"sdk"}>
        ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/src/sagas/booking_workflow.ts
        // collapse_prequel
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/typescript/patterns-use-cases/src/sagas/booking_workflow.ts
        ```
        ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/patterns-use-cases/src/main/java/my/example/sagas/BookingWorkflow.java
        // collapse_prequel
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/java/patterns-use-cases/src/main/java/my/example/sagas/BookingWorkflow.java
        ```
        ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/patterns-use-cases/src/main/kotlin/my/example/sagas/BookingWorkflow.kt
        // collapse_prequel
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/kotlin/patterns-use-cases/src/main/kotlin/my/example/sagas/BookingWorkflow.kt
        ```
        ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/patterns-use-cases/sagas/app.py
        // collapse_prequel
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/python/patterns-use-cases/sagas/app.py
        ```
        ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/patterns-use-cases/src/sagas/bookingworkflow.go
        // collapse_prequel
        CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/go/patterns-use-cases/src/sagas/bookingworkflow.go
        ```
</CodeWithTabs>

<Admonition type={"note"} title={"Example not available in your language?"}>
    This pattern is implementable with any of our SDKs. We are still working on translating all patterns to all SDK languages.
    If you need help with a specific language, please reach out to us via [Discord](https://discord.com/invite/skW3AZ6uGd) or [Slack](https://join.slack.com/t/restatecommunity/shared_invite/zt-2v9gl005c-WBpr167o5XJZI1l7HWKImA).
</Admonition>

## When to use Sagas

Restate automatically retries all transient failures, like network hiccups or temporary service outages. But not all failures are temporary.

For these failures, sagas are essential:

1. **Business logic requirements**:
    - Some failures are not transient but a business decision (e.g. “Hotel is full” or “Driver license not accepted”), retrying won't help.
    - In this case, you can throw a terminal error to stop the execution and trigger the compensations.


2. **User/system-initiated cancellations**:
    - If a user [cancels](/operate/invocation#cancelling-invocations) a long-running invocation (say via UI or CLI), this triggers a terminal error.
    - Restate will not retry.
    - Again, a saga can kick in to undo previous successful operations so the system doesn't end up in an inconsistent state (e.g., booking a hotel but not a car).


## Running the example

<Step stepLabel="1" title="Download the example">
    <CodeWithTabs groupId={"sdk"} className={"display-none"}>
        ```shell !!tabs ts
        restate example typescript-patterns-use-cases && cd typescript-patterns-use-cases
        ```
        ```shell !!tabs java
        restate example java-patterns-use-cases && cd java-patterns-use-cases
        ```
        ```shell !!tabs kotlin
        restate example kotlin-patterns-use-cases && cd kotlin-patterns-use-cases
        ```
        ```shell !!tabs python
        restate example python-patterns-use-cases && cd python-patterns-use-cases
        ```
        ```shell !!tabs go
        restate example go-patterns-use-cases && cd go-patterns-use-cases
        ```
    </CodeWithTabs>
</Step>
<Step stepLabel="2" title="Start the Restate Server">
    ```shell
    restate-server
    ```
</Step>
<Step stepLabel="3" title="Start the Service">
    <CodeWithTabs groupId={"sdk"} className={"display-none"}>
        ```shell !!tabs ts
        npx tsx watch ./src/sagas/booking_workflow.ts
        ```
        ```shell !!tabs java
        ./gradlew -PmainClass=my.example.sagas.BookingWorkflow run
        ```
        ```shell !!tabs kotlin
        ./gradlew -PmainClass=my.example.sagas.BookingWorkflowKt run
        ```
        ```shell !!tabs python
        python sagas/app.py
        ```
        ```shell !!tabs go
        go run ./src/sagas
        ```
    </CodeWithTabs>
</Step>
<Step stepLabel="4" title="Register the services">
    ```shell
    restate deployments register localhost:9080
    ```
</Step>
<Step stepLabel="5" title="Send a request">
    <CodeWithTabs groupId={"sdk"} className={"display-none"}>
        ```shell !!tabs ts
        curl localhost:8080/BookingWorkflow/run --json '{
                "flight": {
                    "flightId": "12345",
                    "passengerName": "John Doe"
                },
                    "car": {
                    "pickupLocation": "Airport",
                    "rentalDate": "2024-12-16"
                },
                    "hotel": {
                    "arrivalDate": "2024-12-16",
                    "departureDate": "2024-12-20"
                }
            }'
        ```
        ```shell !!tabs java
        curl localhost:8080/BookingWorkflow/run --json '{
                "flight": {
                    "flightId": "12345",
                    "passengerName": "John Doe"
                },
                    "car": {
                    "pickupLocation": "Airport",
                    "rentalDate": "2024-12-16"
                },
                    "hotel": {
                    "arrivalDate": "2024-12-16",
                    "departureDate": "2024-12-20"
                }
            }'
        ```
        ```shell !!tabs kotlin
        curl localhost:8080/BookingWorkflow/run --json '{
                "flight": {
                    "flightId": "12345",
                    "passengerName": "John Doe"
                },
                    "car": {
                    "pickupLocation": "Airport",
                    "rentalDate": "2024-12-16"
                },
                    "hotel": {
                    "arrivalDate": "2024-12-16",
                    "departureDate": "2024-12-20"
                }
            }'
        ```
        ```shell !!tabs python
        curl localhost:8080/BookingWorkflow/run --json '{
                "flight": {
                    "flightId": "12345",
                    "passengerName": "John Doe"
                },
                    "car": {
                    "pickupLocation": "Airport",
                    "rentalDate": "2024-12-16"
                },
                    "hotel": {
                    "arrivalDate": "2024-12-16",
                    "departureDate": "2024-12-20"
                }
            }'
        ```
        ```shell !!tabs go
        curl localhost:8080/BookingWorkflow/Run --json '{
                "flight": {
                    "flightId": "12345",
                    "passengerName": "John Doe"
                },
                    "car": {
                    "pickupLocation": "Airport",
                    "rentalDate": "2024-12-16"
                },
                    "hotel": {
                    "arrivalDate": "2024-12-16",
                    "departureDate": "2024-12-20"
                }
            }'
        ```
    </CodeWithTabs>

</Step>

<Step stepLabel="4" title="Check the UI or service logs">
    See in the Restate UI (`localhost:9070`) how all steps were executed, and how the compensations were triggered because the hotel was full.

    <img src={"/img/guides/sagas/saga_journal.png"} alt="Sagas UI" />
</Step>


## Advanced: Idempotency and compensations

Since sagas in Restate are implemented in user code, compensations are flexible and powerful, as long as they're idempotent: you can reset service state, call other services to undo prior actions, use `ctx.run` to delete rows or reverse database operations.

The example above uses the customer ID to guarantee idempotency, so that on retries it will not create duplicate bookings or rentals.
The example assumes that the API provider deduplicates the requests based on this ID.

Based on the API you are using, generating the idempotency key and registering the compensation can be done in different ways:

1. **Two-phase APIs**: First you _reserve_, then _confirm_ or _cancel_. Register the compensation after reservation, when you have the resource ID.
Reservations that are not confirmed, get automatically cancelled by the API after a timeout.

<CodeWithTabs groupId={"sdk"}>
    ```ts !!tabs TypeScript
    CODE_LOAD::ts/src/guides/sagas/booking_workflow.ts#twostep
    ```
    ```python !!tabs Python
    CODE_LOAD::python/src/guides/sagas/app.py#twostep
    ```
    ```java !!tabs Java
    CODE_LOAD::java/src/main/java/guides/sagas/BookingWorkflow.java#twostep
    ```
    ```kotlin !!tabs Kotlin
    CODE_LOAD::kotlin/src/main/kotlin/guides/sagas/BookingWorkflow.kt#twostep
    ```
    ```rust !!tabs Go
    CODE_LOAD::go/guides/sagas/bookingworkflow.go#twostep
    ```
</CodeWithTabs>


2. **One-shot APIs with idempotency key**: First, you generate an idempotency key and persist it in Restate. Then, you register the compensation (e.g. `refund`), and finally do the action (e.g. `charge`).
We need to register the compensation before doing the action, because there is a chance that the action succeeded but that we never got the confirmation.

<CodeWithTabs groupId={"sdk"}>
    ```ts !!tabs TypeScript
    CODE_LOAD::ts/src/guides/sagas/booking_workflow.ts#idempotency
    ```
    ```python !!tabs Python
    CODE_LOAD::python/src/guides/sagas/app.py#idempotency
    ```
    ```java !!tabs Java
    CODE_LOAD::java/src/main/java/guides/sagas/BookingWorkflow.java#idempotency
    ```
    ```kotlin !!tabs Kotlin
    CODE_LOAD::kotlin/src/main/kotlin/guides/sagas/BookingWorkflow.kt#idempotency
    ```
    ```rust !!tabs Go
    CODE_LOAD::go/guides/sagas/bookingworkflow.go#idempotency
    ```
</CodeWithTabs>

## Related resources

- [Error Handling guide](/guides/error-handling)
- Terminal errors: [Java](/develop/java/error-handling) / [TS](/develop/ts/error-handling) / [Go](/develop/go/error-handling) / [Python](/develop/python/error-handling)  / [Rust](https://docs.rs/restate-sdk/latest/restate_sdk/errors/index.html)
- [Cancellation of invocations](/operate/invocation#cancelling-invocations)
- [Blog post: Graceful cancellations: How to keep your application and workflow state consistent 💪](https://restate.dev/blog/graceful-cancellations-how-to-keep-your-application-and-workflow-state-consistent/)
- [Microservice orchestration use case page](/use-cases/microservice-orchestration)
