package develop

import dev.restate.sdk.kotlin.*

class Awakeables {
    suspend fun awakeables(ctx: ObjectContext) {
        // <start_create>
        val awakeable = ctx.awakeable<String>()
        val awakeableId: String = awakeable.id

        ctx.runBlock{ triggerTaskAndDeliverId(awakeableId) }

        val payload: String = awakeable.await()
        // <end_create>


        // <start_resolve>
        ctx.awakeableHandle(awakeableId)
            .resolve("hello")
        // <end_resolve>

        // <start_reject>
        ctx.awakeableHandle(awakeableId)
            .reject("my error reason")
        // <end_reject>
    }

    private fun triggerTaskAndDeliverId(awakeableId: String): Unit {
    }
}