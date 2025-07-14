---
sidebar_position: 3
description: "Persist results of operations."
---

import Admonition from '@theme/Admonition';

# Journaling Results

Restate uses an execution log for replay after failures and suspensions.
This means that non-deterministic results (e.g. database responses, UUID generation) need to be stored in the execution log.
The SDK offers some functionalities to help you with this:
1. **[Journaled actions](/develop/ts/journaling-results#journaled-actions)**: Run any block of code and store the result in Restate. Restate replays the result instead of re-executing the block on retries.
2. **[`RestatePromise` combinators](/develop/ts/journaling-results#combineable-promise-combinators)**: Log the order in which RestatePromises are resolved/rejected, to ensure deterministic replay.
3. **[Random generators](/develop/ts/journaling-results#generating-randoms)**: Built-in helpers for generating stable UUIDs and random numbers.

## Journaled actions
You can store the result of a (non-deterministic) operation in the Restate execution log (e.g. database requests, HTTP calls, etc).
Restate replays the result instead of re-executing the operation on retries.

Here is an example of a database request for which the string response is stored in Restate:
```typescript
CODE_LOAD::ts/src/develop/journaling_results.ts#side_effect
```

You cannot use the Restate context within `ctx.run`.
This includes actions such as getting state, calling another service, and nesting other journaled actions.

<Admonition type="info" title={"Serialization"}>
    By default, Typescript SDK uses the built-in [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) support to perform (de)serialization.
    Consult the [serialization docs](/develop/ts/serialization) for other options.
</Admonition>

<Admonition type="caution" title={"Immediately await journaled actions"}>
Always immediately await `ctx.run`, before doing any other context calls.
If not, you might bump into non-determinism errors during replay,
because the journaled result can get interleaved with the other context calls in the journal in a non-deterministic way.
</Admonition>

<Admonition type="note" title="Failure semantics">
Failures in `ctx.run` have the same semantics as failures in the rest of your handler code.
By default, the `ctx.run` function is retried infinitely on failure, unless you specify differently in the retry policy (see below) or throw a [`TerminalError`](/develop/ts/error-handling).
</Admonition>

### Run-block Retry Policies

You can configure the retry policy for the `ctx.run` block:

```ts
CODE_LOAD::ts/src/develop/retries.ts?1
```

This way you can override the default retry behavior of your Restate service for specific operations.

If you set a maximum number of attempts, then the `ctx.run` block will fail with a [`TerminalError`](/develop/ts/error-handling) once the retries are exhausted.
Have a look at the [error handling docs](/develop/ts/error-handling) and [Sagas guide](/guides/sagas) to learn how to handle these.


## Restate Promise combinators {#combineable-promise-combinators}
Operations such as `ctx.run`, calls, awakeables, and sleep return a `RestatePromise`.
The SDK provides combinators for working with `RestatePromise`.
Restate then logs the order in which they are resolved or rejected, to make them deterministic on replay.

```ts
CODE_LOAD::ts/src/develop/journaling_results.ts#all
```

Restate provides the following deterministic combinators:
- `RestatePromise.all`: similar to [`Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).
- `RestatePromise.any`: similar to [`Promise.any()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any).
- `RestatePromise.race`: similar to [`Promise.race()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race).
- `RestatePromise.allSettled`: similar to [`Promise.allSettled()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled).

## Generating randoms
The SDK provides helper functions for the deterministic generation of UUIDs and random numbers. Restate seeds the random number generator with the invocation ID, so it always returns the same value on retries.

### Generating UUIDs

You can use these UUIDs to generate stable idempotency keys, to deduplicate operations. For example, you can use this to let a payment service avoid duplicate payments during retries.

Do not use this in cryptographic contexts.

```typescript
CODE_LOAD::ts/src/develop/journaling_results.ts#uuid
```


### Generating random numbers


This returns a new pseudorandom float within the range `[0,1]`.
This is the equivalent of JS `Math.random()` but deterministically replayable.

```typescript
CODE_LOAD::ts/src/develop/journaling_results.ts#random_nb
```
