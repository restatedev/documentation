// <start_api_export>
import * as restate from "@restatedev/restate-sdk";

const greeter = restate.service({
    name: "Greeter",
    handlers: {
        greet: async (ctx: restate.Context, name: string) => {
            return `Hello ${name}!`;
        }
    }
});

export const Greeter: typeof greeter = { name: "Greeter" };

const greeterObject = restate.object({
    name: "Greeter",
    handlers: {
        greet: async (ctx: restate.Context, name: string) => {
            return `Hello ${name}!`;
        }
    }
});

export const GreeterObject: typeof greeterObject = { name: "Greeter" };

restate.endpoint().bind(greeter).listen();
// <end_api_export>


//----------------------------------------------------------------
// Caller side
const router = restate.service({
    name: "Router",
    handlers: {
        greet: async (ctx: restate.Context, name: string) => {
            // <start_request_response>
            const responseService = await ctx.serviceClient(Greeter).greet("Restate");
            const responseGreeter = await ctx.objectClient(GreeterObject, "Mary").greet("Restate");
            // <end_request_response>

            // <start_one_way>
            ctx.serviceSendClient(Greeter).greet("Restate");

            ctx.objectSendClient(GreeterObject, "Mary").greet("Restate");
            // <end_one_way>

            // <start_delayed>
            ctx.serviceSendClient(Greeter, { delay: 5000 }).greet("Restate");

            ctx.objectSendClient(GreeterObject, "Mary", { delay: 5000 }).greet("Restate");
            // <end_delayed>
        },
    }
})
