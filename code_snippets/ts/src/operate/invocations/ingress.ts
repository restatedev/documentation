import * as restate from "@restatedev/restate-sdk-clients";
import {greetCounterObject, greeterService} from "./utils";
import {SendOpts} from "@restatedev/restate-sdk-clients";
import {myWorkflow} from "../../concepts/invocations/utils";


const myPlainTSFunction = async () => {
    // <start_connect>
    const rs = restate.connect({ url: "http://localhost:8080" });
    // <end_connect>

    // <start_rpc_call_node>
    const greet = await rs.serviceClient(greeterService)
        .greet({ greeting: "Hi" });

    const count = await rs.objectClient(greetCounterObject, "Mary")
        .greet({ greeting: "Hi" });

    const result = await rs.workflowClient(myWorkflow, "wf-id-1")
        .workflowSubmit({ input: "Hi" });
    // <end_rpc_call_node>

    // <start_one_way_call_node>
    const { invocationId } = await rs
        .serviceSendClient(greeterService)
        .greet({greeting: "Hi"});

    await rs.objectSendClient(greetCounterObject, "Mary")
        .greet({greeting: "Hi"});
    // <end_one_way_call_node>

    // <start_delayed_call_node>
    await rs
        .serviceSendClient(greeterService)
        .greet({greeting: "Hi"}, SendOpts.from({ delay: 1000 }));

    await rs.objectSendClient(greetCounterObject, "Mary")
        .greet({greeting: "Hi"}, SendOpts.from({ delay: 1000 }));
    // <end_delayed_call_node>
}

const servicesIdempotent = async () => {
    // <start_service_idempotent>
    const rs = restate.connect({url: "http://localhost:8080"});
    const send = await rs.serviceSendClient(greeterService)
        .greet(
            {greeting: "Hi"},
            // withClass highlight-line
            SendOpts.from({ idempotencyKey: "abcde" })
        );
    // <end_service_idempotent>
}

const servicesAttach = async () => {
    // <start_service_attach>
    const rs = restate.connect({url: "http://localhost:8080"});
    // Do one-way call
    const send = await rs.serviceSendClient(greeterService)
        .greet({greeting: "Hi"}, SendOpts.from({ idempotencyKey: "abcde" }));

    // ... do something else ...

    // Attach later to retrieve the result
    // withClass highlight-line
    const response = await rs.result(send);
    // <end_service_attach>
}

const workflowAttach = async () => {
    // <start_workflow_attach>
    const rs = restate.connect({url: "http://localhost:8080"});

    // Submit the workflow
    const handle = await rs.workflowClient(myWorkflow, "wf-id-1")
        .workflowSubmit({input: "Hi"});

    // ... do something else ...

    // Attach later to retrieve the result, by using the handle:
    // withClass highlight-line
    const count = await rs.result(handle);

    // Or, if you do not have the handle, you can use the workflow ID.
    // You can use this from within another service.
    // withClass highlight-line
    const count2 = await rs.workflowClient(myWorkflow, "wf-id-1").workflowAttach();
    // <end_workflow_attach>

    // <start_workflow_peek>
    // You can peek the output with the workflow ID.
    // You can use this from within another service.
    // withClass highlight-line
    const output = await rs.workflowClient(myWorkflow, "wf-id-1").workflowOutput();
    if (output.ready) {
        console.log(output.result);
    }
    // <end_workflow_peek>
}