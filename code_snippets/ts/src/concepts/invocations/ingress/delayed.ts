import * as restate from "@restatedev/restate-sdk-clients";
import { greetCounter, greeter } from "../utils";
import { SendOpts } from "@restatedev/restate-sdk-clients";

// <start_delayed_call_node>
const myPlainTSFunction = async () => {
  // focus
  const rs = restate.connect({ url: "http://localhost:8080" });
  // focus
  await rs
    // focus
    .serviceSendClient(greeter)
    // focus
    .greet({ greeting: "Hi" }, SendOpts.from({ delay: 1000 }));
};
// <end_delayed_call_node>
