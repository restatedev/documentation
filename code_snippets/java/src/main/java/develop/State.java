package develop;

import dev.restate.sdk.ObjectContext;
import static greeter.generated.GreeterProto.*;

import dev.restate.sdk.common.CoreSerdes;
import dev.restate.sdk.common.StateKey;
import greeter.generated.GreeterRestate;

public class State extends GreeterRestate.GreeterRestateImplBase {

    @Override
    public GreetResponse greet(ObjectContext ctx, GreetRequest request) {

        // <start_statekeys>
        ctx.stateKeys();
        // <end_statekeys>


        // <start_get>
        // Example of retrieving String value from state
        StateKey<String> STRING_STATE_KEY = StateKey.of("my-key", CoreSerdes.JSON_STRING);
        String stringState = ctx.get(STRING_STATE_KEY).orElse("my-default");

        // Example of retrieving integer value from state
        StateKey<Integer> INT_STATE_KEY = StateKey.of("my-key", CoreSerdes.JSON_INT);
        int intState = ctx.get(INT_STATE_KEY).orElse(0);
        // <end_get>

        // <start_set>
        ctx.set(STRING_STATE_KEY, "my-new-value");
        // <end_set>


        // <start_clear>
        ctx.clear(STRING_STATE_KEY);
        // <end_clear>

        // <start_clear_all>
        ctx.clearAll();
        // <end_clear_all>

        return GreetResponse.newBuilder()
                .setMessage("Hello")
                .build();
    }

    private String doDbRequest(){ return ""; }
}