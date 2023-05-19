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

## Retrying side effects

Side effects do not get re-executed during retries/replays, so if a side effect fails, it does not get retried. 
The failure is stored durably in the log. 

For some use cases, you may want to retry the failed side effect. 
The SDK offers some utilities to do this.

### Retrying on failure
This utility calls a side effect function and retries the call on failure, with a timed backoff.
The side effect function is retried when it throws an Error, until returns a successfully
resolved Promise.

Between retries, this function will do a suspendable Restate sleep.
The sleep time starts with the 'initialDelayMs' value and doubles on each retry, up to
a maximum of maxDelayMs.

The returned Promise will be resolved successfully once the side effect action completes
successfully and will be rejected with an error if the maximum number of retries
(as specified by 'maxRetries') is exhausted.

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

const paymentAccepted = await retryExceptionalSideEffectWithBackoff(ctx, paymentAction, 1000, 60000, 10);
```

### Retrying until the result is `true`

The other utility calls a side effect function and retries when the result is false, with a timed backoff.
The side effect function is retried until it returns true or until it throws an error.

Between retries, the call this function will do a suspendable Restate sleep.
The sleep time starts with the 'initialDelayMs' value and doubles on each retry, up to
a maximum of maxDelayMs.

The returned Promise will be resolved successfully once the side effect actions completes
successfully and will be rejected with an error if the side effect function throws an error
or the maximum number of retries (as specified by 'maxRetries') is exhausted.

```typescript
const ctx = restate.useContext(this);
const paymentAction = async () => 
    (await paymentClient.call(txId, methodIdentifier, amount)).success;
await retrySideEffectWithBackoff(ctx, paymentAction, 1000, 60000, 10);
```







