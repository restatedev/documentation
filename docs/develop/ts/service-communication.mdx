---
sidebar_position: 2
description: "Call other services from your handler."
---

import Admonition from '@theme/Admonition';

# Service Communication

A handler can call another handler and wait for the response (request-response), or it can send a message without waiting for the response.

<Admonition type="note" title="Exporting the service definition">
Make sure you export the service definition of the service you want to call, as we did in the [service example on the overview page](/develop/ts/overview#services):

```typescript
CODE_LOAD::ts/src/develop/my_service.ts#api_export
```
Import this service definition in the service handler that wants to call it.
</Admonition>

## Request-response calls

Request-response calls are requests where the client waits for the response.

To call a Service:

```ts
CODE_LOAD::ts/src/develop/service_communication.ts#request_response_service
```

To call a Virtual Object:

```ts
CODE_LOAD::ts/src/develop/service_communication.ts#request_response_object
```

To call a Workflow:

```ts
CODE_LOAD::ts/src/develop/service_communication.ts#request_response_workflow
```

1. **Create a service client** and supply the service definition of the service you want to call.
   For Virtual Objects, you also need to supply the key of the Virtual Object you want to call, here `"Mary"`.
   For Workflows, you need to supply a workflow ID that is unique per workflow execution.
2. **Specify the handler** you want to call and supply the request.
3. **Await** the call to retrieve the response.

Or with the generic clients, if you don't have access to the service definition or want to specify the service and handler with strings (e.g. to implement [workflow interpreters](https://github.com/restatedev/examples/tree/main/typescript/end-to-end-applications/ai-image-workflows)):
```ts
CODE_LOAD::ts/src/develop/service_communication.ts#generic_call
```

<Admonition type="tip" title="No need for manual retry logic">
    These calls are proxied by Restate, and get logged in the journal.
    In case of failures, Restate takes care of retries.
</Admonition>

<Admonition type="note" title="Workflow retention time">
    Once the `run` handler of the workflow has finished, the other handlers can still be called up to the retention time of the workflow, by default 24 hours.
    This can be configured via the UI or [Admin API](/adminapi/modify-service) per Workflow definition by setting `workflow_completion_retention`.
</Admonition>

<Admonition type={"caution"} title={"Deadlocks with Virtual Objects"}>
    Request-response calls to Virtual Objects can lead to deadlocks, in which the Virtual Object remains locked and can't process any more requests.
    Some example cases:
    - Cross deadlock between Virtual Object A and B: A calls B, and B calls A, both using same keys.
    - Cyclical deadlock: A calls B, and B calls C, and C calls A again.

    In this situation, you can use the UI or CLI to unblock the Virtual Object manually by [cancelling invocations](/operate/invocation#cancelling-invocations).
</Admonition>

## Sending messages

Handlers can send messages (a.k.a. one-way calls, or fire-and-forget calls), as follows:

To a Service:

```ts
CODE_LOAD::ts/src/develop/service_communication.ts#one_way_service
```

To a Virtual Object:

```ts
CODE_LOAD::ts/src/develop/service_communication.ts#one_way_object
```

To a Workflow:

```ts
CODE_LOAD::ts/src/develop/service_communication.ts#one_way_workflow
```

Or with the generic clients, if you don't have access to the service definition or want to specify the service and handler with strings (e.g. to implement [workflow interpreters](https://github.com/restatedev/examples/tree/main/typescript/end-to-end-applications/ai-image-workflows)):
```ts
CODE_LOAD::ts/src/develop/service_communication.ts#generic_send
```

<Admonition type="tip" title="No need for message queues">
    Without Restate, you would usually put a message queue in between the two services, to guarantee the message delivery.
    Restate eliminates the need for a message queue because Restate durably logs the request and makes sure it gets executed.
</Admonition>

## Delayed calls

A delayed call is a one-way call that gets executed after a specified delay.

To schedule a delayed call, send a message with a delay parameter, as follows:

To a Service:

```ts
CODE_LOAD::ts/src/develop/service_communication.ts#delayed_service
```

To a Virtual Object:

```ts
CODE_LOAD::ts/src/develop/service_communication.ts#delayed_object
```

To a Workflow:

```ts
CODE_LOAD::ts/src/develop/service_communication.ts#delayed_workflow
```

Or with the generic clients, if you don't have access to the service definition or want to specify the service and handler with strings (e.g. to implement [workflow interpreters](https://github.com/restatedev/examples/tree/main/typescript/end-to-end-applications/ai-image-workflows)):

```ts
CODE_LOAD::ts/src/develop/service_communication.ts#generic_delayed
```

<Admonition type="tip" title="Scheduling async tasks">
    You can also use this functionality to schedule async tasks.
    Restate will make sure the task gets executed at the desired time.
</Admonition>

<Admonition type="note" title="Ordering guarantees in Virtual Objects">
    Invocations to a Virtual Object are executed serially.
    Invocations will execute in the same order in which they arrive at Restate.
    For example, assume a handler calls the same Virtual Object twice:

    ```typescript
    CODE_LOAD::ts/src/develop/service_communication.ts#ordering
    ```

    It is guaranteed that call A will execute before call B.
    It is not guaranteed though that call B will be executed immediately after call A, as invocations coming from other handlers/sources, could interleave these two calls.
</Admonition>

## Using an idempotency key

While service-to-service communication provides *exactly-once semantics*, it won't guarantee that two separate services, or a service and an external client, won't submit the same logical request twice.
To get this additional guarantee, you can provide an [idempotency key](https://docs.restate.dev/develop/ts/clients/#invoke-a-handler-idempotently) on any request using `restate.rpc.opts`/`restate.rpc.sendOpts`:

```ts
CODE_LOAD::ts/src/develop/service_communication.ts#idempotency_key
```

## Re-attach to an invocation

You can re-attach to any request using `ctx.attach`:

```ts
CODE_LOAD::ts/src/develop/service_communication.ts#attach
```

<Admonition type="tip" title="Best used with idempotency key">
    Attaching to requests with an idempotency key, lets you wait for the request to finish and retrieve its response. Restate persists the response to these requests for the configured retention time.

    For requests without an idempotency key, you will not be able to retrieve the result, only wait for them to complete.
</Admonition>

## Cancel an invocation

You can [cancel an invocation](https://docs.restate.dev/operate/invocation/#cancelling-invocations) using `ctx.cancel`:

```ts
CODE_LOAD::ts/src/develop/service_communication.ts#cancel
```

Have a look at our [sagas guide](/guides/sagas) to learn more about cancellations and how to handle them.
