import * as restate from "@restatedev/restate-sdk";
import { randomUUID } from "node:crypto";
import {NotificationService} from "./file_workflow";
import {EmailVerificationWorkflow} from "./email_verification";

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
      req: { userId: string, email: string; creditCard: string; subscriptions: string[]; }
    ) => {
      const { userId, email, creditCard, subscriptions } = req;

      // <mark_1>
      const verified = await ctx.workflowClient(EmailVerificationWorkflow, userId).run({ email });
      // </mark_1>

      // 1. Generate an idempotency key
      // This value is retained after a failure
      if (verified) {
          const idempotencyKey = await ctx.run(() => randomUUID());

          // 2. Create a recurring payment
          // Retried in case of timeouts, API downtime, etc.
          const paymentRef = await ctx.run(async () => {
            // !collapse(1:8) collapsed
            return (await fetch(`${PAYMENT_API}/createRecurringPayment`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Idempotency-Key": idempotencyKey,
                },
                body: JSON.stringify({ email, creditCard }),
              })).json();
          });

          // 3. Create subscriptions
          // Persists successful subscriptions and skips on retries
          for (const subscription of subscriptions) {
            await ctx.run(() =>
              // !collapse(1:5) collapsed
              fetch(`${SUBSCRIPTION_API}/create`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, subscription, paymentRef }),
                })
            );
          }
      }
    },
  },
});

restate.endpoint().bind(subscriptions).listen();
