import * as restate from "@restatedev/restate-sdk";

// <start_here>
// <mark_2>
const subscriptionService = restate.service({
  // </mark_2>
  name: "SubscriptionService",
  // <mark_2>
  handlers: {
    add: async (ctx: restate.Context, req: SubscriptionRequest) => {
      // </mark_2>
      // <mark_3>
      // <mark_1>
      const paymentId = ctx.rand.uuidv4();
      // </mark_1>

      // <mark_1>
      const payRef = await ctx.run(() =>
        createRecurringPayment(req.creditCard, paymentId)
      );
      // </mark_1>

      for (const subscription of req.subscriptions) {
        // <mark_1>
        await ctx.run(() =>
          createSubscription(req.userId, subscription, payRef)
        );
        // </mark_1>
      }
      // </mark_3>
    },
  },
});

// <mark_4>
restate.endpoint().bind(subscriptionService).listen(9080);
// </mark_4>
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
