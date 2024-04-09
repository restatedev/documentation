package concepts.components.invocations;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;

@Service
public class OneWayCalls {

    // <start_one_way_call>
    @Handler
    public void myRestateHandler(Context ctx){
        // focus
        GreeterServiceClient.fromContext(ctx).send()
                // focus
                .greet("Hi");

        // focus
        GreetCounterObjectClient.fromContext(ctx, "Mary").send()
                // focus
                .greet("Hi");
    }
    // <end_one_way_call>

    // <start_one_way_call_java>
    public void myJavaHandler(Context ctx){
        // focus
        GreeterServiceClient
                // focus
                .fromIngress("http://localhost:8080")
                // focus
                .send()
                // focus
                .greet("Hi");

        // focus
        GreetCounterObjectClient
                // focus
                .fromIngress("http://localhost:8080", "Mary")
                // focus
                .send()
                // focus
                .greet("Hi");
    }
    // <end_one_way_call_java>
}
