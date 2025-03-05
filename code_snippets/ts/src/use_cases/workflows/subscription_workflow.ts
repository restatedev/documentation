import * as restate from "@restatedev/restate-sdk/lambda";

// <start_here>
const subscriptionWorkflow = restate.workflow({
  name: "SubscriptionWorkflow",
  handlers: {
    run: async (ctx: restate.WorkflowContext, req: SubscriptionRequest) => {
      // <mark_2> orange
      const compensations = [];
      // </mark_2>

      try {
        const paymentId = ctx.rand.uuidv4();
        // <mark_2> orange
        compensations.push(() => removeRecurringPayment(paymentId))
        // </mark_2>
        // <mark_2> green
        await ctx.run(() => createRecurringPayment(req.creditCard, paymentId));
        // </mark_2>
        // <mark_1>
        ctx.set("status", "payment_success");
        // </mark_1>

        for (const subscription of req.subscriptions) {
          // <mark_2> orange
          compensations.push(() => removeSubscription(req.userId, subscription))
          // </mark_2>
          // <mark_2> green
          await ctx.run(() => createSubscription(req.userId, subscription));
          // </mark_2>
        }
        // <mark_1>
        ctx.set("status", "subscribed");
        // </mark_1>
      } catch (e) {
        // <mark_2> orange
        if (e instanceof restate.TerminalError) {
          for (const compensation of compensations.reverse()) {
            await ctx.run(() => compensation());
          }
          // </mark_2>
          // <mark_1>
          ctx.set("status", "rolled_back");
          // </mark_1>
        }
        throw e;
      }
    },
  },
})

// <mark_3>
export const awsLambdaHandler = restate
    .endpoint()
    .bind(subscriptionWorkflow)
    .handler();
// </mark_3>
// <end_here>


type SubscriptionRequest = {creditCard: string, userId: any, subscriptions: any[]};

async function removeRecurringPayment(paymentId: string){}
async function createRecurringPayment(creditCard: string, paymentId: string){}

async function removeSubscription(userId: any, subscription: any, payRef: void) {}
async function createSubscription(userId: any, subscription: any, payRef: void) {
  return undefined;
}