package develop;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;

// <start_virtual_object>
// highlight-start
@VirtualObject
// highlight-end
public class MyVirtualObject {

    // highlight-start
    @Handler
    // highlight-end
    String myHandler(ObjectContext context, String input) {
        return "my-output";
    }

}
// <end_virtual_object>