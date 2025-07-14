---
sidebar_position: 6
description: "Pause invocations until external completion."
---

import {TextAndCode} from "../../../src/components/code/code/text-and-code";
import Admonition from '@theme/Admonition';

# Awakeables

Awakeables pause an invocation while waiting for another process to complete a task.
You can use this pattern to let a handler execute a task somewhere else and retrieve the result.
This pattern is also known as the callback (task token) pattern.

## Creating awakeables

1. **Create an awakeable**. This contains a String identifier and a Promise.
2. **Trigger a task/process** and attaches the awakeable ID  (e.g. over Kafka, via HTTP,...).
For example, send an HTTP request to a service that executes the task, and attach the ID to the payload.
You use `ctx.run` to avoid re-triggering the task on retries.
3. **Wait** until the other process has executed the task.
The handler **receives the payload and resumes**.

```ts
CODE_LOAD::ts/src/develop/awakeable.ts
```

## Completing awakeables

The external process completes the awakeable by either resolving it with an optional payload or by rejecting it
with its ID and a reason for the failure. This throws [a terminal error](/develop/ts/error-handling) in the waiting handler.

<TextAndCode>
    - Resolving over HTTP with its ID and an optional payload:

    ```shell !result
    curl localhost:8080/restate/awakeables/prom_1PePOqp/resolve --json '{"hello": "world"}'
    ```
</TextAndCode>
<TextAndCode>
    - Rejecting over HTTP with its ID and a reason:

    ```shell !result
    curl localhost:8080/restate/awakeables/prom_1PePOqp/reject
        -H 'content-type: text/plain' \
        -d 'Very bad error!'
    ```
</TextAndCode>
<TextAndCode>
    - Resolving via the SDK with its ID and an optional payload:

    ```ts !result
    CODE_LOAD::ts/src/develop/awakeable.ts#resolve
    ```
</TextAndCode>
<TextAndCode>
    - Rejecting via the SDK with its ID and a reason:

    ```ts !result
    CODE_LOAD::ts/src/develop/awakeable.ts#reject
    ```
</TextAndCode>

<Admonition type="info" title={"Payload serialization"}>
    By default, Typescript SDK uses the built-in [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) support to perform (de)serialization.
    Consult the [serialization docs](/develop/ts/serialization) for other options.
</Admonition>

<Admonition type="tip" title="Cost savings on FaaS">
    When running on Function-as-a-Service platforms, such as AWS Lambda, Restate suspends the handler while waiting for the awakeable to be completed.
    Since you only pay for the time that the handler is actually running, your don't pay while waiting for the external process to return.
</Admonition>

<Admonition type="info" title="Awaiting awakeables in Virtual Objects">
    Virtual Objects only process a single invocation at a time, so the Virtual Object will be blocked while waiting on the awakeable to be resolved.
</Admonition>
