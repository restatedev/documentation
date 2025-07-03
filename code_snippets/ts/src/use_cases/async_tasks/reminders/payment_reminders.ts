import * as restate from "@restatedev/restate-sdk";

// <start_here>
// <mark_3>
const paymentTracker = restate.object({
  // one instance per invoice id
  // </mark_3>
  name: "PaymentTracker",
  handlers: {
    // Stripe sends us webhook events for invoice payment attempts
    // <mark_1>
    onPaymentSuccess: async (
      ctx: restate.ObjectContext,
      event: StripeEvent
    ) => {
      // </mark_1>
      // <mark_3>
      ctx.set("paid", true);
      // </mark_3>
    },
    // <mark_1>
    onPaymentFailed: async (ctx: restate.ObjectContext, event: StripeEvent) => {
      // </mark_1>
      // <mark_3>
      if (await ctx.get<boolean>("paid")) {
        return;
      }
      // </mark_3>

      const remindersCount = (await ctx.get<number>("reminders_count")) ?? 0;
      if (remindersCount < 3) {
        ctx.set("reminders_count", remindersCount + 1);
        await ctx.run(() => sendReminderEmail(event));

        // Schedule next reminder via a delayed self call
        // <mark_2>
        ctx
          .objectSendClient(
            PaymentTracker,
            ctx.key // this object's invoice id
          )
          .onPaymentFailed(event, restate.rpc.sendOpts({ delay: { days: 1 }}));
        // </mark_2>
      } else {
        // <mark_2>
        await ctx.run(() => escalateToHuman(event));
        // </mark_2>
      }
    },
  },
});
// <end_here>

const PaymentTracker: typeof paymentTracker = { name: "PaymentTracker" };

restate.endpoint().bind(paymentTracker).listen(9080);

export type StripeEvent = {
  type: string;
  created: number;
  data: {
    object: {
      id: string;
      customer: string;
    };
  };
};

export function sendReminderEmail(message: StripeEvent) {
  console.log(`Sending email: ${message}`);
}

function escalateToHuman(event: StripeEvent) {
  return undefined;
}
