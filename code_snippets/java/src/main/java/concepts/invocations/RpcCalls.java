package concepts.invocations;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;

@Service
public class RpcCalls {

    // <start_rpc>
    @Handler
    public void myRestateHandler(Context ctx){
        // focus
        String greet = GreeterServiceClient.fromContext(ctx)
                // focus
                .greet("Hi")
                // focus
                .await();

        // focus
        int count = GreetCounterObjectClient.fromContext(ctx, "Mary")
                // focus
                .greet("Hi")
                // focus
                .await();
    }
    // <end_rpc>

    // <start_rpc_java>
    public void myJavaHandler(Context ctx){
        // focus
        String greet = GreeterServiceClient
                // focus
                .fromIngress("http://localhost:8080")
                // focus
                .greet("Hi");

        // focus
        int count = GreetCounterObjectClient
                // focus
                .fromIngress("http://localhost:8080", "Mary")
                // focus
                .greet("Hi");
    }
    // <end_rpc_java>

}
