package develop

// <start_here>
import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder
import dev.restate.sdk.kotlin.Context

@Service
class MyService {
  @Handler
  suspend fun myHandler(ctx: Context, greeting: String): String {
    return "$greeting!"
  }
}

fun main() {
  RestateHttpEndpointBuilder.builder().bind(MyService()).buildAndListen()
}
// <end_here>
