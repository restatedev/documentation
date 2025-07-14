---
sidebar_position: 1
description: "Services, Virtual Objects, and Workflows."
---

import Admonition from '@theme/Admonition';

# Overview

The Restate TypeScript SDK is open source and can be found on GitHub: ([sdk-typescript repo](https://github.com/restatedev/sdk-typescript)).

<Admonition type="tip" icon="🚀" title="Set up your project in seconds">
Have a look at the [TypeScript Quickstart](/get_started/quickstart?sdk=ts)!
</Admonition>

<Admonition type="note" title="Prerequisites">
- [NodeJS](https://nodejs.org/en/) >= v18.17.1 or [Bun](https://bun.sh/docs/installation) or [Deno](https://deno.land/#installation)
- [npm CLI](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) >= 9.6.7
</Admonition>

Add the `@restatedev/restate-sdk` dependency to your project to start developing Restate services.

The Restate SDK lets you implement handlers.
Handlers can either be part of a [Service](/concepts/services#services-1), a [Virtual Object](/concepts/services#virtual-objects), or a [Workflow](/concepts/services#workflows). Let's have a look at how to define them.

## Services

[Services](/concepts/services#services-1) and their handlers are defined as follows:

```typescript
// collapse_prequel
CODE_LOAD::ts/src/develop/my_service.ts
```

- Specify that you want to create a Service via `restate.service`.
- Specify the service name. The service can then be called at `<RESTATE_INGRESS_URL>/MyService/myHandler`.
- The service definition contains a list of handlers.
  Each handler has a name (`myHandler`) and a function that implements the handler logic.
  The function has the Restate Context as its first argument.
  Within the handler, you use the `Context` to interact with Restate.
  The SDK stores the actions you do on the context in the Restate journal to make them durable.
- The handler input parameter (at most one) and return type are optional and can be of any type, as long as they can be serialized as [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON). Check out the serialization docs for [Zod support](/develop/ts/serialization).
- Export the service definition `MyService` so that it can be used by other handlers to call the service (see [Service Communication](/develop/ts/service-communication)).
- Finally, create an endpoint and bind the service(s) to the Restate endpoint. Listen on the specified port (default `9080`) for connections and requests.

## Virtual Objects

[Virtual Objects](/concepts/services#virtual-objects) and their handlers are defined similarly to services, with the following differences:

```typescript
// collapse_prequel
CODE_LOAD::ts/src/develop/my_virtual_object.ts
```

- Specify that you want to create a Virtual Object via `restate.object`.
- The first argument of each handler must be the `ObjectContext` parameter.
Handlers with the `ObjectContext` parameter can write to the K/V state store.
Only one handler can be active at a time per object, to ensure consistency.
- You can retrieve the key of the object you are in via `ctx.key`.
- If you want to have a handler that executes concurrently to the others and doesn't have write access to the K/V state, wrap the handler in `handlers.object.shared` and use the `ObjectSharedContext`.
You can use these handlers, for example, to read K/V state and expose it to the outside world, or to interact with the blocking handler (e.g. resolve awakeables).

## Workflows

[Workflows](/concepts/services#workflows) are a special type of Virtual Objects, their definition is similar but with the following differences:

```typescript
// collapse_prequel
CODE_LOAD::ts/src/develop/workflow.ts
```

- Create the workflow with `restate.workflow`.
- Every workflow implementation needs to have a handler called `run` that implements the workflow logic.
This handler uses the `WorkflowContext` to interact with the SDK.
- The `run` handler executes exactly one time per workflow execution/object. You can retrieve the ID of the workflow execution via `ctx.key`.
- The `run` handler executes a set of steps/activities. These can be inlined SDK actions (for example [run block](/develop/ts/journaling-results#journaled-actions) or [sleep](/develop/ts/durable-timers)), or abstracted into calls to other handlers.
- The other handlers of the workflow are used to interact with the workflow: [either query it, or signal it](/develop/ts/workflows#implementing-workflows).
They use the `WorkflowSharedContext` to interact with the SDK.
These handlers can run concurrently with the `run` handler and can still be called after the `run` handler has finished.
- [Have a look at the workflow docs to learn more.](/develop/ts/workflows)


Now that you have a high-level idea of what a Restate service might look like, let's have a look at what the Restate Context allows you to do.
