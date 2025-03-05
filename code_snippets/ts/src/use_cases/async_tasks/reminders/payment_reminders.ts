import * as restate from "@restatedev/restate-sdk";

// <start_here>
// <mark_3>
const paymentTracker = restate.object({ // one instance per invoice id
    // </mark_3>
    name: "PaymentTracker",
    handlers: {
        // First invoked by Stripe webhook events,
        // and then via delayed self calls until payment has succeeded
        // <mark_1>
        remindPaymentFailed: async (ctx: restate.ObjectContext, event: StripeEvent) => {
            // </mark_1>
            // <mark_3>
            if (await ctx.get<string>("status") === "PAID") {
                return;
            }
            // </mark_3>

            const remindersCount = await ctx.get<number>("reminders_count") ?? 0;
            if (remindersCount >= 3) {
                // <mark_2>
                await ctx.objectSendClient(PaymentTracker, ctx.key).escalate(event);
                // </mark_2>
                return;
            }

            await ctx.run(() => sendReminderEmail(event));
            ctx.set("reminders_count", remindersCount + 1);

            // Schedule next reminder
            // <mark_2>
            await ctx.objectSendClient(PaymentTracker, ctx.key, {delay: 24 * 60 * 60 * 1000})
                .remindPaymentFailed(event);
            // </mark_2>
        },

        // <mark_1>
        onPaymentSuccess: async (ctx: restate.ObjectContext, event: StripeEvent) => {
            // </mark_1>
            // <mark_3>
            ctx.set("status", "PAID");
            // </mark_3>
        },

        // <mark_1>
        escalate: async (ctx: restate.ObjectContext, event: StripeEvent) => {
            // </mark_1>
            //  Request human intervention to resolve the issue.
        }
    }
})
// <end_here>

const PaymentTracker: typeof paymentTracker = {name: "PaymentTracker"};

restate
    .endpoint()
    .bind(paymentTracker)
    .listen(9080);


export type StripeEvent = {
    type: string;
    created: number;
    data: {
        object: {
            id: string;
            customer: string;
        };
    };
}

export function sendReminderEmail(message: StripeEvent) {
    console.log(`Sending email: ${message}`);
}