package concepts.invocations;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.client.Client;
import develop.MyWorkflowClient;

@Service
public class RpcCalls {

    // <start_rpc>
    @Handler
    public void myRestateHandler(Context ctx){
        // focus(1:11)
        String greet = GreeterServiceClient.fromContext(ctx)
                .greet("Hi")
                .await();

        int count = GreetCounterObjectClient.fromContext(ctx, "Mary")
                .greet("Hi")
                .await();

        String result = MyWorkflowClient.fromContext(ctx, "wf-id-1")
                .run("input")
                .await();
    }
    // <end_rpc>

    // <start_rpc_java>
    public void myJavaHandler(Context ctx){
        // focus(1:12)
        Client restate = Client.connect("http://localhost:8080");
        String greet = GreeterServiceClient
                .fromClient(restate)
                .greet("Hi");

        int count = GreetCounterObjectClient
                .fromClient(restate, "Mary")
                .greet("Hi");
    }
    // <end_rpc_java>

}
