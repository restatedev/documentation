import * as restate from "@restatedev/restate-sdk";
import {greetCounterObject, greeterService, myWorkflow} from "./utils";

// <start_one_way_call>
async function myRestateHandler(ctx: restate.Context) {
    // focus(1:8)
    ctx.serviceSendClient(greeterService)
        .greet({greeting: "Hi"});

    ctx.objectSendClient(greetCounterObject, "Mary")
        .greet({greeting: "Hi"});

    ctx.workflowSendClient(myWorkflow, "wf-id-1")
        .run({input: "Hi"});
}
// <end_one_way_call>