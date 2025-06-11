---
sidebar_position: 5
description: "Durable sleep tracked by Restate."
---

import Admonition from '@theme/Admonition';

# Scheduling & Timers
The Restate SDK includes durable timers.
You can use these to let handlers sleep for a specified time, or to schedule a handler to be called at a later time.
These timers are resilient to failures and restarts.
Restate stores and keeps track of the timers and triggers them on time, even across failures and restarts.

## Scheduling Async Tasks

To schedule a handler to be called at a later time, have a look at the documentation on [delayed calls](/develop/ts/service-communication#delayed-calls).


## Durable sleep
To sleep in a Restate application for ten seconds, do the following:

```typescript
CODE_LOAD::ts/src/develop/durable_timers.ts
```

<Admonition type="tip" title="Cost savings on FaaS">
    Restate suspends the handler while it is sleeping, to free up resources.
    This is beneficial for AWS Lambda deployments, since you don't pay for the time the handler is sleeping.
</Admonition>

<Admonition type="info" title="Sleeping in Virtual Objects">
    Virtual Objects only process a single invocation at a time, so the Virtual Object will be blocked while sleeping.
</Admonition>

<details className="grey-details">
    <summary>Clock synchronization Restate Server vs. SDK</summary>

    The Restate SDK calculates the wake-up time based on the delay you specify.
    The Restate Server then uses this calculated time to wake up the handler.
    If the Restate Server and the SDK have different system clocks, the sleep duration might not be accurate.
    So make sure that the system clock of the Restate Server and the SDK have the same timezone and are synchronized.
</details>

## Cron Jobs

Cron jobs are not yet a built-in feature of Restate.
The feature will be added in the future. For now, you can implement your own cron service using the durable timers and virtual objects.

Check out the [Cron Jobs guide](/guides/cron) for an example of how to implement a cron service with Restate.