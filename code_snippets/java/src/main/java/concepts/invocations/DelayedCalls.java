package concepts.invocations;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;

import java.time.Duration;

@Service
public class DelayedCalls {

    // <start_delayed_call>
    @Handler
    public void myRestateHandler(Context ctx){
        // focus(1:3)
        GreeterServiceClient.fromContext(ctx)
                .send(Duration.ofMillis(1000))
                .greet("Hi");

        // focus(1:3)
        GreetCounterObjectClient.fromContext(ctx, "Mary")
                .send(Duration.ofMillis(1000))
                .greet("Hi");
    }
    // <end_delayed_call>

    // <start_delayed_call_java>
    public void myJavaHandler(Context ctx){
        // focus(1:4)
        String invocationId = GreeterServiceClient
                .fromIngress("http://localhost:8080")
                .send(Duration.ofMillis(1000))
                .greet("Hi");

        // focus(1:4)
        String invocationIdCount = GreetCounterObjectClient
                .fromIngress("http://localhost:8080", "Mary")
                .send(Duration.ofMillis(1000))
                .greet("Hi");
    }
    // <end_delayed_call_java>
}
