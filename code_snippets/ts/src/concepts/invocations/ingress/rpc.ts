import * as restate from "@restatedev/restate-sdk-ingress";
import {greetCounterObject, greeterService} from "../utils";

// <start_rpc_call_node>
const myNodeHandler = async () => {
    // focus
    // From any NodeJS code:
    // focus
    const ingress = restate.connect({ url: "http://localhost:8080" });

    // focus
    const greet = await ingress.serviceClient(greeterService)
        // focus
        .greet({ greeting: "Hi" });

    // focus
    const count = await ingress.objectClient(greetCounterObject, "Mary")
        // focus
        .greet({ greeting: "Hi" });
}
// <end_rpc_call_node>