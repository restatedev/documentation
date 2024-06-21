import * as restate from "@restatedev/restate-sdk-clients";
import { greetCounter, greeter, myWorkflow } from "../utils";

// <start_rpc_call_node>
const myPlainTSFunction = async () => {
  // focus
  const rs = restate.connect({ url: "http://localhost:8080" });
  // focus
  const greet = await rs
    // focus
    .serviceClient(greeter)
    // focus
    .greet({ greeting: "Hi" });
};
// <end_rpc_call_node>
