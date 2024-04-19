import * as restate from "@restatedev/restate-sdk";
import * as http2 from "http2";

const myService = restate.service({
    name: "MyService",
    handlers: {}
});

const myVirtualObject = restate.object({
    name: "MyVirtualObject",
    handlers: {}
});

// <start_endpoint>
restate
    .endpoint()
    .bind(myService)
    .bind(myVirtualObject)
    .listen();
// <end_endpoint>


// <start_custom_endpoint>
const http2Handler = restate
    .endpoint()
    .bind(myService)
    .bind(myVirtualObject)
    // withClass highlight-line
    .http2Handler()
    // withClass highlight-line
const httpServer = http2.createServer(http2Handler);
httpServer.listen();
// <end_custom_endpoint>

// <start_lambda>
export const handler = restate
    .endpoint()
    .bind(myService)
    .bind(myVirtualObject)
    // withClass highlight-line
    .lambdaHandler();
// <end_lambda>