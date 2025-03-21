package develop.clients

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.http.vertx.RestateHttpServer
import dev.restate.sdk.kotlin.*
import dev.restate.sdk.kotlin.endpoint.endpoint

@VirtualObject
class GreetCounterObject {

  companion object {
    private val COUNT = stateKey<Int>("count")
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
  RestateHttpServer.listen(
      endpoint {
        bind(GreetCounterObject())
        bind(GreeterService())
      })
}
