import * as restate from "@restatedev/restate-sdk-clients";
import {greetCounterObject, greeterService, myWorkflow} from "../utils";

// <start_rpc_call_node>
const myPlainTSFunction = async () => {
    // focus(1:11)
    // From any TS code:
    const rs = restate.connect({ url: "http://localhost:8080" });

    const greet = await rs.serviceClient(greeterService)
        .greet({ greeting: "Hi" });

    const count = await rs.objectClient(greetCounterObject, "Mary")
        .greet({ greeting: "Hi" });

    const result = await rs.workflowClient(myWorkflow, "wf-id-1")
        .workflowSubmit({ input: "Hi" });
}
// <end_rpc_call_node>