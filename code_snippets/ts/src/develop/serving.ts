import * as restate from "@restatedev/restate-sdk";
import * as http2 from "http2";

// <start_unkeyed>
const myService = restate.service({
    name: "MyService",
    handlers: {
        hello: async () => { /* ... */ },
        callMe: async (ctx: restate.Context) => { /* ... */ },
        maybe: async (ctx: restate.Context, request: Request) => { /* ... */ }
    }
});
// <end_unkeyed>

// <start_keyed>
const myVirtualObject = restate.object({
    name: "MyVirtualObject",
    handlers: {
        hello: async () => { /* ... */ },
        callMe: async (ctx: restate.ObjectContext) => { /* ... */ },
        maybe: async (ctx: restate.ObjectContext, request: Request) => { /* ... */ },
    }

});
// <end_keyed>

// <start_unkeyed_api>
export const MyService: typeof myService = { name: "MyService" };
// <end_unkeyed_api>

// <start_keyed_api>
export const MyVirtualObject: typeof myVirtualObject = { name: "MyVirtualObject" };
// <end_keyed_api>


// <start_endpoint>
restate
    .endpoint()
    // bind the keyed services to the Restate server
    .bind(myService)
    // bind the unkeyed services to the Restate server
    .bind(myVirtualObject)
    .listen(9080);
// <end_endpoint>


// <start_custom_endpoint>
const http2Handler = restate
    .endpoint()
    .bind(myService)
    .http2Handler()
const httpServer = http2.createServer(http2Handler);
httpServer.listen(9080);
// <end_custom_endpoint>

// <start_lambda>
export const handler = restate
    .endpoint()
    .bind(myService)
    .bind(myVirtualObject)
    //highlight-next-line
    .lambdaHandler();
// <end_lambda>