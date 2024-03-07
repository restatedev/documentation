import * as restate from "@restatedev/restate-sdk";

const greeterRouter = restate.router({
    greet:    async(ctx: restate.Context, name: string) => { /*...*/ }
});

// Option 1: export only the type signature of the router
export type myGreeterApiType = typeof greeterRouter;

// Option 2: export the API definition with type and name (path)
export const myGreeterApi: restate.ServiceApi<typeof greeterRouter> = { path : "greeter" };

restate.endpoint().bindRouter("greeter", greeterRouter).listen(9080);