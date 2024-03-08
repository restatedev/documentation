import * as restate from "@restatedev/restate-sdk";
import * as http2 from "http2";

// <start_unkeyed>
const serviceRouter = restate.router({
    hello: async () => { /* ... */ },
    callMe: async (ctx: restate.Context) => { /* ... */ },
    maybe: async (ctx: restate.Context, request: Request) => { /* ... */ }
});
// <end_unkeyed>

// <start_keyed>
const keyedServiceRouter = restate.keyedRouter({
    hello: async () => { /* ... */ },
    callMe: async (ctx: restate.KeyedContext) => { /* ... */ },
    maybe: async (ctx: restate.KeyedContext, key: string) => { /* ... */ },
    withSomething: async (ctx: restate.KeyedContext, key: string, request: Request) => { /* ... */ }
});
// <end_keyed>

// <start_unkeyed_api>
export const myServiceApi: restate.ServiceApi<typeof serviceRouter> = {
    path: "myServicePath",
};
// <end_unkeyed_api>

// <start_keyed_api>
export const myKeyedServiceApi: restate.ServiceApi<typeof keyedServiceRouter> = {
    path: "myServicePath",
};
// <end_keyed_api>


// <start_endpoint>
restate
    .endpoint()
    // bind the keyed services to the Restate server
    .bindRouter(myServiceApi.path, serviceRouter)
    // bind the unkeyed services to the Restate server
    .bindKeyedRouter(myKeyedServiceApi.path, keyedServiceRouter)
    .listen(9080);
// <end_endpoint>


// <start_custom_endpoint>
const http2Handler = restate
    .endpoint()
    .bindRouter(myServiceApi.path, serviceRouter)
    .http2Handler()
const httpServer = http2.createServer(http2Handler);
httpServer.listen(9080);
// <end_custom_endpoint>

// <start_lambda>
export const handler = restate
    .endpoint()
    .bindRouter(myServiceApi.path, serviceRouter)
    .bindKeyedRouter(myKeyedServiceApi.path, keyedServiceRouter)
    //highlight-next-line
    .lambdaHandler();
// <end_lambda>