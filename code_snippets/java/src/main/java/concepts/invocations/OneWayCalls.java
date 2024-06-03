package concepts.invocations;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.client.Client;
import dev.restate.sdk.client.SendResponse;
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
        // focus(1:14)
        Client restate = Client.connect("http://localhost:8080");
        GreeterServiceClient
                .fromClient(restate)
                .send()
                .greet("Hi");

        SendResponse handle2 = GreetCounterObjectClient
                .fromClient(restate, "Mary")
                .send()
                .greet("Hi");

        SendResponse wfHandle = MyWorkflowClient
                .fromClient(restate, "wf-id-1")
                .submit("input");
    }
    // <end_one_way_call_java>
}
