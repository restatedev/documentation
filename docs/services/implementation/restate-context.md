---
sidebar_position: 2
description: "Learn how to interact with the runtime via the Restate context."
---

# Restate context


In Restate services, all interaction with the runtime occur through the Restate context.
This context provides a set of methods that allow you to perform actions such as getting or setting state, or
calling other services.

You can retrieve the context object from within the method you are defining using the `useContext` method, as shown in the following example:

```typescript
import * as restate from "@restatedev/restate-sdk";

async greet(request: Request): Promise<Response> {
    const restateContext = restate.useContext(this);

    //...the rest of your code...
}
```

:::info
The code blocks in the Typescript documentation assume that the context has been assigned to `restateContext` as
```typescript
const restateContext = restate.useContext(this);
```
:::

:::caution 
All method calls made through the Restate context are durably stored in the execution log
and can be replayed in case of failure, ensuring that your service is always reliable and fault-tolerant.
This means that if you do actions (e.g. calling other services, sleep) without making use of the Restate SDK,
you do not have these benefits.
:::