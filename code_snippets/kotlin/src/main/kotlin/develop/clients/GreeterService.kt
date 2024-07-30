package develop.clients

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.kotlin.Context

@Service
class GreeterService {
  @Handler
  suspend fun greet(ctx: Context, greeting: String): String {
    return "Hello, $greeting!"
  }
}
