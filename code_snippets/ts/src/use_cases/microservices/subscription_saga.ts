import * as restate from "@restatedev/restate-sdk";

// <start_here>
const subscriptionService = restate.service({
  name: "SubscriptionService",
  handlers: {
    add: async (ctx: restate.Context, req: SubscriptionRequest) => {
      // !focus(1:24)
      // <mark_1>
      const compensations = [];
      // </mark_1>

      try {
        const paymentId = ctx.rand.uuidv4();
        // <mark_1>
        compensations.push(() => removeRecurringPayment(paymentId))
        // </mark_1>
        // <mark_1> green
        await ctx.run(() => createRecurringPayment(req.creditCard, paymentId));
        // </mark_1>

        for (const subscription of req.subscriptions) {
          // <mark_1>
          compensations.push(() => removeSubscription(req.userId, subscription))
          // </mark_1>
          // <mark_1> green
          await ctx.run(() => createSubscription(req.userId, subscription));
          // </mark_1>
        }
      } catch (e) {
        // <mark_2>
        if (e instanceof restate.TerminalError) {
          for (const compensation of compensations.reverse()) {
            await ctx.run(() => compensation());
          }
        }
        // </mark_2>
        throw e;
      }
    },
  },
})
// <end_here>

restate
    .endpoint()
    .bind(subscriptionService)
    .listen(9080);


type SubscriptionRequest = {creditCard: string, userId: any, subscriptions: any[]};

async function removeRecurringPayment(paymentId: string){}
async function createRecurringPayment(creditCard: string, paymentId: string){}

async function removeSubscription(userId: any, subscription: any, payRef: void) {}
async function createSubscription(userId: any, subscription: any, payRef: void) {
  return undefined;
}