package develop;

import dev.restate.sdk.Awakeable;
import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.common.CoreSerdes;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.examples.generated.*;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

import static dev.restate.sdk.examples.generated.GreeterProto.*;

public class DurableTimers extends GreeterRestate.GreeterRestateImplBase {

    private static final StateKey<Integer> COUNT = StateKey.of("count", CoreSerdes.JSON_INT);

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