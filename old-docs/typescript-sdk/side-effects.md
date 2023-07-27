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

For example, imagine a payment service where you want to avoid having duplicate payments during retries. 
You could use a side effect to generate and store a UUID and then use that UUID as identifier of the payment.
You only allow the payment to go through if no payment with that UUID was done yet.
Restate guarantees that once the UUID is stored, it is retained during retries.

:::caution
You cannot invoke any methods on the Restate context within a side effect!
This includes actions such as getting state, calling another service, and nesting side effects.
:::

## Retrying side effects

Side effects do not get re-executed during retries/replays. So if a side effect fails, it does not get retried. 
The failure is stored durably in the log. 

For some use cases, you may want to retry the failed side effect. 
The SDK offers some utilities to do this.

### Retrying on failure
This utility calls a side effect function and retries the call on failure, with a timed backoff.
The side effect function is retried when it throws an Error, until it returns a successfully
resolved Promise.

Between retries, this function does a suspendable Restate sleep.
The sleep time starts with the `initialDelayMs` value and doubles on each retry, up to
a maximum of `maxDelayMs`. You supply these parameters via the retry settings object as explained below.

The returned Promise is resolved successfully once the side effect action completes
successfully and is rejected with an error if the maximum number of retries
(as specified by `maxRetries`) is exhausted.

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
const retrySettings = { initialDelayMs: 1000, maxDelayMs: 60000, maxRetries: 10 }
const paymentAccepted = await retryExceptionalSideEffect(ctx, retrySettings, paymentAction);
```

### Retrying until the result is `true`

The other utility calls a side effect function and retries when the result is false, with a timed backoff.
The side effect function is retried until it returns true or until it throws an error.

Between retries, the utility does a suspendable Restate sleep.
The sleep time starts with the `initialDelayMs` value and doubles on each retry, up to
a maximum of `maxDelayMs`. You supply these parameters via the retry settings object as explained below.

The returned Promise is resolved successfully once the side effect actions completes
successfully and is rejected with an error if the side effect function throws an error
or if the maximum number of retries (as specified by `maxRetries`) is exhausted.

```typescript
const ctx = restate.useContext(this);
const paymentAction = async () => 
    (await paymentClient.call(txId, methodIdentifier, amount)).success;
const retrySettings = { initialDelayMs: 1000, maxDelayMs: 60000, maxRetries: 10 }
await retrySideEffect(ctx, retrySettings, paymentAction);
```

### Retry settings
For `retryExceptionalSideEffect` and `retrySideEffect`, you can set the retry settings. 

You can supply the following values to the retry settings objects:
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




