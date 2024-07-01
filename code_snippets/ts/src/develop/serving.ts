import * as http2 from "http2";

const myService = restate.service({
  name: "MyService",
  handlers: {},
});

const myVirtualObject = restate.object({
  name: "MyVirtualObject",
  handlers: {},
});

const myWorkflow = restate.workflow({
  name: "MyWorkflow",
  handlers: { run: async () => {} },
});

// <start_endpoint>
import * as restate from "@restatedev/restate-sdk";
restate
  .endpoint()
  .bind(myService)
  .bind(myVirtualObject)
  .bind(myWorkflow)
  .listen();
// <end_endpoint>

// <start_custom_endpoint>
const http2Handler = restate
  .endpoint()
  .bind(myService)
  .bind(myVirtualObject)
  .bind(myWorkflow)
  // withClass highlight-line
  .http2Handler();
// withClass highlight-line
const httpServer = http2.createServer(http2Handler);
httpServer.listen();
// <end_custom_endpoint>
