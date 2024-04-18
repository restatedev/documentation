package concepts.invocations;

import concepts.components.invocations.GreetCounterObjectClient;
import concepts.components.invocations.GreeterServiceClient;
import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;

import java.time.Duration;

@Service
public class DelayedCalls {

    // <start_delayed_call>
    @Handler
    public void myRestateHandler(Context ctx){
        // focus
        GreeterServiceClient.fromContext(ctx)
                // focus
                .send(Duration.ofMillis(1000))
                // focus
                .greet("Hi");

        // focus
        GreetCounterObjectClient.fromContext(ctx, "Mary")
                // focus
                .send(Duration.ofMillis(1000))
                // focus
                .greet("Hi");
    }
    // <end_delayed_call>

    // <start_delayed_call_java>
    // to do
    // <end_delayed_call_java>
}
