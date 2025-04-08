package guides

import dev.restate.sdk.annotation.Accept
import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Raw
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.http.vertx.RestateHttpServer
import dev.restate.sdk.kotlin.*
import dev.restate.sdk.kotlin.endpoint.endpoint
import dev.restate.sdk.common.TerminalException
import develop.MyServiceClient
import java.util.concurrent.TimeoutException
import kotlin.time.Duration.Companion.milliseconds
import kotlin.time.Duration.Companion.minutes
import kotlin.time.Duration.Companion.seconds

@Service
class RetryRunService {

  @Handler
  suspend fun retryRun(ctx: Context, greeting: String): String {

    // <start_here>
    // <mark_1>
    val myRunRetryPolicy = retryPolicy {
      initialDelay = 5.seconds
      exponentiationFactor = 2.0f
      maxDelay = 60.seconds
      maxAttempts = 10
      maxDuration = 5.minutes
    }
    // </mark_1>
    ctx.runBlock("write", myRunRetryPolicy) { writeToOtherSystem() }
    // <end_here>

    // <start_catch>
    try {
      // Fails with a terminal error after 3 attempts or if the function throws one
      ctx.runBlock(
          "write",
          RetryPolicy(
              initialDelay = 500.milliseconds, maxAttempts = 3, exponentiationFactor = 2.0f)) {
            writeToOtherSystem()
          }
    } catch (e: TerminalException) {
      // Handle the terminal error: undo previous actions and
      // propagate the error back to the caller
      throw e
    }
    // <end_catch>

    return "$greeting!"
  }

  // <start_raw>
  @Handler
  suspend fun myHandler(
      ctx: Context,
      // !mark
      @Accept("*/*") @Raw request: ByteArray
  ) {
    try {
      val decodedRequest = decodeRequest(request)

      // ... rest of your business logic ...

    } catch (e: TerminalException) {
      // Propagate to DLQ/catch-all handler
      throw e
    }
  }
  // <end_raw>

  @Handler
  suspend fun myTimeoutHandler(ctx: Context) {
    // <start_timeout>
    val awakeable = ctx.awakeable<String>()
    // do something that will trigger the awakeable
    // !mark(1:5
    val timeout = ctx.timer(5.seconds)
    try {
      val result = select {
        awakeable.onAwait { it }
        // !mark
        timeout.onAwait { throw TimeoutException() }
      }
    } catch (e: TimeoutException) {
      // Handle the timeout
    }

    val callFuture = MyServiceClient.fromContext(ctx).myHandler("Hello")
    // !mark
    val callTimeout = ctx.timer(5.seconds)
    try {
      val result = select {
        callFuture.onAwait { it }
        // !mark
        callTimeout.onAwait { throw TimeoutException() }
      }
    } catch (e: TimeoutException) {
      // Handle the timeout
    }
    // ... rest of your business logic ...
    // <end_timeout>
  }

  private fun decodeRequest(value: Any): String {
    TODO("Not yet implemented")
    return ""
  }

  private fun writeToOtherSystem(): String {
    return "writeToOtherSystem"
  }
}

fun main() {
  RestateHttpServer.listen(endpoint { bind(RetryRunService()) })
}
