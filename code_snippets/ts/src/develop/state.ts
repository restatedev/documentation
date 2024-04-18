import * as restate from "@restatedev/restate-sdk";

const router = restate.object({
    name: "State",
    handlers: {
        greet: async (ctx: restate.ObjectContext, name: string) => {
            // <start_statekeys>
            const stateKeys = ctx.stateKeys();
            // <end_statekeys>

            // <start_get>
            const myStringValue = await ctx.get<string>("my-key") ?? "my-default";
            // <end_get>

            // <start_get_nb>
            const myNbValue = await ctx.get<number>("my-key") ?? 0;
            // <end_get_nb>

            // <start_set>
            ctx.set("my-key", "my-new-value");
            // <end_set>

            // <start_clear>
            ctx.clear("my-key");
            // <end_clear>

            // <start_clear_all>
            ctx.clearAll();
            // <end_clear_all>
        },
    }
})