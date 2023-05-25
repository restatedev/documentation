---
sidebar_position: 4
---

# Manage invocations

Restate offers several tools to manage the ongoing invocations.

## Service invocation identifier

Every invocation to a service gets a unique identifier assigned by Restate, called _Service invocation identifier_. You can use this identifier to filter your structured logs, find traces, and execute some management operations such as cancelling an invocation.

You can find this identifier in the runtime logs and OpenTelementry traces by looking for the `restate.invocation.sid`, for example:

```log {7}
2023-05-19T15:02:28.656467Z INFO restate_invoker::invocation_task
  Executing invocation at service endpoint
    http.url: http://localhost:8080/invoke/coordinator.Coordinator/Sleep
  in restate_invoker::invocation_task::invoker_invocation_task
    rpc.system: "restate"
    rpc.service: coordinator.Coordinator
    restate.invocation.sid: coordinator.Coordinator-AYguNHjOdG+gM+TY9k1qeA==-01882e3478ce79579999ecabfd7f4129
```

:::note

The service invocation identifier is opaque and its current format should not be relied on, as it might change in future Restate versions.

:::

## Cancel an invocation

:::caution

At the moment gracefully cancelling an invocation is not supported, It will be supported in future Restate releases.

:::

## Kill an invocation

When something goes wrong during the execution of an invocation, Restate will by default retry until it can make progress again.
For example, if there's a network partitioning, Restate will continue retrying until it can reach the endpoint and make progress.

There are some cases where it is impossible for an invocation to make progress.
A good example is when your code runs a non deterministic action: If the invocation is suspended and re-scheduled afterwards, the replay of the invocation might lead to a different code path, generating an invalid journal and failing the invocation indefinitely.
In such cases, you can request Restate to kill the invocation, aborting its execution as soon as possible.
If the invocation is ongoing, killing the invocation **will not** rollback its progress.

:::danger

Killing an invocation might leave the service instance in an inconsistent state, just like how killing a process in your operating system may cause the open files to become corrupted. Use it with caution and try to fix the invocation in other ways before resorting to killing it.

:::

To kill an invocation, send the following request to the Restate meta endpoint:

```shell
$ curl -X DELETE <META_ENDPOINT>/invocations -H 'content-type: application/json' -d '{"sid": "<SERVICE_INVOCATION_IDENTIFIER>"}'
```

For example:

```shell
$ curl -X DELETE http://localhost:8081/invocations -H 'content-type: application/json' -d '{"sid": "coordinator.Coordinator-AYguNHjOdG+gM+TY9k1qeA==-01882e3478ce79579999ecabfd7f4129"}'
```

For more details on the API, refer to the [Meta operational API docs](./meta-rest-api.mdx#tag/invocation/operation/cancel_invocation).
