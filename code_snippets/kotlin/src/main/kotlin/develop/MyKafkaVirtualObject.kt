package develop

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.kotlin.ObjectContext

data class MyEvent(val a: Int)

// <start_here>
@VirtualObject
class MyKafkaVirtualObject {

    @Handler
    fun handle(context: ObjectContext, request: MyEvent) {
        // Key
        val kafkaEventKey: String = context.key()

        // ... Do something ...
    }
}
// <end_here>
