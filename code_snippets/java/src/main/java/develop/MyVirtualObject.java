package develop;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;

// <start_virtual_object>
@VirtualObject
public class MyVirtualObject {

    @Handler
    String myHandler(ObjectContext ctx, String input) {
        return "my-output";
    }

}
// <end_virtual_object>