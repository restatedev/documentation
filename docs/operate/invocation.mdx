---
sidebar_position: 2
description: "Explore the different ways to invoke Restate services."
---

import Admonition from '@theme/Admonition';
import {CodeWithTabs} from "../../src/components/code/code";
import {Terminal} from "../../src/components/code/terminal";


# Managing Invocations

An invocation is a request to execute a handler that is part of either a service, or a virtual object.
There are different ways to invoke a handler: by sending a request to Restate [over HTTP](/invoke/http), by using the [SDK clients](/invoke/clients), or [via Kafka events](/invoke/kafka).

Once an invocation is created, you can inspect it, cancel it, and kill it via its Invocation Identifier:

## Invocation identifier

Restate assigns an identifier to every invocation, the Invocation ID. You can use this Invocation ID to inspect the invocation via the CLI, filter the logs, find traces, cancel it, etc.

The invocation ID starts with `inv_`, and can be found in the [UI](/develop/local_dev#restate-ui), the logs and traces (`restate.invocation.id`).
Or you can use the CLI to list the invocations and retrieve the ID from there:
<Terminal>
    ```shell !command
    restate invocations list
    ```

    ```shell !output
    # !focus
    ❯ [2024-04-16 15:28:20.237 +02:00] inv_1aiqX0vFEFNH0TF1pLRFBDFosQCCTAN1M5 [CartObject @ Mary]::addTicket
    Status:      backing-off  (4 minutes, 42 seconds and 653 ms. Retried 32 time(s). Next
    retry in in 9 seconds and 469 ms))
    Deployment:  dp_14LsPzGz9HBxXIeBoH5wYUh [required]
    Error:       [2024-04-16 15:33:01.930 +02:00]
    [500] Failing

    Showing 1/1 invocations. Query took 86.295361ms
    ```
</Terminal>

## Cancelling invocations

If an invocation takes too long to complete or is no longer of interest, you can cancel it.
Canceling an invocation allows it to free any resources it is holding and roll back any changes it has made so far.

You can cancel the invocation with [its ID](/operate/invocation?interface=curl#invocation-identifier) via the [UI](/develop/local_dev#restate-ui), the CLI or [Admin API](/category/admin-api):

<CodeWithTabs>
    ```shell !!tabs CLI
    restate invocations cancel inv_1gdJBtdVEcM942bjcDmb1c1khoaJe11Hbz
    ```
    ```shell !!tabs curl
    curl -X DELETE http://localhost:9070/invocations/inv_1gdJBtdVEcM942bjcDmb1c1khoaJe11Hbz
    ```
</CodeWithTabs>

With the CLI, you can also cancel invocations in bulk by specifying a target string exact match or prefix of the service and handler name, for example:
- `serviceName` or `serviceName/handler`
- `virtualObjectName` or `virtualObjectName/key` or `virtualObjectName/key/handler`
- `workflowName` or `workflowName/key` or `workflowName/key/handler`

For example, to cancel all invocations of the `CartObject/add` handler:
```shell
restate invocations cancel CartObject/add
```

<Admonition type="info" title={"Roll back consistently"}>
To roll back correctly, the handlers need to contain the necessary compensation logic.
This way, the service state stays consistent even in the presence of cancellations.
Have a look at [this guide](/guides/sagas) on how to implement compensation logic with Restate.
</Admonition>

<Admonition type="info" title={"Cancelling is non-blocking"}>
    Cancelling an invocation is a non-blocking operation. This means that the cancellation is not guaranteed to have completed when the API call returns. In some rare cases, cancellations will not have an effect. In these cases, users need to retry the operation.
</Admonition>

<details className={"grey-details"}>
    <summary>How does cancellation work?</summary>

    The cancellation process works recursively in the following way:
    First, Restate tries to cancel the leaves of the current invocation, i.e. interrupt ongoing sleeps and awakeables or try to cancel calls to other services.
    Once the leaves are canceled, a terminal error is thrown in the service handler at the point in the code that the invocation had reached.
    This allows the handler to run its specific compensation logic.
    The response of the handler will then be propagated back to its caller where it will continue with the cancellation process.

</details>


## Killing invocations

Sometimes Restate cannot cancel an invocation.
For example, when an endpoint is permanently unavailable, Restate can't invoke the handler to run its compensation logic, so it can't complete the cancellation.
For these cases, you can kill invocations.

You can kill an invocation via the [UI](/develop/local_dev#restate-ui), the CLI, or the [Admin API](/category/admin-api):

<CodeWithTabs>
    ```shell !!tabs CLI
    restate invocations cancel --kill inv_1gdJBtdVEcM942bjcDmb1c1khoaJe11Hbz
    ```
    ```shell !!tabs curl
    curl -X DELETE http://localhost:9070/invocations/inv_1gdJBtdVEcM942bjcDmb1c1khoaJe11Hbz?mode=kill
    ```
</CodeWithTabs>

Similar to the [cancellation query](/operate/invocation#cancelling-invocations), you can kill invocations in bulk by specifying a target string exact match or prefix of the service and handler name.


<Admonition type="warning">
    One-way calls and delayed calls will not be killed because they are detached from the originating call tree.
</Admonition>

<Admonition type="warning" title={"Watch out for inconsistency"}>
    Killing an invocation immediately stops every call in the call tree of the invocation.
    **Handlers will not execute compensation logic.**
    This might leave the service instance in an inconsistent state.
    Use it with caution and try fixing the invocation in other ways before resorting to killing it.
</Admonition>


## Managing Kafka subscriptions

Restate can trigger handlers via Kafka events.

- **Create subscriptions** for a handler on a topic via:
```bash
curl localhost:9070/subscriptions --json '{
        "source": "kafka://my-cluster/my-topic",
        "sink": "service://MyService/Handle",
        "options": {"auto.offset.reset": "earliest"}
    }'
```
The options field is optional and accepts any configuration parameter from [librdkafka configuration](https://github.com/confluentinc/librdkafka/blob/master/CONFIGURATION.md).
- **List** the current subscriptions via:
<Terminal>
    ```bash !command
    curl localhost:9070/subscriptions
    ```

    ```json !output
    {
        "subscriptions": [
            {
                "id": "sub_11XHoawrCiWtv8kzhEyGtsR",
                "source": "kafka://my-cluster/my-topic",
                "sink": "service://Greeter/greet",
                "options": {
                    "auto.offset.reset": "earliest",
                    "client.id": "restate",
                    "group.id": "sub_11XHoawrCiWtv8kzhEyGtsR"
                }
            }
        ]
    }
    ```

</Terminal>

The creation and listing of subscriptions returns an identifier.
- **Delete** a subscription with its identifier (starting with `sub_`) via:
```bash
curl -X DELETE localhost:9070/subscriptions/sub_11XHoawrCiWtv8kzhEyGtsR
```

<Admonition type="info">
    When you delete a subscription, Restate stops the consumer group associated to it. Any messages that were already enqueued by Restate will still be processed.
</Admonition>
