package develop

import dev.restate.sdk.http.vertx.RestateHttpServer
import dev.restate.sdk.kotlin.endpoint.endpoint

// <start_here>

fun main() {
  RestateHttpServer.listen(
      endpoint {
        bind(MyService())
        bind(MyVirtualObject())
        bind(MyWorkflow())
      })
}
// <end_here>
