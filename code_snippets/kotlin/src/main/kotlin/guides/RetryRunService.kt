package guides

import dev.restate.sdk.annotation.Accept
import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Raw
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.common.TerminalException
import dev.restate.sdk.kotlin.Awaitable
import dev.restate.sdk.kotlin.Context
import dev.restate.sdk.kotlin.KtSerdes
import dev.restate.sdk.kotlin.RetryPolicy
import dev.restate.sdk.kotlin.runBlock
import develop.MyServiceClient
import kotlin.time.Duration.Companion.milliseconds
import kotlin.time.Duration.Companion.minutes
import kotlin.time.Duration.Companion.seconds

@Service
class RetryRunService {

  @Handler
  suspend fun retryRun(ctx: Context, greeting: String): String {

    // <start_here>
    // <mark_1>
    val myRunRetryPolicy =
        RetryPolicy(
            initialDelay = 5.seconds,
            exponentiationFactor = 2.0f,
            maxDelay = 60.seconds,
            maxAttempts = 10,
            maxDuration = 5.minutes)
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
    val awakeable = ctx.awakeable(KtSerdes.json())
    // do something that will trigger the awakeable
    // !mark
    val awakeableTimeout = ctx.timer(5.seconds)
    // !mark
    val result = Awaitable.any(awakeable, awakeableTimeout).await()
    if (result == awakeable) {
      println("Awakeable resolved first")
    } else if (result == awakeableTimeout) {
      println("Timeout hit first")
    }

    val call = MyServiceClient.fromContext(ctx).myHandler("Hello")
    // !mark
    val callTimeout = ctx.timer(5.seconds)
    // !mark
    val result2 = Awaitable.any(call, callTimeout).await()
    if (result2 == call) {
      println("Call responsded first")
    } else if (result2 == callTimeout) {
      println("Timeout hit first")
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
