package develop

import dev.restate.sdk.kotlin.Context
import kotlin.time.Duration.Companion.seconds

class DurableTimers {
  suspend fun timers(ctx: Context) {
    // <start_sleep>
    ctx.sleep(10.seconds)
    // <end_sleep>
  }
}
