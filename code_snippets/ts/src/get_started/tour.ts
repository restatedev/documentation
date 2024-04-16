import * as restate from "@restatedev/restate-sdk";

const router = restate.service({
    name: "MyService",
    handlers: {
        greet: async (ctx: restate.Context, name: string) => {
            const ticketId = "";

            // <start_sleep>
            await ctx.sleep(15 * 60 * 1000);
            // <end_sleep>

            // <start_sleep_and_send>
            await ctx.sleep(15 * 60 * 1000);
            ctx.objectSendClient(TicketObject, ticketId).unreserve();
            // <end_sleep_and_send>

            // <start_idempotency_key_retry>
            const idempotencyKey = ctx.rand.uuidv4();
            console.info("My idempotency key: " + idempotencyKey);
            throw new Error("Something happened!");
            // <end_idempotency_key_retry>

        }
    }
})

export const ticketObject = restate.object({
    name: "TicketObject",
    handlers: {
        async unreserve(ctx: restate.ObjectContext) {
            return true;
        },
    }
});

const TicketObject: typeof ticketObject = { name: "TicketObject" };