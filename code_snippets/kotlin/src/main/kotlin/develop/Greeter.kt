package develop

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder
import dev.restate.sdk.kotlin.KtStateKey
import dev.restate.sdk.kotlin.ObjectContext

// withClass tooltip java-overview-virtual-object
@VirtualObject
class Greeter {

  // withClass(1:3) tooltip java-overview-state-key
  companion object {
    private val COUNT = KtStateKey.json<Int>("count")
  }

  // withClass tooltip java-overview-virtual-object-handler
  @Handler
  suspend fun greet(ctx: ObjectContext, greeting: String): String {
    // Get the count and increment it
    val count = ctx.get(COUNT) ?: 1
    ctx.set(COUNT, count + 1)

    // Send the response back
    return "$greeting ${ctx.key()} for the $count time!"
  }
}

fun main() {
  RestateHttpEndpointBuilder.builder().bind(Greeter()).buildAndListen()
}
