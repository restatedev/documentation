/**
 * WARNING:
 * The Services page relies on the line numbers for the code animations
 * Make sure you adapt the line numbers when adapting the code
 */

// <start_virtual_object>
import * as restate from "@restatedev/restate-sdk";
import {ObjectContext} from "@restatedev/restate-sdk";

export const greeterObject = restate.object({
    name: "greeter",
    handlers: {
        greet: async (ctx: ObjectContext, greeting: string ) => {
            let count = (await ctx.get<number>("count")) ?? 0;
            count++;
            ctx.set("count", count);
            return `${greeting} ${ctx.key} for the ${count}-th time.`;
        },

        ungreet: async (ctx: ObjectContext) => {
            let count = (await ctx.get<number>("count")) ?? 0;
            if (count > 0) {
                count--;
            }
            ctx.set("count", count);
            return `Dear ${ctx.key}, taking one greeting back: ${count}.`;
        },
    }
});

restate.endpoint().bind(greeterObject).listen();
// <end_virtual_object>
