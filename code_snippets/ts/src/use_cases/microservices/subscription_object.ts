import * as restate from "@restatedev/restate-sdk/lambda";

// <start_here>
// <mark_2>
const subscriptionObject = restate.object({
  // </mark_2>
  name: "SubscriptionObject",
  handlers: {
    // <mark_2>
    add: async (ctx: restate.ObjectContext, req: SubscriptionRequest) => {
      // </mark_2>
      const paymentId = ctx.rand.uuidv4();

      // <mark_1>
      ctx.set("subscription", "awaiting_payment");
      // </mark_1>
      const success = await tryPaymentFiveTimes(ctx, req, paymentId);
      if (!success) {
        // <mark_1>
        ctx.set("subscription", "payment_failed");
        // </mark_1>
        return;
      }

      // <mark_1>
      ctx.set("subscription", "creating_subscription");
      // </mark_1>
      await ctx.run(() => createSubscription(req.userId, req.subscription));

      // <mark_1>
      ctx.set("subscription", "created");
      // </mark_1>
    },
  },
});

// <mark_3>
export const awsLambdaHandler = restate
  .endpoint()
  .bind(subscriptionObject)
  .handler();
// </mark_3>
// <end_here>

type SubscriptionRequest = {
  creditCard: string;
  userId: any;
  subscription: string;
};

function createRecurringPayment(creditCard: string, paymentId: string): string {
  return "";
}

function createSubscription(userId: string, subscription: string) {
  return undefined;
}

async function tryPaymentFiveTimes(
  ctx: restate.ObjectContext,
  req: SubscriptionRequest,
  paymentId: string
) {
  await ctx.run(
    "payment",
    () => createRecurringPayment(req.creditCard, paymentId),
    { maxRetryAttempts: 5 }
  );
  return true;
}
