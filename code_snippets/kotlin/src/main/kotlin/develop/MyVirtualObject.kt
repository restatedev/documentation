package develop

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Shared
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder
import dev.restate.sdk.kotlin.ObjectContext
import dev.restate.sdk.kotlin.SharedObjectContext

// <start_here>
@VirtualObject
class MyVirtualObject {

    @Handler
    suspend fun myHandler(ctx: ObjectContext, input: String): String {
        return "my-output"
    }


    @Shared
    suspend fun myConcurrentHandler(ctx: SharedObjectContext, input: String): String {
        return "my-output"
    }
}

fun main() {
    RestateHttpEndpointBuilder
        .builder()
        .bind(MyVirtualObject())
        .buildAndListen()
}
// <end_here>
