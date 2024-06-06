import * as restate from "@restatedev/restate-sdk";
import {greetCounterObject, greeterService, myWorkflow} from "./utils";

// <start_delayed_call>
async function myRestateHandler(ctx: restate.Context) {
    // focus(1:5)
    ctx.serviceSendClient(greeterService, { delay: 1000 })
        .greet({greeting: "Hi"});

    ctx.objectSendClient(greetCounterObject, "Mary", { delay: 1000 })
        .greet({greeting: "Hi"});
}
// <end_delayed_call>