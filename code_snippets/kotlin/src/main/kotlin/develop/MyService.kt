package develop

// <start_here>
import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.http.vertx.RestateHttpServer
import dev.restate.sdk.kotlin.*
import dev.restate.sdk.kotlin.endpoint.*

@Service
class MyService {
  @Handler
  suspend fun myHandler(ctx: Context, greeting: String): String {
    return "$greeting!"
  }
}

fun main() {
  RestateHttpServer.listen(endpoint { bind(MyService()) })
}
// <end_here>
