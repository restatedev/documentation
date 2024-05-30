package operate.invocations;

import dev.restate.sdk.Context;
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
        String invocationId = GreeterServiceClient
            .fromIngress("http://localhost:8080")
            .send()
            .greet("Hi");

        GreetCounterObjectClient
            .fromIngress("http://localhost:8080", "Mary")
            .send()
            .greet("Hi");

        IngressClient.WorkflowHandle<String> handle = MyWorkflowClient
            .fromIngress("http://localhost:8080", "wf-id-1")
            .submit("input");
        // <end_one_way_call_java>

        // <start_delayed_call_java>
        GreeterServiceClient
            .fromIngress("http://localhost:8080")
            .send(Duration.ofMillis(1000))
            .greet("Hi");

        String count = GreetCounterObjectClient
            .fromIngress("http://localhost:8080", "Mary")
            .send(Duration.ofMillis(1000))
            .greet("Hi");
        // <end_delayed_call_java>

    }
}
