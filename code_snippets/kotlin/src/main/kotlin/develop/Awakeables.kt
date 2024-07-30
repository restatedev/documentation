package develop

import dev.restate.sdk.kotlin.*

class Awakeables {
  suspend fun awakeables(ctx: ObjectContext) {
    // <start_here>
    // <mark_1>
    val awakeable = ctx.awakeable<String>()
    val awakeableId: String = awakeable.id
    // </mark_1>

    // <mark_2>
    ctx.runBlock { triggerTaskAndDeliverId(awakeableId) }
    // </mark_2>

    // <mark_3>
    val payload: String = awakeable.await()
    // </mark_3>
    // <end_here>

    // <start_resolve>
    ctx.awakeableHandle(awakeableId).resolve("hello")
    // <end_resolve>

    // <start_reject>
    ctx.awakeableHandle(awakeableId).reject("my error reason")
    // <end_reject>
  }

  private fun triggerTaskAndDeliverId(awakeableId: String) {}
}
