package develop

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.kotlin.ObjectContext

// <start_virtual_object>
// highlight-start
@VirtualObject
// highlight-end
class MyVirtualObject {

    // highlight-start
    @Handler
    // highlight-end
    suspend fun myHandler(context: ObjectContext, input: String): String {
        return "my-output"
    }

}
// <end_virtual_object>
