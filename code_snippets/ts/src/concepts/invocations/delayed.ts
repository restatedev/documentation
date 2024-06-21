import * as restate from "@restatedev/restate-sdk";
import { greetCounter, greeter } from "./utils";

// <start_delayed_call>
async function myRestateHandler(ctx: restate.Context) {
  // focus
  ctx
    // focus
    .serviceSendClient(greeter, { delay: 1000 })
    // focus
    .greet({ greeting: "Hi" });
}
// <end_delayed_call>
