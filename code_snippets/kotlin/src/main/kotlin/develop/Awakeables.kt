package develop

import dev.restate.sdk.kotlin.*

class Awakeables {
    suspend fun awakeables(ctx: ObjectContext) {
        // <start_create>
        // 1. Generate the ID
        val awakeable = ctx.awakeable<String>()

        // 2. Send the ID to some external system
        val awakeableId: String = awakeable.id

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
}