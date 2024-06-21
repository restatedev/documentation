import * as restate from "@restatedev/restate-sdk";
import { greetCounter, greeter, myWorkflow } from "./utils";

// <start_one_way_call>
async function myRestateHandler(ctx: restate.Context) {
  // focus
  ctx
    // focus
    .serviceSendClient(greeter)
    // focus
    .greet({ greeting: "Hi" });
}
// <end_one_way_call>
