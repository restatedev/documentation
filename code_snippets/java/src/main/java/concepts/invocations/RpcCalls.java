package concepts.invocations;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;

@Service
public class RpcCalls {

    // <start_rpc>
    @Handler
    public void myRestateHandler(Context ctx){
        // focus(1:3)
        String greet = GreeterServiceClient.fromContext(ctx)
                .greet("Hi")
                .await();

        // focus(1:3)
        int count = GreetCounterObjectClient.fromContext(ctx, "Mary")
                .greet("Hi")
                .await();
    }
    // <end_rpc>

    // <start_rpc_java>
    public void myJavaHandler(Context ctx){
        // focus(1:3)
        String greet = GreeterServiceClient
                .fromIngress("http://localhost:8080")
                .greet("Hi");

        // focus(1:3)
        int count = GreetCounterObjectClient
                .fromIngress("http://localhost:8080", "Mary")
                .greet("Hi");
    }
    // <end_rpc_java>

}
