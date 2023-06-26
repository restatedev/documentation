---
sidebar_position: 5
description: "Find out how Restate services can send requests to each other."
---

# Service communication
A Restate service can call another service either one-way or with waiting for the response (request-response).

## Request-response calls
Request-response calls are requests where the client waits for the response.
Restate services can perform request-response calls in the same way as they would without Restate,
by using the service client provided in the generated Proto files.
The Restate SDK hooks into these calls and ensures that their execution is logged in the execution log.

Let's assume we have a Greeter service running next to the service we are currently developing.
This Greeter service has a method called `Greet` that takes a `Request` as input, containing a field name as a string.
To make request-response calls to the Greeter service, do the following:

```typescript
const client = new GreeterClientImpl(restateContext);
const greeting = await client.greet(
  Request.create({ name: "Pete" })
);
```

## One-way calls
To make a one-way call, where the client does not wait for a response, use a similar syntax to request-response calls. Create a client using the one provided by Protobuf and call the method on that client, but wrap the call with `ctx.oneWayCall` as shown below:

```typescript
const client = new GreeterClientImpl(restateContext);
await restateContext.oneWayCall(() =>
  client.greet(TestRequest.create({ name: "Pete" }))
);
```

You need to await the Promise that is returned from `oneWayCall()`, otherwise a failure in sending the message does not get propagated back to your user code. 
Note that the Promise gets resolved as soon as the message gets send to the runtime, so awaiting the promise does not mean it is a request-response call.

:::caution
You can only use `oneWayCall()` to do one-way calls to other services via the proto-ts clients that are generated. 
You cannot wrap any other types of operations with `oneWayCall()`! This is invalid code.
:::

## Delayed calls
A delayed call is a one-way call that gets executed after a specified delay.

For example, the following code calls the greet method of the Greeter service with a delay of 5 seconds:

```typescript
const client = new GreeterClientImpl(restateContext);
await restateContext.delayedCall(() =>
  client.greet(TestRequest.create({ name: "Pete" })),
  5000  
);
```

Restate takes care of the scheduling and the durability of the delayed call.