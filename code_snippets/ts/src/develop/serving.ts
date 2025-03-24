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
  // !mark
  .http2Handler();
// !mark
const httpServer = http2.createServer(http2Handler);
httpServer.listen();
// <end_custom_endpoint>

// <start_identity>
restate
  .endpoint()
  .bind(myService)
  // !mark
  .withIdentityV1("publickeyv1_w7YHemBctH5Ck2nQRQ47iBBqhNHy4FV7t2Usbye2A6f")
  .listen();
// <end_identity>
