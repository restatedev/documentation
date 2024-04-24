import * as restate from "@restatedev/restate-sdk-ingress";
import {greetCounterObject, greeterService} from "../utils";

// <start_rpc_call_node>
const myPlainTSFunction = async () => {
    // focus
    // From any TS code:
    // focus(1:7)
    const ingress = restate.connect({ url: "http://localhost:8080" });

    const greet = await ingress.serviceClient(greeterService)
        .greet({ greeting: "Hi" });

    const count = await ingress.objectClient(greetCounterObject, "Mary")
        .greet({ greeting: "Hi" });
}
// <end_rpc_call_node>