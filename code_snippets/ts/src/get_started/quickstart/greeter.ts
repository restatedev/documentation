import * as restate from "@restatedev/restate-sdk";
import {
    Context,
} from "@restatedev/restate-sdk";

// <start_here>
const greeter = restate.object({
    name: "Greeter",
    handlers: {
        greet: async (ctx: Context, text: string) => {
            // this is a persistent workflow step. the result of the function is
            // durably committed before it is returned and further steps can execute
            const greeting = ctx.run(() =>
                Math.random() < 0.5 ? "Hello!" : "Howdy!");

            // this is a delay during which the code may suspend (if running on FaaS)
            ctx.sleep(2000);

            return `${greeting} - ${text}`;
        }
    },
});
// <end_here>

