package concepts.invocations;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import develop.MyWorkflowClient;

@Service
public class OneWayCalls {

    // <start_one_way_call>
    @Handler
    public void myRestateHandler(Context ctx){
        // focus(1:11)
        GreeterServiceClient.fromContext(ctx)
            .send()
            .greet("Hi");

        GreetCounterObjectClient.fromContext(ctx, "Mary")
            .send()
            .greet("Hi");

        MyWorkflowClient.fromContext(ctx, "wf-id-1")
            .send()
            .run("input");
    }
    // <end_one_way_call>

    // <start_one_way_call_java>
    public void myJavaHandler(Context ctx){
        // focus(1:13)
        String invocationId = GreeterServiceClient
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
    }
    // <end_one_way_call_java>
}
