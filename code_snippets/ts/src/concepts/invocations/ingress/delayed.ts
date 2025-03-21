import * as restate from "@restatedev/restate-sdk-clients";
import { greeter } from "../utils";

// <start_delayed_call_node>
const myFunction = async () => {
  // !focus(1:5)
  // From any TypeScript/JavaScript function
  const restateClient = restate.connect({ url: "http://localhost:8080" });
  await restateClient
    .serviceSendClient(greeter)
    .greet({ greeting: "Hi" }, restate.rpc.sendOpts({ delay: 1000 }));
};
// <end_delayed_call_node>
