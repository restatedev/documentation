/**
 * WARNING:
 * The Services page relies on the line numbers for the code animations
 * Make sure you adapt the line numbers when adapting the code
 */

// <start_here>
import * as restate from "@restatedev/restate-sdk";
import {ObjectContext} from "@restatedev/restate-sdk";

// <mark_1>
export const greeterObject = restate.object({
// </mark_1>
    name: "greeter",
    handlers: {
        // <mark_1>
        // <mark_3>
        greet: async (ctx: ObjectContext, greeting: string ) => {
            // </mark_3>
            // </mark_1>
            // <mark_2>
            let count = (await ctx.get<number>("count")) ?? 0;
            count++;
            ctx.set("count", count);
            // </mark_2>
            // <mark_1>
            return `${greeting} ${ctx.key} for the ${count}-th time.`;
            // </mark_1>
        },

        // <mark_1>
        // <mark_3>
        ungreet: async (ctx: ObjectContext) => {
            // </mark_3>
            // </mark_1>
            // <mark_2>
            let count = (await ctx.get<number>("count")) ?? 0;
            // </mark_2>
            if (count > 0) {
                // <mark_2>
                count--;
                // </mark_2>
            }
            // <mark_2>
            ctx.set("count", count);
            // </mark_2>
            // <mark_1>
            return `Dear ${ctx.key}, taking one greeting back: ${count}.`;
            // </mark_1>
        },
    }
});

restate.endpoint().bind(greeterObject).listen();
// <end_here>
