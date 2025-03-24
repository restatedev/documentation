import * as restate from "@restatedev/restate-sdk";
import { greetCounter, greeter } from "./utils";

// <start_delayed_call>
async function myRestateHandler(ctx: restate.Context) {
  // !focus(1:4)
  // From a Restate handler
  ctx
    .serviceSendClient(greeter)
    .greet({ greeting: "Hi" }, restate.rpc.sendOpts({ delay: 1000 }));
}
// <end_delayed_call>
