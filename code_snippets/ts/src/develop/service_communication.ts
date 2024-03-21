// <start_api_export>
import * as restate from "@restatedev/restate-sdk";

const greeterRouter = restate.router({
    greet:    async(ctx: restate.Context, name: string) => { /*...*/ }
});

// Option 1: export only the type signature of the router
export type myGreeterApiType = typeof greeterRouter;

// Option 2: export the API definition with type and name (path)
export const myGreeterApi: restate.ServiceApi<typeof greeterRouter> = { path : "greeter" };

restate.endpoint().bindRouter("greeter", greeterRouter).listen(9080);
// <end_api_export>


//----------------------------------------------------------------
// Caller side
const router = restate.router({
    greet: async (ctx: restate.Context, name: string) => {
        // <start_request_response>
        // option 1: use full API spec
        const response1 = await ctx.rpc(myGreeterApi).greet("Restate");

        // option 2: use only types and supply service name separately
        const response2 = await ctx.rpc<myGreeterApiType>({path: "greeter"}).greet("Pete");
        // <end_request_response>


        // <start_one_way>
        // option 1: use full API spec
        ctx.send(myGreeterApi).greet("Restate");

        // option 2: use only types and supply service name separately
        ctx.send<myGreeterApiType>({path: "greeter"}).greet("Restate");
        // <end_one_way>

        // <start_delayed>
        // option 1: use full API spec
        ctx.sendDelayed(myGreeterApi, 5000).greet("Restate");

        // option 1: use only types and supply service name separately
        ctx.sendDelayed<myGreeterApiType>({path: "greeter"}, 5000).greet("Restate");
        // <end_delayed>

    },
})
