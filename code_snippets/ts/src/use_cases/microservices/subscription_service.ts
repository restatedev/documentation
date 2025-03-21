import * as restate from "@restatedev/restate-sdk";

// <start_here>
// <mark_1>
const subscriptionService = restate.service({
  // </mark_1>
  name: "SubscriptionService",
  handlers: {
    // <mark_1>
    add: async (ctx: restate.Context, req: SubscriptionRequest) => {
      // </mark_1>
      const paymentId = ctx.rand.uuidv4();

      // <mark_2>
      const payRef = await ctx.run(() =>
        createRecurringPayment(req.creditCard, paymentId)
      );
      // </mark_2>

      for (const subscription of req.subscriptions) {
        // <mark_2>
        await ctx.run(() =>
          createSubscription(req.userId, subscription, payRef)
        );
        // </mark_2>
      }
    },
  },
});

export type SubscriptionService = typeof subscriptionService;

restate.endpoint().bind(subscriptionService).listen(9080);
// <end_here>

type SubscriptionRequest = {
  creditCard: string;
  userId: any;
  subscriptions: any[];
};

function createRecurringPayment(creditCard: string, paymentId: string) {}

function createSubscription(userId: any, subscription: any, payRef: void) {
  return undefined;
}
