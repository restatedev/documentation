import * as restate from "@restatedev/restate-sdk";
import {
    ObjectContext,
} from "@restatedev/restate-sdk";

// <start_here>
const greeter = restate.object({
    name: "Greeter",
    handlers: {
        greet: async (ctx: ObjectContext, text: string) => {
            const greeting = ctx.run(() =>
                Math.random() < 0.5 ? "Hello!" : "Howdy!");

            ctx.sleep(2000);

            const count = (await ctx.get<number>("count")) ?? 0;
            ctx.set("count", count + 1);
            const name = ctx.key;

            return `${greeting} ${name} - ${text}`;
        }
    },
});
// <end_here>

