// Suppressing notifications about the naming of the state keys: not lower case
@file:Suppress("ktlint:standard:property-naming")

package develop

import dev.restate.sdk.kotlin.*

class State {
  suspend fun getState(ctx: ObjectContext) {
    // <start_statekeys>
    val keys = ctx.stateKeys()
    // <end_statekeys>

    // <start_get>
    // Getting String value
    val STRING_STATE_KEY = stateKey<String>("my-key")
    val stringState: String? = ctx.get(STRING_STATE_KEY)

    // Getting integer value
    val INT_STATE_KEY = stateKey<Int>("my-key")
    val intState: Int? = ctx.get(INT_STATE_KEY)
    // <end_get>
  }

  suspend fun setState(ctx: ObjectContext) {
    // <start_set>
    val STRING_STATE_KEY = stateKey<String>("my-key")
    ctx.set(STRING_STATE_KEY, "my-new-value")
    // <end_set>
  }

  suspend fun clearState(ctx: ObjectContext) {
    // <start_clear>
    val STRING_STATE_KEY = stateKey<String>("my-key")
    ctx.clear(STRING_STATE_KEY)
    // <end_clear>

    // <start_clear_all>
    ctx.clearAll()
    // <end_clear_all>
  }
}
