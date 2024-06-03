import * as restate from "@restatedev/restate-sdk";
import {greetCounterObject, greeterService, myWorkflow} from "./utils";

// <start_rpc_call>
async function myRestateHandler(ctx: restate.Context) {
    // focus(1:8)
    const greet = await ctx.serviceClient(greeterService)
        .greet({greeting: "Hi"});

    const count = await ctx.objectClient(greetCounterObject, "Mary")
        .greet({greeting: "Hi"});

    const result = await ctx.workflowClient(myWorkflow, "wf-id-1")
        .run({input: "Hi"});
}
// <end_rpc_call>