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
        Client rs = Client.connect("http://localhost:8080");
        String greet = GreeterServiceClient.fromClient(rs)
            .greet("Hi");

        int count = GreetCounterObjectClient.fromClient(rs, "Mary")
            .greet("Hi");
        // <end_rpc_java>
    }

    public void myOneWayCallHandler(Context ctx) {

        // <start_one_way_call_java>
        Client rs = Client.connect("http://localhost:8080");
        GreeterServiceClient.fromClient(rs)
                .send()
                .greet("Hi");

        GreetCounterObjectClient.fromClient(rs, "Mary")
                .send()
                .greet("Hi");

        MyWorkflowClient.fromClient(rs, "wf-id-1")
                .submit("input");
        // <end_one_way_call_java>
    }

    public void myDelayedOneWayCallHandler(Context ctx) {
        // <start_delayed_call_java>
        Client rs = Client.connect("http://localhost:8080");
        GreeterServiceClient.fromClient(rs)
            .send(Duration.ofMillis(1000))
            .greet("Hi");

        GreetCounterObjectClient.fromClient(rs, "Mary")
            .send(Duration.ofMillis(1000))
            .greet("Hi");
        // <end_delayed_call_java>

    }

    public void idempotentInvoke(){
        // <start_service_idempotent>
        Client rs = Client.connect("http://localhost:8080");
        GreetCounterObjectClient.fromClient(rs, "Mary")
            .send()
            // withClass highlight-line
            .greet( "Hi", DEFAULT.withIdempotency("abcde"));
        // <end_service_idempotent>
    }

    public void attach() {

        // <start_service_attach>
        Client rs = Client.connect("http://localhost:8080");
        SendResponse handle = GreeterServiceClient.fromClient(rs)
                .send()
                .greet("Hi", DEFAULT.withIdempotency("abcde"));

        // ... do something else ...

        // Attach later to retrieve the result
        // withClass(1:3) highlight-line
        String greeting = rs
                .invocationHandle(handle.getInvocationId(), JsonSerdes.STRING)
                .attach();
        // <end_service_attach>
    }

    public void peekAtOutput(){
        // <start_service_peek>
        Client rs = Client.connect("http://localhost:8080");
        SendResponse handle = GreeterServiceClient.fromClient(rs)
                .send()
                .greet("Hi", DEFAULT.withIdempotency("abcde"));

        // ... do something else ...

        // Peek to see if the result is ready
        // withClass(1:3) highlight-line
        Output<String> output = rs
            .invocationHandle(handle.getInvocationId(), JsonSerdes.STRING)
            .getOutput();

        if (output.isReady()) {
            String result = output.getValue();
        }
        // <end_service_peek>
    }

    public void latchOntoWorkflow(){

        // <start_workflow_attach>
        Client rs = Client.connect("http://localhost:8080");
        SendResponse handle = MyWorkflowClient
                .fromClient(rs, "wf-id-1")
                .submit("input");

        // If you have access to the workflow handle:
        // withClass(1:3) highlight-line
        String response = rs
                .invocationHandle(handle.getInvocationId(), JsonSerdes.STRING)
                .attach();

        // If you do not have access to the workflow handle, use the workflow ID:
        String response2 = MyWorkflowClient.fromClient(rs, "wf-id-1")
                // withClass(1:2) highlight-line
                .workflowHandle()
                .attach();
        // <end_workflow_attach>

        // <start_workflow_peek>
        // If you have access to the workflow handle:
        // withClass(1:3) highlight-line
        Output<String> output = rs
                .invocationHandle(handle.getInvocationId(), JsonSerdes.STRING)
                .getOutput();

        if (output.isReady()) {
            String result = output.getValue();
        }

        // If you do not have access to the workflow handle, use the workflow ID:
        Output<String> output2 = MyWorkflowClient.fromClient(rs, "wf-id-1")
                // withClass(1:2) highlight-line
                .workflowHandle()
                .getOutput();
        // <end_workflow_peek>

    }
}
