// <start_virtual_object>
import * as restate from "@restatedev/restate-sdk";

export const greeterObject = restate.object({
    name: "greeter",
    handlers: {
        greet: async (ctx: restate.ObjectContext, request: { greeting?: string }) => {
            const greeting = request?.greeting ?? "Hello";

            // access the state attached to this object (this 'name')
            // state access and updates are exclusive and consistent with the invocations
            let count = (await ctx.get<number>("count")) ?? 0;
            count++;
            ctx.set("count", count);
            return `${greeting} ${ctx.key} for the ${count}-th time.`;
        },

        ungreet: async (ctx: restate.ObjectContext) => {
            let count = (await ctx.get<number>("count")) ?? 0;
            if (count > 0) {
                count--;
            }
            ctx.set("count", count);
            return `Dear ${ctx.key}, taking one greeting back: ${count}.`;
        },
    }
});

restate.endpoint().bind(greeterObject).listen(9080);
// <end_virtual_object>
