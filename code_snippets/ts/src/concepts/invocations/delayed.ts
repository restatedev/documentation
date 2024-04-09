import * as restate from "@restatedev/restate-sdk";
import {greetCounterObject, greeterService} from "./utils";

// <start_delayed_call>
async function myRestateHandler(ctx: restate.Context) {
    // focus
    ctx.serviceSendDelayedClient(greeterService, 1000)
        // focus
        .greet({greeting: "Hi"});

    // focus
    ctx.objectSendDelayedClient(greetCounterObject, 1000, "Mary")
        // focus
        .greet({greeting: "Hi"});
}
// <end_delayed_call>

// <start_delayed_call_node>
// to do...
// <end_delayed_call_node>