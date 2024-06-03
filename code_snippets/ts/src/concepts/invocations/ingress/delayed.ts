import * as restate from "@restatedev/restate-sdk-clients";
import {greetCounterObject, greeterService} from "../utils";
import {SendOpts} from "@restatedev/restate-sdk-clients";

// <start_delayed_call_node>
const myPlainTSFunction = async () => {
    // focus(1:8)
    // From any TS code:
    const ingress = restate.connect({ url: "http://localhost:8080" })

    const { invocationId } = await ingress.serviceSendClient(greeterService)
        .greet({greeting: "Hi"}, SendOpts.from({ delay: 1000 }));

    await ingress.objectSendClient(greetCounterObject, "Mary")
        .greet({greeting: "Hi"}, SendOpts.from({ delay: 1000 }));
}
// <end_delayed_call_node>