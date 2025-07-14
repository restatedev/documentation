---
sidebar_position: 1
description: "Invoke handlers over HTTP."
---

import Admonition from '@theme/Admonition';
import {CodeWithTabs} from "../../src/components/code/code";
import {TextAndCode} from "../../src/components/code/code/text-and-code";
import {Terminal} from "../../src/components/code/terminal";

# HTTP

You can invoke handlers over HTTP with or without waiting for a response, and with or without an idempotency key.

<Admonition type="info">
    Make sure to first [register the handler](/operate/registration) you want to invoke.
</Admonition>

<Admonition type="tip" title="Invoke via the UI Playground">
    The [UI](/develop/local_dev#restate-ui) helps you with invoking your services.
    Open the UI at port 9070, register your service, click on the service, open the playground, and invoke your handlers from there.
</Admonition>

## Request-response calls over HTTP
You can invoke services over HTTP 1.1 or higher.
Request/response bodies should be encoded as JSON.

<TextAndCode>
    ### Invoking Services
    Invoke `myHandler` of `myService` as follows:

    ```shell !result
    curl localhost:8080/MyService/myHandler --json '{"name": "Mary", "age": 25}'
    ```

</TextAndCode>
<TextAndCode>
    ### Invoking Virtual Objects
    Invoke `myHandler` of `myVirtualObject` for `myKey` as follows:

    ```shell !result
    curl localhost:8080/MyVirtualObject/myObjectKey/myHandler --json '{"name": "Mary", "age": 25}'
    ```

</TextAndCode>
<TextAndCode>
    ### Invoke Workflows
    Call the `run` handler of the `MyWorkflow` as follows:

    ```shell !result
    curl localhost:8080/MyWorkflow/myWorkflowId/run --json '{"name": "Mary", "age": 25}'
    ```

</TextAndCode>


Follow the same pattern for calling the other handlers of the workflow.

<Admonition type="info" title="Restate as proxy">
    Note that all invocations go first via the Restate Server. The server then forwards the request to the appropriate service.
    Therefore, `localhost:8080` refers to ingress port of the Restate Server, not the service instance.
</Admonition>

## Sending a message over HTTP
If you do not want to wait for the response, you can also send a message by adding `/send` to the URL path:

<Terminal>
    ```shell !command
    curl localhost:8080/MyService/myHandler/send --json '{"name": "Mary", "age": 25}'
    ```

    ```json !output
    {"invocationId":"inv_1aiqX0vFEFNH1Umgre58JiCLgHfTtztYK5","status":"Accepted"}
    ```
</Terminal>

The response contains the [Invocation ID](/operate/invocation#invocation-identifier).
You can use this identifier [to cancel](/operate/invocation#cancelling-invocations) or [kill the invocation](/operate/invocation#killing-invocations).

## Sending a delayed message over HTTP

You can **delay the message** by adding a delay request parameter in ISO8601 notation or using [humantime format](https://docs.rs/humantime/latest/humantime/):

<CodeWithTabs>

    ```shell !!tabs humantime
    curl localhost:8080/MyService/myHandler/send?delay=10s --json '{"name": "Mary", "age": 25}'
    ```

    ```shell !!tabs ISO8601
    curl localhost:8080/MyService/myHandler/send?delay=PT10S --json '{"name": "Mary", "age": 25}'
    ```

</CodeWithTabs>

<Admonition type="note" title={"Not supported for workflows"}>
    You cannot yet use this feature for workflows.
    Workflows can only be scheduled with a delay from within another Restate handler ([TS](/develop/ts/service-communication#delayed-calls)/[Java/Kotlin](/develop/java/service-communication#delayed-calls)).
</Admonition>


## Invoke a handler idempotently

You can send requests to Restate providing an idempotency key, through the [`Idempotency-Key` header](https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/):

```shell
curl localhost:8080/MyService/myHandler \
# !focus
  -H 'idempotency-key: ad5472esg4dsg525dssdfa5loi' \
  --json '{"name": "Mary", "age": 25}'
```

After the invocation completes, Restate persists the response for a retention period of one day (24 hours).
If you re-invoke the service with the same idempotency key within 24 hours, Restate sends back the same response and doesn't re-execute the request to the service.

<Admonition type="tip" title={"Make any service call idempotent with Restate"}>
    With Restate and an idempotency key, you can make any service call idempotent, without any extra code or setup.
    This is a very powerful feature to ensure that your system stays consistent and doesn't perform the same operation multiple times.
</Admonition>

<details className={"grey-details"}>
    <summary> Tuning retention time</summary>

    You can tune the retention time on a service-level by using the [Admin API](/adminapi/modify-service)):
    ```shell
    curl -X PATCH localhost:9070/services/MyService --json '{"idempotency_retention": "2days"}'
    ```
    The retention time is in [humantime format](https://docs.rs/humantime/latest/humantime/).
</details>


## Retrieve result of invocations and workflows

Restate allows you to retrieve the result of workflows and invocations with an idempotency key.
There are two options:
- To **attach** to an invocation or workflow and wait for it to finish, use `/attach`.
- To **peek at the output** of an invocation or workflow, use `/output`. This will return:
  - `{"message":"not ready"}` for ongoing workflows
  - The result for finished workflows
  - `{"message":"not found"}` for non-existing workflows

You can attach to a service/object invocation only if the invocation used an idempotency key:

```shell
# Via invocation ID
curl localhost:8080/restate/invocation/myInvocationId/attach
curl localhost:8080/restate/invocation/myInvocationId/output

# For Services, via idempotency key
curl localhost:8080/restate/invocation/MyService/myHandler/myIdempotencyKey/attach
curl localhost:8080/restate/invocation/MyService/myHandler/myIdempotencyKey/output

# For Virtual Objects, via idempotency key
curl localhost:8080/restate/invocation/myObject/myKey/myHandler/myIdempotencyKey/attach
curl localhost:8080/restate/invocation/myObject/myKey/myHandler/myIdempotencyKey/output

# For Workflows, with the Workflow ID
curl localhost:8080/restate/workflow/MyWorkflow/myWorkflowId/attach
curl localhost:8080/restate/workflow/MyWorkflow/myWorkflowId/output
```

## OpenAPI support

Restate exposes for every service an OpenAPI 3.1 definition, to get it:

```shell
curl localhost:9070/services/MyService/openapi > MyService_openapi.json
```

You can use this definition with any OpenAPI 3.1 compliant tool to generate clients for your service, such as [openapi-generator](https://openapi-generator.tech/).

Depending on the SDKs, the rich input/output JSON schemas are included as well. At the moment, rich schemas are supported for:
- [TypeScript SDK with Zod schemas](/develop/ts/serialization#zod-schemas)
- [Python SDK with Pydantic](/develop/python/serialization#pydantic) models
- Java and Kotlin SDK
