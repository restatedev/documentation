package develop

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.common.TerminalException
import dev.restate.sdk.kotlin.Context
import dev.restate.sdk.kotlin.RetryPolicy
import dev.restate.sdk.kotlin.runBlock
import kotlin.time.Duration.Companion.minutes
import kotlin.time.Duration.Companion.seconds

@Service
class RetryRunService {

  @Handler
  suspend fun retryRun(ctx: Context, greeting: String): String {

    // <start_here>
    try {
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
    } catch (e: TerminalException) {
      // Handle the terminal error after retries exhausted
      // For example, undo previous actions (see sagas guide) and
      // propagate the error back to the caller
      throw e
    }
    // <end_here>

    return "$greeting!"
  }

  private fun writeToOtherSystem() {
    TODO("Not yet implemented")
  }
}
