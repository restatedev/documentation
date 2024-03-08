package develop;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.examples.generated.GreeterRestate;

import static dev.restate.sdk.examples.generated.GreeterProto.*;

import java.time.Duration;

import static dev.restate.sdk.examples.generated.GreeterProto.*;

public class DurableTimers extends GreeterRestate.GreeterRestateImplBase {

    @Override
    public GreetResponse greet(ObjectContext ctx, GreetRequest request) {

        // <start_here>
        ctx.sleep(Duration.ofSeconds(10));
        // <end_here>

        return GreetResponse.newBuilder()
                .setMessage("Hello")
                .build();
    }
}