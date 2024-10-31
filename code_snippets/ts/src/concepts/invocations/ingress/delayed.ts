import * as restate from "@restatedev/restate-sdk-clients";
import { greeter } from "../utils";

// <start_delayed_call_node>
const myPlainTSFunction = async () => {
  // !focus
  const rs = restate.connect({ url: "http://localhost:8080" });
  // !focus
  await rs
    // !focus
    .serviceSendClient(greeter)
    // !focus
    .greet({ greeting: "Hi" }, restate.rpc.sendOpts({ delay: 1000 }));
};
// <end_delayed_call_node>
