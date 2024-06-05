package operate.invocations;

import dev.restate.sdk.Context;
import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.client.Client;
import dev.restate.sdk.client.SendResponse;
import dev.restate.sdk.common.Output;
import develop.MyWorkflowClient;

import java.time.Duration;

import static dev.restate.sdk.client.CallRequestOptions.DEFAULT;

public class Ingress {

    public void myJavaHandler(Context ctx) {
        // <start_rpc_java>
        Client restate = Client.connect("http://localhost:8080");
        String greet = GreeterServiceClient
            .fromClient(restate)
            .greet("Hi");

        int count = GreetCounterObjectClient
            .fromClient(restate, "Mary")
            .greet("Hi");
        // <end_rpc_java>
    }

    public void myOneWayCallHandler(Context ctx) {

        // <start_one_way_call_java>
        Client restate = Client.connect("http://localhost:8080");
        GreeterServiceClient
                .fromClient(restate)
                .send()
                .greet("Hi");

        GreetCounterObjectClient
                .fromClient(restate, "Mary")
                .send()
                .greet("Hi");

        MyWorkflowClient
                .fromClient(restate, "wf-id-1")
                .submit("input");
        // <end_one_way_call_java>
    }

    public void myDelayedOneWayCallHandler(Context ctx) {
        // <start_delayed_call_java>
        Client restate = Client.connect("http://localhost:8080");
        GreeterServiceClient
            .fromClient(restate)
            .send(Duration.ofMillis(1000))
            .greet("Hi");

        GreetCounterObjectClient
            .fromClient(restate, "Mary")
            .send(Duration.ofMillis(1000))
            .greet("Hi");
        // <end_delayed_call_java>

    }

    public void idempotentInvoke(){
        // <start_service_idempotent>
        Client restate = Client.connect("http://localhost:8080");
        GreetCounterObjectClient
            .fromClient(restate, "Mary")
            .send(Duration.ofMillis(1000))
            // withClass highlight-line
            .greet( "Hi", DEFAULT.withIdempotency("abcde"));
        // <end_service_idempotent>
    }

    public void latchOntoService(){

        // <start_service_attach>
        Client restate = Client.connect("http://localhost:8080");
        SendResponse handle = GreeterServiceClient.fromClient(restate)
            .send()
            .greet("Hi", DEFAULT.withIdempotency("abcde"));

        // ... do something else ...

        // Attach later to retrieve the result
        // withClass(1:3) highlight-line
        String greeting = restate
            .invocationHandle(handle.getInvocationId(), JsonSerdes.STRING)
            .attach();

        // Or peek to see if the result is ready
        Output<String> output = restate
            .invocationHandle(handle.getInvocationId(), JsonSerdes.STRING)
            .getOutput();

        if (output.isReady()) {
            String result = output.getValue();
        }
        // <end_service_attach>

    }

    public void latchOntoWorkflow(){

        // <start_workflow_attach>
        Client restate = Client.connect("http://localhost:8080");
        SendResponse handle = MyWorkflowClient
                .fromClient(restate, "wf-id-1")
                .submit("input");

        // If you have access to the workflow handle:
        // withClass(1:3) highlight-line
        String response = restate
                .invocationHandle(handle.getInvocationId(), JsonSerdes.STRING)
                .attach();

        // If you do not have access to the workflow handle, use the workflow ID:
        String response2 = MyWorkflowClient
                .fromClient(restate, "wf-id-1")
                // withClass(1:2) highlight-line
                .workflowHandle()
                .attach();
        // <end_workflow_attach>

        // <start_workflow_peek>
        // If you have access to the workflow handle:
        // withClass(1:3) highlight-line
        Output<String> output = restate
                .invocationHandle(handle.getInvocationId(), JsonSerdes.STRING)
                .getOutput();

        if (output.isReady()) {
            String result = output.getValue();
        }

        // If you do not have access to the workflow handle, use the workflow ID:
        Output<String> output2 = MyWorkflowClient
                .fromClient(restate, "wf-id-1")
                // withClass(1:2) highlight-line
                .workflowHandle()
                .getOutput();
        // <end_workflow_peek>

    }
}
