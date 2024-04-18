import * as restate from "@restatedev/restate-sdk";

const service = restate.service({
    name: "DurableTimers",
    handlers: {
        greet: async (ctx: restate.Context, name: string) => {
            // <start_here>
            const duration = 10_000;
            await ctx.sleep(duration);
            // <end_here>
        },
    }
})