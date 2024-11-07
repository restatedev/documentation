import * as restate from "@restatedev/restate-sdk";
import { randomUUID } from "node:crypto";

const PAYMENT_API = "lambda-function-url";
const SUBSCRIPTION_API = "lambda-function-url";

const subscriptions = restate.service({
  name: "SubscriptionService",
  handlers: {
      // !focus(1:31)
    add: async ( ctx: restate.Context, req: { userId: string; creditCard: string; subscriptions: string[] }) => {
      const { userId, creditCard, subscriptions } = req;

      // 1. Generate an idempotency key
        // !mark 0
        // !mark[/await ctx.run\(\(\) =>/g] 0
        // !mark[/await ctx.run\(\(\) =>/g] 0
      const idempotencyKey = await ctx.run(() => randomUUID());


      // 2. Create a recurring payment, using the idempotency key
      // !mark(1:10) 1
      // !mark[/await ctx.run\(\(\) =>/g] 1
      // !mark[/await ctx.run\(\(\) =>/g] 1
      const paymentResp = await ctx.run(() =>
        fetch(`${PAYMENT_API}/createRecurringPayment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
          },
          body: JSON.stringify({ userId, creditCard }),
        })
      );

      const paymentRef = await paymentResp.json();

      // 3. Create subscriptions
      for (const subscription of subscriptions) {
      // !mark(1:7) 2
        // !mark[/await ctx.run\(\(\) =>/g] 2
        // !mark[/await ctx.run\(\(\) =>/g] 2
        await ctx.run(() =>
          fetch(`${SUBSCRIPTION_API}/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, subscription, paymentRef }),
          })
        );
      }
    },
  },
});

restate.endpoint().bind(subscriptions).listen();
