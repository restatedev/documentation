package usecases.eventprocessing

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.common.StateKey
import dev.restate.sdk.common.TerminalException
import dev.restate.sdk.kotlin.KtSerdes
import dev.restate.sdk.kotlin.ObjectContext
import kotlin.time.Duration.Companion.seconds

// <start_here>
@VirtualObject
class ProfileService {

  companion object {
    // <mark_1>
    private val USER = StateKey.of("user", KtSerdes.json<UserProfile>())
    // </mark_1>
  }

  // <mark_2>
  @Handler
  suspend fun userEvent(ctx: ObjectContext, name: String) {
    // </mark_2>
    val profile = UserProfile(ctx.key(), name)
    // <mark_1>
    ctx.set(USER, profile)
    // </mark_1>

    // <mark_3>
    ProfileServiceClient.fromContext(ctx, ctx.key()).send(1.seconds).emit()
    // </mark_3>
  }

  // <mark_2>
  @Handler
  suspend fun featureEvent(ctx: ObjectContext, email: String) {
    // </mark_2>
    // <mark_1>
    val user = ctx.get(USER) ?: throw TerminalException("No user found")
    // </mark_1>
    user.email = email

    // <mark_1>
    ctx.set(USER, user)
    // </mark_1>
  }

  // <mark_2>
  @Handler
  suspend fun emit(ctx: ObjectContext) {
    // </mark_2>
    // <mark_1>
    val user = ctx.get(USER) ?: throw TerminalException("No user found")
    // </mark_1>

    send(ctx.key(), user)

    // <mark_1>
    ctx.clearAll()
    // </mark_1>
  }
}
// <end_here>

class UserProfile(val id: String, val name: String) {
  var email: String? = null
}

fun send(key: String, user: UserProfile) {}
