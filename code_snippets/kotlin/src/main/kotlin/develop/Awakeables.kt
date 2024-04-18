package develop

import dev.restate.sdk.common.CoreSerdes
import dev.restate.sdk.kotlin.*

class Awakeables {
    suspend fun awakeables(ctx: ObjectContext) {
        // <start_create>
        // 1. Generate the awakeable
        val awakeable = ctx.awakeable<String>()

        // 2. Deliver the ID to the process that will resolve the awakeable
        val awakeableId: String = awakeable.id
        ctx.runBlock{ deliverId() }

        // ... send a request to another system and include the awakeableId as callback url...

        // 3. Wait for the ID to returned and retrieve the payload
        val payload: String = awakeable.await()
        // <end_create>


        // <start_resolve>
        ctx.awakeableHandle(awakeableId).resolve("hello")
        // <end_resolve>

        // <start_reject>
        ctx.awakeableHandle(awakeableId).reject("my error reason")
        // <end_reject>
    }

    private fun deliverId(): Unit {
        return ""
    }
}