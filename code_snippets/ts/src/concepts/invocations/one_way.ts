import * as restate from "@restatedev/restate-sdk";
import {greetCounterObject, greeterService} from "./utils";

// <start_one_way_call>
async function myRestateHandler(ctx: restate.Context) {
    // focus
    ctx.serviceSendClient(greeterService)
        // focus
        .greet({greeting: "Hi"});

    // focus
    ctx.objectSendClient(greetCounterObject, "Mary")
        // focus
        .greet({greeting: "Hi"});
}
// <end_one_way_call>