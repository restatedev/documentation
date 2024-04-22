import * as restate from "@restatedev/restate-sdk";
import {greetCounterObject, greeterService} from "./utils";

// <start_rpc_call>
async function myRestateHandler(ctx: restate.Context) {
    // focus
    const greet = await ctx.serviceClient(greeterService)
        // focus
        .greet({greeting: "Hi"});

    // focus
    const count = await ctx.objectClient(greetCounterObject, "Mary")
        // focus
        .greet({greeting: "Hi"});
}
// <end_rpc_call>