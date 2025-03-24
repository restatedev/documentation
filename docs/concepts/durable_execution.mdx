---
sidebar_position: 5
description: ""
---

import DurableExecutionAnimation from "../../src/components/DurableExecutionAnimation";

# Durable Execution

Restate provides resilience for applications via its Durable Execution mechanism.

A Durable Execution engine tracks code execution to enable recovery of partial progress in case of failures.

Restate implements Durable Execution by keeping track of the progress of execution in a central, persisted log that can be replayed in case of failures.
Restate uses a combination of a server and SDK libraries to provide durable execution.

The SDKs are responsible for tracking the progress of the execution and sending it to the runtime.

The Restate server is responsible for storing the progress in a durable log and triggering retries in case of failures.
When the Restate server triggers a retry, it sends the progress log to the SDK, which replays the log to continue the execution from where it left off.


<DurableExecutionAnimation/>

In case of a failure (e.g. timeout,  infrastructure crash, network glitch), Restate will retry the execution by invoking the handler again and sending over the latest version of the journal.
The handler then starts executing again and whenever it encounters an action on the Restate context, it will skip execution and will inject the response it finds in the journal.
This way the handler can recover up to the point where it crashed.
