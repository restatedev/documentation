package develop;

import dev.restate.sdk.ObjectContext;

import static example.generated.ExampleProto.*;
import example.generated.ExampleRestate;

public class ContextKeyedExample extends ExampleRestate.ExampleRestateImplBase {

    // <start_here>
    @Override
    public void greet(ObjectContext ctx, ExampleRequest request) {
        // ... Do something ... //
    }
    // <end_here>
}
