package develop

import dev.restate.sdk.kotlin.Context
import dev.restate.sdk.types.TerminalException

class ErrorHandling {
  fun errorHandling(ctx: Context) {
    // <start_here>
    throw TerminalException(500, "Something went wrong")
    // <end_here>
  }
}
