import * as restate from "@restatedev/restate-sdk-ingress";
import {greetCounterObject, greeterService} from "../utils";

// <start_one_way_call_node>
const myNodeHandler = async () => {
    // focus
    // From any NodeJS code:
    // focus
    const ingress = restate.connect({ url: "http://localhost:8080" });

    // focus
    await ingress.objectSendClient(greetCounterObject, "Mary")
        // focus
        .greet({greeting: "Hi"});

    // focus
    await ingress.serviceSendClient(greeterService)
        // focus
        .greet({greeting: "Hi"});
}
// <end_one_way_call_node>