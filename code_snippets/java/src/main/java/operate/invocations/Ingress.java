package operate.invocations;

import dev.restate.sdk.Context;
import dev.restate.sdk.client.CallRequestOptions;
import dev.restate.sdk.client.IngressClient;
import develop.MyWorkflowClient;

import java.time.Duration;

public class Ingress {

    public void myJavaHandler(Context ctx) {
        // <start_rpc_java>
        String greet = GreeterServiceClient
            .fromIngress("http://localhost:8080")
            .greet("Hi");

        int count = GreetCounterObjectClient
            .fromIngress("http://localhost:8080", "Mary")
            .greet("Hi");
        // <end_rpc_java>
    }

    public void myOneWayCallHandler(Context ctx) {

        // <start_one_way_call_java>
        GreeterServiceClient
            .fromIngress("http://localhost:8080")
            .send()
            .greet("Hi");

        GreetCounterObjectClient
            .fromIngress("http://localhost:8080", "Mary")
            .send()
            .greet("Hi");

        MyWorkflowClient
            .fromIngress("http://localhost:8080", "wf-id-1")
            .submit("input");
        // <end_one_way_call_java>

        // <start_delayed_call_java>
        GreeterServiceClient
            .fromIngress("http://localhost:8080")
            .send(Duration.ofMillis(1000))
            .greet("Hi");

        GreetCounterObjectClient
            .fromIngress("http://localhost:8080", "Mary")
            .send(Duration.ofMillis(1000))
            .greet("Hi");
        // <end_delayed_call_java>

    }

    public void idempotentInvoke(){
        // <start_service_idempotent>
        String count = GreetCounterObjectClient
            .fromIngress("http://localhost:8080", "Mary")
            .send(Duration.ofMillis(1000))
            .greet(
                "Hi",
                // withClass highlight-line
                CallRequestOptions.DEFAULT.withIdempotency("abcde")
            );
        // <end_service_idempotent>
    }

    public void latchOntoWorkflow(){

        // <start_workflow_attach>
        IngressClient.WorkflowHandle<String> handle = MyWorkflowClient
                .fromIngress("http://localhost:8080", "wf-id-1")
                .submit("input");

        // If you have access to the workflow handle:
        // withClass highlight-line
        String response = handle.attach();

        // If you do not have access to the workflow handle, use the workflow ID:
        String response2 = MyWorkflowClient
                .fromIngress("http://localhost:8080", "wf-id-1")
                // withClass(1:2) highlight-line
                .workflowHandle()
                .attach();
        // <end_workflow_attach>

        // <start_workflow_peek>
        // If you have access to the workflow handle:
        // withClass highlight-line
        String peekResponse = handle.getOutput();

        // If you do not have access to the workflow handle, use the workflow ID:
        String peekResponse2 = MyWorkflowClient
                .fromIngress("http://localhost:8080", "wf-id-1")
                // withClass(1:2) highlight-line
                .workflowHandle()
                .getOutput();
        // <end_workflow_peek>

    }
}
