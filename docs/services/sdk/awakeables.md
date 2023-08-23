---
sidebar_position: 6
description: "Pause invocations while waiting for an external task completion."
---

# Awakeables

Awakeables pause an invocation while waiting for an external process to complete a task. 
This works as follows:
- You generate an ID with the Restate SDK. This is a simple string object.
- You send the ID to the external process, in any preferred way (e.g. over Kafka, via HTTP,...).
- The external process executes the task and then returns the ID to Restate, optionally together with a payload. 
- Once the ID has been returned to the service, the invocation resumes.

The SDK deserializes the payload with `JSON.parse(result.toString()) as T`.

You can use this pattern to execute tasks in non-Restate services, and retrieve the result. This design pattern is also referred to as the callback (task token) pattern.

While waiting for the ID to be returned, Restate suspends the invocation to free up resources for other invocations.
This feature is particularly beneficial for AWS Lambda deployments.
When the invocation is suspended, its costs are reduced to zero.

:::caution
While waiting for an awakeable ID to be returned, singleton services and keyed services (for that single key) will not process other incoming invocations.
They block until the invocation is finished, so until the awakeable ID is returned and the rest of the code has been executed. 
:::

## Using awakeables

You can use awakeables in the SDK by doing the following:

```typescript
// 1. Generate the ID
const awakeable = ctx.awakeable<string>();
const id = awakeable.id

// 2. Send the ID to some external system
// ... here goes your custom code to send the ID ...

// 3. Wait for the ID to returned and retrieve the payload
const result = await awakeable.promise;
```

# Completing awakeables

The external process that received the ID, needs to deliver it back to Restate when the task is done.

If the external process is another Restate service, then you can use the SDK to complete the awakeable (= to send the ID back).
Use the awakeable ID that you received from the other service, and do the following:

```typescript
ctx.completeAwakeable(id, "hello");
```

The SDK serializes the payload with `Buffer.from(JSON.stringify(payload))` and deserializes it in the receiving service with `JSON.parse(result.toString()) as T`.

In the current release, only Restate services can complete awakeables.
If you want to enable an external system to awaken an invocation,
you must introduce a Restate service in the middle to translate the incoming external request and trigger the completion of the awakeable.
In next versions, we will improve this feature to work better with external non-Restate systems.
Have a look at [the `NotifierService` of the food ordering example](https://github.com/restatedev/examples/tree/main/typescript/food-ordering) to see an example of this pattern.
