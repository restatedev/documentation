---
sidebar_position: 7
description: "Learn how to store the results of non-deterministic operations."
---

# Side effects

Restate uses an execution log for replay after failures and suspensions.
For this to work, the user code needs to be deterministic.

However,
if your code does something that is not deterministic then you have to wrap it in a side effect.
This will make sure that the response of the side effect gets durable stored in the execution log
and that you will get the same value during replays.

Here is an example in which a unique ID is generated and stored in Restate:


```java

```

Once stored, every re-execution of this invocation will get the same UUID.