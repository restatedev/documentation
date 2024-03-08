package develop;

import dev.restate.sdk.Context;
import static example.generated.ExampleProto.*;
import example.generated.UnkeyedExampleRestate;

public class ContextUnkeyedExample extends UnkeyedExampleRestate.UnkeyedExampleRestateImplBase {

    // <start_here>
    @Override
    public void greet(Context ctx, Request request) {
        // ... Do something ... //
    }
    // <end_here>
}
