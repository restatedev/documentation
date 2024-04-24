import * as restate from "@restatedev/restate-sdk-ingress";
import {greetCounterObject, greeterService} from "../utils";

// <start_one_way_call_node>
const myPlainTSFunction = async () => {
    // focus(1:7)
    // From any TS code:
    const ingress = restate.connect({ url: "http://localhost:8080" })

    const { invocationId } = await ingress
        .serviceSendClient(greeterService)
        .greet({greeting: "Hi"});

    await ingress.objectSendClient(greetCounterObject, "Mary")
        .greet({greeting: "Hi"});

}
// <end_one_way_call_node>