---
title: "Durable webhooks"
description: "Point webhook callbacks to a Restate handler for durable event processing."
pagination_next: null
pagination_prev: null
---

import {CodeWithTabs} from "../../src/components/code/code";
import Admonition from "@theme/Admonition";

# Durable webhooks

Restate handlers can be used as **durable processors of webhook events**.

<img src={"/img/guides/durable-webhooks.png"} width={"400px"}/>

What does this give you?

- Restate persists all incoming events, and ensures that they are **processed exactly once**, across failures and restarts. Restate guarantees your handler runs till completion.
- Let Restate **deduplicate** events on an [idempotency key](/invoke/http#invoke-a-handler-idempotently). If the sender of the event retries, Restate will not process the event again.
- Use any of Restate's [**durable SDK constructs**](/concepts/durable_building_blocks) when processing the events: durable calls/messaging to other services, durable timers, scheduling tasks, K/V state, concurrency guarantees etc.
- Any handler can be a durable webhook endpoint. **No need to do anything special or extra!**

Just point your webhook endpoint to your handler: `restate:8080/MyService/myHandler`.

## Example
This example processes webhook callbacks from a payment provider.

The payment provider notifies us about payment success or failure of invoices by sending webhook events to our handler.
The handler then routes the event to the correct processor via a one-way message.

<CodeWithTabs groupId={"sdk"}>
    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/src/webhookcallbacks/webhook_callback_router.ts
    // collapse_prequel
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/typescript/patterns-use-cases/src/webhookcallbacks/webhook_callback_router.ts
    ```

    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/patterns-use-cases/src/webhookcallbacks/callbackrouter.go
    // collapse_prequel
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/go/patterns-use-cases/src/webhookcallbacks/callbackrouter.go
    ```
</CodeWithTabs>

<Admonition type={"note"} title={"Example not available in your language?"}>
    This pattern is implementable with any of our SDKs. We are still working on translating all patterns to all SDK languages.
    If you need help with a specific language, please reach out to us via [Discord](https://discord.com/invite/skW3AZ6uGd) or [Slack](https://join.slack.com/t/restatecommunity/shared_invite/zt-2v9gl005c-WBpr167o5XJZI1l7HWKImA).
</Admonition>