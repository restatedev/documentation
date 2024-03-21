import * as restate from "@restatedev/restate-sdk";

const router = restate.router({
    greet: async (ctx: restate.Context, name: string) => {
        // <start_here>
        const duration = 10_000;
        await ctx.sleep(duration);
        // <end_here>
    },
})