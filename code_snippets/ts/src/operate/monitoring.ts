import * as restate from "@restatedev/restate-sdk";

const router = restate.keyedRouter({
    greet: async (ctx: restate.KeyedContext, name: string) => {

        // <start_here>
        ctx.console.info("This will not be printed again during replays");
        ctx.console.debug("This will not be printed again during replays");
        // Any other console logging method can be used
        // <end_here>

    }
})