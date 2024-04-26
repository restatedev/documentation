import * as restate from "@restatedev/restate-sdk-clients";
import {greetCounterObject, greeterService} from "./utils";


const myPlainTSFunction = async () => {
    // <start_connect>
    const ingress = restate.connect({ url: "http://localhost:8080" });
    // <end_connect>

    // <start_rpc_call_node>
    const greet = await ingress.serviceClient(greeterService)
        .greet({ greeting: "Hi" });

    const count = await ingress.objectClient(greetCounterObject, "Mary")
        .greet({ greeting: "Hi" });
    // <end_rpc_call_node>

    // <start_one_way_call_node>
    const { invocationId } = await ingress
        .serviceSendClient(greeterService)
        .greet({greeting: "Hi"});

    await ingress.objectSendClient(greetCounterObject, "Mary")
        .greet({greeting: "Hi"});
    // <end_one_way_call_node>

    // <start_delayed_call_node>
    await ingress
        .serviceSendClient(greeterService)
        .greet({greeting: "Hi"},
            restate.SendOpts.from({ delay: 1000 }));

    await ingress.objectSendClient(greetCounterObject, "Mary")
        .greet({greeting: "Hi"},
            restate.SendOpts.from({ delay: 1000 }));
    // <end_delayed_call_node>
}