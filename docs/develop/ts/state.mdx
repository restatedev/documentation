---
sidebar_position: 4
description: "Keep K/V state in Restate."
---

import Admonition from '@theme/Admonition';

# State
You can store key-value state in Restate.
Restate makes sure the state is consistent with the processing of the code execution.

**This feature is only available for Virtual Objects and Workflows:**
- For **Virtual Objects**, the state is isolated per Virtual Object and lives forever (across invocations for that object).
- For **Workflows**, you can think of it as if every workflow execution is a new object. So the state is isolated to a single workflow execution. The state can only be mutated by the `run` handler of the workflow. The other handlers can only read the state.

<Admonition type="info" title="Command-line introspection">
    You can inspect and edit the K/V state stored in Restate via `psql` and the CLI.
    Have a look at the [introspection docs](/operate/introspection#inspecting-application-state) for more information.
</Admonition>

<Admonition type="info" title={"Serializing state"}>
    The Typescript SDK uses the built-in [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) support to perform (de)serialization.
</Admonition>

### Listing state keys
For a single Virtual Object, you can list all the state keys that have entries in the state store via:

```typescript
CODE_LOAD::ts/src/develop/state.ts#statekeys
```

### Retrieving state
Use `ctx.get` to retrieve the state for a key:

```typescript
CODE_LOAD::ts/src/develop/state.ts#get
```

The return value is `null` if no value was stored.

### Setting state
Use `ctx.set` to set a new value for a key:

```typescript
CODE_LOAD::ts/src/develop/state.ts#set
```

### Clearing state
Use `ctx.clear` to delete the value of a key:

```typescript
CODE_LOAD::ts/src/develop/state.ts#clear
```

### Clearing all state

Delete all the state stored in Restate for a Virtual Object via:

```typescript
CODE_LOAD::ts/src/develop/state.ts#clear_all
```
