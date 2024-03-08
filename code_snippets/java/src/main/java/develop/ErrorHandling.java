import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.common.CoreSerdes;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.common.TerminalException;
import dev.restate.sdk.examples.generated.GreeterProto;
import dev.restate.sdk.examples.generated.GreeterRestate;

import java.time.Duration;

public class DurableTimers extends GreeterRestate.GreeterRestateImplBase {

    private static final StateKey<Integer> COUNT = StateKey.of("count", CoreSerdes.JSON_INT);

    @Override
    public GreeterProto.GreetResponse greet(ObjectContext ctx, GreeterProto.GreetRequest request) {

        // <start_here>
        // Inside your handler throw terminal errors with a code and message as follows:
        throw new TerminalException(TerminalException.Code.UNKNOWN, "Something went wrong");
        // <end_here>

        return GreeterProto.GreetResponse.newBuilder()
                .setMessage("Hello")
                .build();
    }
}
