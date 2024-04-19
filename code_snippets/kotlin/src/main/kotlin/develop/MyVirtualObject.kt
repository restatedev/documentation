package develop

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.kotlin.ObjectContext

// <start_virtual_object>
@VirtualObject
class MyVirtualObject {

    @Handler
    suspend fun myHandler(ctx: ObjectContext, input: String): String {
        return "my-output"
    }

}
// <end_virtual_object>
