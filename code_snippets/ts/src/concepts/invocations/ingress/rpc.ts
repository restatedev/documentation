import * as restate from "@restatedev/restate-sdk-clients";
import {greetCounterObject, greeterService, myWorkflow} from "../utils";

// <start_rpc_call_node>
const myPlainTSFunction = async () => {
    // focus(1:11)
    // From any TS code:
    const ingress = restate.connect({ url: "http://localhost:8080" });

    const greet = await ingress.serviceClient(greeterService)
        .greet({ greeting: "Hi" });

    const count = await ingress.objectClient(greetCounterObject, "Mary")
        .greet({ greeting: "Hi" });

    const result = await ingress.workflowClient(myWorkflow, "wf-id-1")
        .workflowSubmit({ input: "Hi" });
}
// <end_rpc_call_node>