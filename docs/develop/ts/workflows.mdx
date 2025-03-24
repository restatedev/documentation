---
sidebar_position: 7
description: "Workflows and what you can do with them."
---

import Admonition from '@theme/Admonition';
import {TextAndCode} from "../../../src/components/code/code/text-and-code";
import {Scrollycoding} from "../../../src/components/code/scrollycoding";

# Workflows

[Workflows](/concepts/services#workflows) are a sequence of steps that gets executed durably.
A workflow can be seen as a special type of [Virtual Object](/concepts/services#virtual-objects) with the following characteristics:

- Each [workflow definition](/develop/ts/overview#workflows) has a **`run` handler** that implements the workflow logic.
  - The `run` handler **executes exactly one time** for each workflow instance (object / key).
  - The `run` handler executes a set of **durable steps/activities**. These can either be:
    - Inline activities: for example a [run block](/develop/ts/journaling-results#journaled-actions) or [sleep](/develop/ts/durable-timers)
    - [Calls to other handlers](/develop/ts/service-communication) implementing the activities
- You can **submit a workflow** in the same way as any handler invocation (via SDK clients or Restate services, over HTTP or Kafka).
- A [workflow definition](/develop/ts/overview#workflows) can implement other handlers that can be called multiple times, and can **interact with the workflow**:
  - [Query](/develop/ts/workflows#implementing-workflows) the workflow (get information out of it) by getting K/V state or awaiting promises that are resolved by the workflow.
  - [Signal](/develop/ts/workflows#implementing-workflows) the workflow (send information to it) by resolving promises that the workflow waits on.
- Workflows have access to the `WorkflowContext` and `WorkflowSharedContext`, giving them some extra functionality, for example [Durable Promises](/develop/ts/workflows#implementing-workflows) to signal workflows.
- The K/V state of the workflow is isolated to the workflow execution, and can only be mutated by the `run` handler.


<Admonition type="note" title={"Workflow retention time"}>
    The retention time of a workflow execution is 24 hours after the finishing of the `run` handler.
    After this timeout any [K/V state](/develop/ts/state) is cleared, the workflow's shared handlers cannot be called anymore, and the [Durable Promises](/develop/ts/workflows#signaling-workflows) are discarded.
    The retention time can be configured via the [UI](/develop/local_dev#restate-ui) or [Admin API](/adminapi/modify-service) per Workflow definition by setting `workflow_completion_retention`.
</Admonition>

## Implementing workflows
Have a look at the code example to get a better understanding of how workflows are implemented:

<Scrollycoding>

    ### !!steps The run handler

    Every workflow needs a `run` handler.
    This handler has access to the same SDK features as Service and Virtual Object handlers.
    For example, use [`ctx.run`](/develop/ts/journaling-results#journaled-actions) to log intermediate results in Restate and avoid re-execution on replay.
    Or call other handlers to execute activities.

    ```ts !
    CODE_LOAD::ts/src/develop/workflows/signup.ts?1
    ```

    ### !!steps Querying workflows

    Similar to Virtual Objects, you can retrieve the [K/V state](/develop/ts/state#retrieving-state) of workflows via the other handlers defined in the workflow definition,
    For example, here we expose the status of the workflow to external clients.
    Every workflow execution can be seen as a new object, so the state is isolated to a single workflow execution.
    The state can only be mutated by the `run` handler of the workflow. The other handlers can only read the state.

    ```ts !
    CODE_LOAD::ts/src/develop/workflows/signup.ts?2
    ```

    ### !!steps Signaling workflows

    You can use Durable Promises to interact with your running workflows: to let the workflow block until an event occurs, or to send a signal / information into or out of a running workflow.
    These promises are durable and distributed, meaning they survive crashes and can be resolved or rejected by any handler in the workflow.

    Do the following:
    1. Create a promise that is durable and distributed in the `run` handler.
    2. Resolve or reject the promise in another handler in the workflow. This can be done at most one time.

    You can also use this pattern in reverse and let the `run` handler resolve promises that other handlers are waiting on.
    For example, the `run` handler could resolve a promise when it finishes a step of the workflow, so that other handlers can request whether this step has been completed.


    ```ts !
    CODE_LOAD::ts/src/develop/workflows/signup.ts?3
    ```

    ### !!steps Serving and registering workflows

    You serve workflows in the same way as Services and Virtual Objects: by binding them to an [HTTP endpoint](/develop/ts/serving) or [on AWS Lambda,](/develop/ts/serving#creating-a-lambda-handler) [Deno, Bun, or Cloudflare Workers](/develop/ts/serving#creating-a-fetch-handler).
    Make sure you [register the endpoint](/operate/registration) in Restate before invoking it.

    ```ts !
    CODE_LOAD::ts/src/develop/workflows/signup.ts?4
    ```
</Scrollycoding>

<Admonition type={"tip"} title={"Workflows-as-code with Restate"}>
    [Check out some examples of workflows-as-code with Restate on the use case page](/use-cases/workflows).
</Admonition>

## Submitting workflows with SDK clients
<TextAndCode>
    [**Submit**](/develop/ts/clients):
    This returns a handle to the workflow once has been registered in Restate.
    You can only submit once per workflow ID (here `"someone"`).

    ```ts !result
    CODE_LOAD::ts/src/develop/workflows/submit.ts#submit
    ```

</TextAndCode>

<TextAndCode>
    [**Query/signal**](/develop/ts/clients):
    Call the other handlers of the workflow in the same way as for Virtual Object handlers.
    For now, you can only do request-response calls.

    ```ts !result
    CODE_LOAD::ts/src/develop/workflows/submit.ts#query
    ```
</TextAndCode>

<TextAndCode>
    [**Attach/peek**](/develop/ts/clients#retrieve-result-of-invocations-and-workflows):
    This lets you retrieve the result of a workflow or check if it's finished.

    ```ts !result
    CODE_LOAD::ts/src/develop/workflows/submit.ts#attach
    ```
</TextAndCode>

## Submitting workflows from a Restate service
<TextAndCode>
    [**Submit/query/signal**](/develop/ts/service-communication):
    Call the workflow handlers in the same way as for Services and Virtual Objects.
    This returns the result of the workflow/handler once it has finished.
    Use the `ctx.workflowSendClient` to call the handler without waiting for the result.
    You can only call the `run` handler (submit) once per workflow ID (here `"someone"`).

    ```ts !result
    CODE_LOAD::ts/src/develop/workflows/service.ts
    ```
</TextAndCode>

## Submitting workflows over HTTP
<TextAndCode>
    [**Submit/query/signal**](/invoke/http#request-response-calls-over-http):
    Call any handler of the workflow in the same way as for Services and Virtual Objects.
    This returns the result of the handler once it has finished.
    Add `/send` to the path for one-way calls.
    You can only call the `run` handler once per workflow ID (here `"someone"`).

    ```shell !result
    curl localhost:8080/signup/someone/run --json '{"email": "someone@restate.dev"}'
    ```
</TextAndCode>

<TextAndCode>
    [**Attach/peek**](/invoke/http#retrieve-result-of-invocations-and-workflows):
    This lets you retrieve the result of a workflow or check if it's finished.

    ```shell !result
    curl localhost:8080/restate/workflow/signup/someone/attach
    curl localhost:8080/restate/workflow/signup/someone/output
    ```

</TextAndCode>


## Inspecting workflows

You can inspect your workflows via the [UI](/develop/local_dev#restate-ui) or CLI:
- Inspect the progress of a workflow by looking at the invocation journal in the `Invocations` tab of the [UI](/develop/local_dev#restate-ui) or via the [CLI](/operate/introspection#inspecting-the-invocation-journal)
- Inspect the K/V state of a workflow in the `State` tab of the [UI](/develop/local_dev#restate-ui) or via the [CLI](/operate/introspection#inspecting-application-state)





