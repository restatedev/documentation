import * as restate from "@restatedev/restate-sdk";


const router = restate.keyedRouter({
    greet: async (ctx: restate.KeyedContext, name: string) => {
        const ticketId = "";
        // <start_sleep_and_send>
        await ctx.sleep(15 * 60 * 1000);
        ctx.send(ticketServiceApi).unreserve(ticketId);
        // <end_sleep_and_send>

        // <start_idempotency_key_retry>
        const idempotencyKey = ctx.rand.uuidv4();
        console.info("My idempotency key: " + idempotencyKey);
        throw new Error("Something happened!");
        // <end_idempotency_key_retry>

    }
})

export const ticketDbRouter = restate.keyedRouter({
    async unreserve(ctx: restate.KeyedContext){
        return true;
    },
});

export const ticketServiceApi: restate.ServiceApi<typeof ticketDbRouter> = {
    path: "TicketService",
};