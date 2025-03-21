import * as restate from "@restatedev/restate-sdk";
import { greetCounter, greeter, myWorkflow } from "./utils";

// <start_one_way_call>
async function myRestateHandler(ctx: restate.Context) {
  // !focus(1:2)
  // From a Restate handler
  ctx.serviceSendClient(greeter).greet({ greeting: "Hi" });
}
// <end_one_way_call>
