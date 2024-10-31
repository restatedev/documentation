import * as restate from "@restatedev/restate-sdk-clients";
import { greetCounter, greeter } from "../utils";

// <start_one_way_call_node>
const myPlainTSFunction = async () => {
  // !focus
  const rs = restate.connect({ url: "http://localhost:8080" });
  // !focus
  await rs
    // !focus
    .serviceSendClient(greeter)
    // !focus
    .greet({ greeting: "Hi" });
};
// <end_one_way_call_node>
