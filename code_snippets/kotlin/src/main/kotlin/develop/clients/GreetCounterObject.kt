package develop.clients

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder
import dev.restate.sdk.kotlin.KtStateKey
import dev.restate.sdk.kotlin.ObjectContext

@VirtualObject
class GreetCounterObject {

  companion object {
    private val COUNT = KtStateKey.json<Int>("count")
  }

  @Handler
  suspend fun greet(ctx: ObjectContext, greeting: String): Int {
    val count = ctx.get(COUNT) ?: 0

    val newCount = count + 1
    ctx.set(COUNT, newCount)
    return newCount
  }
}

fun main() {
  RestateHttpEndpointBuilder.builder()
      .bind(GreetCounterObject())
      .bind(GreeterService())
      .buildAndListen()
}
