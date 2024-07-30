package usecases.eventprocessing

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.kotlin.ObjectContext
import dev.restate.sdk.kotlin.runBlock
import kotlin.time.Duration.Companion.milliseconds

// <start_here>
@VirtualObject
class UserUpdatesService {
  // <mark_1>
  @Handler
  suspend fun updateUserEvent(ctx: ObjectContext, event: UserUpdate) {
    // </mark_1>
    // <mark_3>
    var userId = ctx.runBlock { updateUserProfile(event.profile) }

    // </mark_3>

    // <mark_4>
    while (userId == "NOT_READY") {
      // <mark_2>
      ctx.sleep(5000.milliseconds)
      // </mark_2>
      // <mark_3>
      userId = ctx.runBlock { updateUserProfile(event.profile) }
      // </mark_3>
    }

    val finalUserId = userId
    // <mark_3>
    val roleId = ctx.runBlock { setUserPermissions(finalUserId, event.permissions) }
    ctx.runBlock { provisionResources(finalUserId, roleId, event.resources) }
    // </mark_3>
  }
  // </mark_4>
}
// <end_here>

class UserUpdate(var profile: String, var permissions: String, var resources: String)

fun updateUserProfile(profile: String): String {
  return if (Math.random() < 0.8) "NOT_READY" else "$profile-id"
}

fun setUserPermissions(userId: String?, permissions: String): String {
  return permissions
}

fun provisionResources(userId: String?, role: String?, resources: String?): String {
  return ""
}
