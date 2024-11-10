import * as restate from "@restatedev/restate-sdk";
import { randomUUID } from "node:crypto";

const PAYMENT_API =
  "https://pvd5p37t6zz5hpsetbqda2bzra0fwqkx.lambda-url.eu-central-1.on.aws";
const SUBSCRIPTION_API =
  "https://z2bo2pifnqgfscdzinm6szme5u0fajja.lambda-url.eu-central-1.on.aws";

const subscriptions = restate.service({
  name: "SubscriptionService",
  handlers: {
    // Use the restate.Context to persist results in Restate
    add: async (
      ctx: restate.Context,
      req: { userId: string; creditCard: string; subscriptions: string[] }
    ) => {
      const { userId, creditCard, subscriptions } = req;

      // 1. Generate an idempotency key
      // This value is retained after a failure
      // !mark 0
      // !mark[/await ctx.run\(\(\) =>/g] 0
      // !mark[/await ctx.run\(\(\) =>/g] 0
      const idempotencyKey = await ctx.run(() => randomUUID());

      // 2. Create a recurring payment
      // Retried in case of timeouts, API downtime, etc.
      // !mark(1:10) 1
      // !mark[/await ctx.run\(async \(\) =>/g] 1
      // !mark[/await ctx.run\(async \(\) =>/g] 1
      const paymentRef = await ctx.run(async () => {
        // !collapse(1:8) collapsed
        const resp = await fetch(`${PAYMENT_API}/createRecurringPayment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
          },
          body: JSON.stringify({ userId, creditCard }),
        });
        return resp.json();
      });

      // 3. Create subscriptions
      // Persists successful subscriptions and skips on retries
      for (const subscription of subscriptions) {
        // !mark(1:7) 2
        // !mark[/await ctx.run\(\(\) =>/g] 2
        // !mark[/await ctx.run\(\(\) =>/g] 2
        await ctx.run(() =>
          // !collapse(1:5) collapsed
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
