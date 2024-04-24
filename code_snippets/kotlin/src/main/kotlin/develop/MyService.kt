package develop

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder
import dev.restate.sdk.kotlin.Context

// <start_service>
@Service
class MyService {

    @Handler
    suspend fun myHandler(ctx: Context, input: String): String {
        return "my-output"
    }
}

fun main() {
    RestateHttpEndpointBuilder
        .builder()
        .bind(MyService())
        .buildAndListen()
}
// <end_service>
