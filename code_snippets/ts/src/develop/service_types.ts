import * as restate from "@restatedev/restate-sdk";

const greeterService = restate.object({
    name: "Greeter",
    handlers: {
        greet: async (ctx: restate.ObjectContext, name: string) => {

            // <start_ordering>
            ctx.objectSendClient(Greeter, "Mary").greet( 1);
            ctx.objectSendClient(Greeter, "Mary").greet(2);
            // <end_ordering>

        },
    }
})

const greeterObject = restate.object({
    name: "Greeter",
    handlers: {
        greet: async (ctx: restate.ObjectContext, count: number) => {
            return `Hello ${ctx.key}! ${count}`;
        }
    }
});

export const Greeter: typeof greeterObject = { name : "Greeter" };
