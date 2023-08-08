---
sidebar_position: 5
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

For example, imagine a payment service where you want to avoid having duplicate payments during retries.
You could use a side effect to generate and store a UUID and then use that UUID as identifier of the payment.
You only allow the payment to go through if no payment with that UUID was done yet.
Restate guarantees that once the UUID is stored, it is retained during retries.

:::caution
You cannot invoke any methods on the Restate context within a side effect!
This includes actions such as getting state, calling another service, and nesting side effects.
:::

## Retrying on failure

If the side effect function throws an Error, then it is retried infinitely using an exponential backoff strategy until it succeeds.
Between retries, the SDK uses a suspendable Restate sleep operation so that the invocation can suspend.

```typescript
const ctx = restate.useContext(this);
const paymentAction = async () => {
    const result = await paymentClient.call(txId, methodIdentifier, amount);
    if (result.error) {
        throw result.error;
    } else {
        return result.isSuccess;
    }
}
const success: boolean = await ctx.sideEffect(paymentAction);
```

### Failing a side effect terminally

By default, a side effect function is retried infinitely on failure.
If you want to let the side effect fail terminally, then you have to throw a `restate.TerminalError`.
A `TerminalError` will stop the infinite retry strategy and lets the SDK propagate the error to the user code where it can be handled.
The `TerminalError` will also be recorded in the journal so that it will be deterministically thrown on replay.

```typescript
const ctx = restate.useContext(this);
const paymentAction = async () => {
    const result = await paymentClient.call(txId, methodIdentifier, amount);
    if (result.error) {
        throw new restate.TerminalError(result.error);
    } else {
        return result.isSuccess;
    }
}

try {
  await ctx.sideEffect(paymentAction);
} catch (terminal_error) {
  // handle terminal error
}
```

### Manually controlling the retry policy

Instead of using an infinite exponential backoff strategy, you can also specify a finite retry policy when executing a side effect.
A finite retry policy retries a failing side effect function until all retry attempts are depleted.
If this happens, then the side effect fails terminally with a `restate.TerminalError` which is propagated to the user code.
In order to configure the retry policy you need to provide a `RetrySettings` object:

```typescript
const ctx = restate.useContext(this);
const retrySettings = { initialDelayMs: 1000, maxDelayMs: 60000, maxRetries: 10 }
const paymentAction = async () => {
    const result = await paymentClient.call(txId, methodIdentifier, amount);
    if (result.error) {
        throw result.error;
    } else {
        return result.isSuccess;
    }
}

try {
  await ctx.sideEffect(paymentAction, retrySettings);
} catch (terminal_error) {
  // handle terminal error
}
```

#### Retry settings

The `RetrySettings` object has the following fields:
- `initialDelayMs` (number): The initial delay between retries. As more retries happen, the delay may change per the policy.
- `maxDelayMs` (number): Optionally, the maximum delay between retries. No matter what the policy says, this is the maximum time
  that Restate sleeps between retries. If not set, there is effectively no limit (internally the limit is Number.MAX_SAFE_INTEGER).
- `maxRetries` (number): The maximum number of retries before this function fails with an exception. If not set, there is effectively no limit (internally the limit is Number.MAX_SAFE_INTEGER).
- `policy`:  Optionally, the retry policy to use (`FIXED_DELAY` or `EXPONENTIAL_BACKOFF`). Defaults to `EXPONENTIAL_BACKOFF`.
- `name` (string): Optionally, the name of side effect action that is used in error and log messages around retries.

For example:
```typescript
const retrySettings = {
    initialDelayMs: 1000,
    maxDelayMs: 60000,
    maxRetries: 10,
    policy: EXPONENTIAL_BACKOFF,
    name: "my-side-effect"
}
```
