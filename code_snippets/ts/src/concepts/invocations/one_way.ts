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

// <start_one_way_call_node>
const myNodeHandler = async () => {
    // focus
    // From any NodeJS code:
    // focus
    const ingress = restate.ingress
        // focus
        .connect({ url: "http://localhost:8080" });

    // focus
    ingress.objectSendClient(greetCounterObject, "Mary")
        // focus
        .greet({ greeting: "Hi" });

    // focus
    ingress.serviceSendClient(greeterService)
        // focus
        .greet({ greeting: "Hi" });
}
// <end_one_way_call_node>