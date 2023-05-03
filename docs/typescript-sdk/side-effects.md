---
sidebar_position: 7
description: "Learn how to store the results of non-deterministic operations."
---

# Side effects

:::danger
Restate uses an execution log for replay after failures and suspensions.
For this to work, the user code needs to be deterministic.
:::

Side effects help relaxing the constraints on determinism. 
If your code does something that is not deterministic then you have to wrap it in a side effect.
By doing this, Restate makes sure that the result is persistently stored in the execution log
and that the value is retained during replays.

Here is an example in which a unique ID is generated and stored in Restate:

```typescript
const uuid = await restateContext.sideEffect(async () => {
    return uuid()
});
```

Once stored, every retry of this invocation will get the same UUID.

This is an interesting pattern for many applications.
For example, imagine a payment service where you want to avoid having duplicate payments during retries. 
You could use a side effect to generate and store a UUID and then use that UUID as identifier of the payment.
You only allow the payment to go through if no payment with that UUID was done yet.
Restate guarantees that once the UUID is stored, it is retained during retries.

:::caution
You cannot invoke any methods on the Restate context within a side effect!
This includes actions such as getting state, calling another service, and nesting side effects.
:::