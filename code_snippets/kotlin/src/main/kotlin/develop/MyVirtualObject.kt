package develop

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder
import dev.restate.sdk.kotlin.ObjectContext

// <start_virtual_object>
@VirtualObject
class MyVirtualObject {

    @Handler
    suspend fun myHandler(ctx: ObjectContext, input: String): String {
        return "my-output"
    }

}

fun main() {
    RestateHttpEndpointBuilder
        .builder()
        .bind(MyVirtualObject())
        .buildAndListen()
}
// <end_virtual_object>
