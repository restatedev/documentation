import {greetCounterObject, greeterService} from "./utils";
import {SendOpts} from "@restatedev/restate-sdk-clients";
import {myWorkflow} from "../../concepts/invocations/utils";

// <start_clients_import>
import * as clients from "@restatedev/restate-sdk-clients";
// <end_clients_import>

const myPlainTSFunction = async () => {
    // <start_rpc_call_node>
        const rs = clients.connect({url: "http://localhost:8080"});
        const greet = await rs.serviceClient(greeterService)
            .greet({greeting: "Hi"});

        const count = await rs.objectClient(greetCounterObject, "Mary")
            .greet({greeting: "Hi"});

        // You cannot **submit** workflows via request-response with the clients.
        // You can call the other handlers of workflows via request-response.
        const response = await rs.workflowClient(myWorkflow, "wf-id-1")
            .myOtherHandler({input: "Hi"});
    // <end_rpc_call_node>
}

const myPlainTSFunction2 = async () => {
    // <start_one_way_call_node>
    const rs = clients.connect({url: "http://localhost:8080"});
    await rs.serviceSendClient(greeterService)
        .greet({greeting: "Hi"});

    await rs.objectSendClient(greetCounterObject, "Mary")
        .greet({greeting: "Hi"});

    await rs.workflowClient(myWorkflow, "wf-id-1")
        .workflowSubmit({input: "Hi"});
    // You cannot yet do one-way calls to other handlers of the workflows
    // <end_one_way_call_node>
}

const myPlainTSFunction3 = async () => {
    // <start_delayed_call_node>
    const rs = clients.connect({url: "http://localhost:8080"});
    await rs.serviceSendClient(greeterService)
        .greet({greeting: "Hi"}, SendOpts.from({ delay: 1000 }));

    await rs.objectSendClient(greetCounterObject, "Mary")
        .greet({greeting: "Hi"}, SendOpts.from({ delay: 1000 }));

    // You cannot call any workflow handlers via delayed calls with the clients.
    // <end_delayed_call_node>
}

const servicesIdempotent = async () => {
    const request = {greeting: "Hi"}
    // <start_service_idempotent>
    const rs = clients.connect({url: "http://localhost:8080"});
    await rs.serviceSendClient(greeterService)
        // withClass highlight-line
        .greet(request, SendOpts.from({ idempotencyKey: "abcde" }));
    // <end_service_idempotent>
}

const servicesAttach = async () => {
    const request = {greeting: "Hi"}
    // <start_service_attach>
    const rs = clients.connect({url: "http://localhost:8080"});
    // Send a message
    const handle = await rs.serviceSendClient(greeterService)
        .greet(request, SendOpts.from({ idempotencyKey: "abcde" }));

    // ... do something else ...

    // Attach later to retrieve the result
    // withClass highlight-line
    const response = await rs.result(handle);
    // <end_service_attach>
}

const workflowAttach = async () => {
    // <start_workflow_attach>
    const rs = clients.connect({url: "http://localhost:8080"});

    // Submit the workflow
    const handle = await rs.workflowClient(myWorkflow, "wf-id-1")
        .workflowSubmit({input: "Hi"});

    // ... do something else ...

    // Attach by using the handle:
    // withClass highlight-line
    const result = await rs.result(handle);

    // Or, attach by using the workflow ID (from another service):
    // withClass highlight-line
    const result2 = await rs.workflowClient(myWorkflow, "wf-id-1").workflowAttach();
    // <end_workflow_attach>
}

const workflowPeek = async () => {
    // <start_workflow_peek>
    const rs = clients.connect({url: "http://localhost:8080"});

    // Peek at the output by using the workflow ID (from another service):
    // withClass highlight-line
    const output = await rs.workflowClient(myWorkflow, "wf-id-1").workflowOutput();
    // If the workflow is ready, do something with the result
    if (output.ready) {
        console.log(output.result);
    }
    // <end_workflow_peek>
}
