package develop

import dev.restate.sdk.common.TerminalException
import dev.restate.sdk.kotlin.Context

class ErrorHandling {
  fun errorHandling(ctx: Context) {
    // <start_here>
    throw TerminalException(500, "Something went wrong")
    // <end_here>
  }
}
