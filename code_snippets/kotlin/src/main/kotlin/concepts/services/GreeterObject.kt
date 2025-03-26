package concepts.services

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Shared
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.http.vertx.RestateHttpServer
import dev.restate.sdk.kotlin.*
import dev.restate.sdk.kotlin.endpoint.endpoint

// <start_here>
// <mark_1>
@VirtualObject
class GreeterObject {
  // </mark_1>

  companion object {
    // <mark_2>
    private val COUNT = stateKey<Int>("greet-count")
    // </mark_2>
  }

  // <mark_1>
  // <mark_3>
  @Handler
  suspend fun greet(ctx: ObjectContext, greeting: String): String {
    // </mark_3>
    val name = ctx.key()
    // </mark_1>

    // <mark_2>
    val count = ctx.get(COUNT) ?: 0
    // </mark_2>
    val newCount = count + 1
    // <mark_2>
    ctx.set(COUNT, newCount)
    // </mark_2>

    return "$greeting ${name}, for the $newCount-th time"
  }

  // <mark_1>
  // <mark_3>
  @Handler
  suspend fun ungreet(ctx: ObjectContext): String {
    // </mark_3>
    val name = ctx.key()
    // </mark_1>

    // <mark_2>
    val count = ctx.get(COUNT) ?: 0
    // </mark_2>
    if (count > 0) {
      val newCount = count - 1
      // <mark_2>
      ctx.set(COUNT, newCount)
      // </mark_2>
    }

    return "Dear ${name}, taking one greeting back: $count"
  }

  // <mark_4>
  // <mark_1>
  @Shared
  suspend fun getGreetCount(ctx: SharedObjectContext): Int {
    // </mark_1>
    // <mark_2>
    return ctx.get(COUNT) ?: 0
    // </mark_2>
  }
  // </mark_4>
}

fun main() {
  RestateHttpServer.listen(endpoint { bind(GreeterObject()) })
}
// <end_here>
