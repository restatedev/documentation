package concepts.invocations;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;

@Service
public class OneWayCalls {

    // <start_one_way_call>
    @Handler
    public void myRestateHandler(Context ctx){
        // focus(1:3)
        GreeterServiceClient.fromContext(ctx)
                .send()
                .greet("Hi");

        // focus(1:3)
        GreetCounterObjectClient.fromContext(ctx, "Mary")
                .send()
                .greet("Hi");
    }
    // <end_one_way_call>

    // <start_one_way_call_java>
    public void myJavaHandler(Context ctx){
        // focus(1:4)
        String invocationId = GreeterServiceClient
                .fromIngress("http://localhost:8080")
                .send()
                .greet("Hi");

        // focus(1:4)
        GreetCounterObjectClient
                .fromIngress("http://localhost:8080", "Mary")
                .send()
                .greet("Hi");
    }
    // <end_one_way_call_java>
}
