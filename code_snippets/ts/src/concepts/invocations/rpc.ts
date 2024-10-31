import * as restate from "@restatedev/restate-sdk";
import { greetCounter, greeter, myWorkflow } from "./utils";

// <start_rpc_call>
async function myRestateHandler(ctx: restate.Context) {
  // !focus
  const greet = await ctx
    // !focus
    .serviceClient(greeter)
    // !focus
    .greet({ greeting: "Hi" });
}
// <end_rpc_call>
