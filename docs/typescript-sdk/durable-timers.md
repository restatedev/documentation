---
sidebar_position: 8
description: "Let your service sleep for a specified time, guaranteed by Restate."
---

# Durable timers

Restate provides you with durable timers. 
Restate stores and keeps track of your timers so that your application sleeps the specified duration,
even across failures and restarts. 

To sleep in a Restate application do the following:

```typescript
const duration = 1000;
await restateContext.sleep(duration);
```


:::tip Did you know?
During a sleep, Restate suspends the invocation to free up resources for other service invocations.
This feature is particularly beneficial for AWS Lambda deployments.
When the service sleeps, costs are reduced to zero!
:::

:::danger
Don't use other timer implementations or sleep functions in combination with Restate.
Otherwise, you will not have any of the benefits. 
:::