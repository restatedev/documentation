import * as restate from "@restatedev/restate-sdk-clients";
import {greetCounterObject, greeterService} from "../utils";

// <start_one_way_call_node>
const myPlainTSFunction = async () => {
    // focus(1:9)
    // From any TS code:
    const rs = restate.connect({url: "http://localhost:8080"})

    const sendHandle = await rs.serviceSendClient(greeterService)
        .greet({greeting: "Hi"});

    const sendHandle2 = await rs.objectSendClient(greetCounterObject, "Mary")
        .greet({greeting: "Hi"});
}
// <end_one_way_call_node>