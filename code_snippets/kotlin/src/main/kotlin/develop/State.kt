package develop

import dev.restate.sdk.kotlin.KtStateKey
import dev.restate.sdk.kotlin.ObjectContext

class State {
    suspend fun state(ctx: ObjectContext) {
        // <start_statekeys>
        val keys = ctx.stateKeys()
        // <end_statekeys>


        // <start_get>
        // Example of retrieving String value from state
        val STRING_STATE_KEY = KtStateKey.json<String>("my-key")
        val stringState: String? = ctx.get(STRING_STATE_KEY)

        // Example of retrieving integer value from state
        val INT_STATE_KEY = KtStateKey.json<Int>("my-key")
        val intState: Int? = ctx.get(INT_STATE_KEY)
        // <end_get>


        // <start_set>
        ctx.set(STRING_STATE_KEY, "my-new-value")
        // <end_set>


        // <start_clear>
        ctx.clear(STRING_STATE_KEY)
        // <end_clear>

        // <start_clear_all>
        ctx.clearAll()
        // <end_clear_all>
    }
}