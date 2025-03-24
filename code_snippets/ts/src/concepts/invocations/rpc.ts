import * as restate from "@restatedev/restate-sdk";
import { greetCounter, greeter, myWorkflow } from "./utils";

// <start_rpc_call>
async function myRestateHandler(ctx: restate.Context) {
  // !focus(1:2)
  // From a Restate handler
  const greet = await ctx.serviceClient(greeter).greet({ greeting: "Hi" });
}
// <end_rpc_call>
