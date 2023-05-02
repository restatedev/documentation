---
sidebar_position: 4
description: "Learn how to interact with the runtime via the Restate context."
---

# Restate context


In Restate services, all interaction with the runtime occur through the Restate context.
This context provides a set of methods that allow you to perform actions such as getting or setting state, or
calling other services.

To access the Restate context, you need to import the `@restatedev/restate-sdk` module in your Typescript service definition file:

```typescript
import * as restate from "@restatedev/restate-sdk";
```

Once you have imported the module, you can retrieve the context object from within the method you are defining using the `useContext` method, as shown in the following example:

```typescript
async greet(request: Request): Promise<Response> {
const ctx = restate.useContext(this);

    //...the rest of your code...
}
```

The `useContext` method retrieves the context object for the current service instance,
which you can then use to call the various Restate methods.
All method calls made through the context object are durably stored in the execution log
and can be replayed in case of failure,
ensuring that your service is always reliable and fault-tolerant.