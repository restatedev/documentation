import * as restate from "@restatedev/restate-sdk";
import {greetCounterObject, greeterService} from "./utils";

// <start_delayed_call>
async function myRestateHandler(ctx: restate.Context) {
    // focus
    ctx.serviceSendClient(greeterService, { delay: 1000 })
        // focus
        .greet({greeting: "Hi"});

    // focus
    ctx.objectSendClient(greetCounterObject, "Mary", { delay: 1000 })
        // focus
        .greet({greeting: "Hi"});
}
// <end_delayed_call>