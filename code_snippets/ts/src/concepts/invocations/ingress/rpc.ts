import * as restate from "@restatedev/restate-sdk-clients";
import { greetCounter, greeter, myWorkflow } from "../utils";

// <start_rpc_call_node>
const myFunction = async () => {
  // !focus(1:5)
  // From any TypeScript/JavaScript function
  const restateClient = restate.connect({ url: "http://localhost:8080" });
  const greet = await restateClient
    .serviceClient(greeter)
    .greet({ greeting: "Hi" });
};
// <end_rpc_call_node>
