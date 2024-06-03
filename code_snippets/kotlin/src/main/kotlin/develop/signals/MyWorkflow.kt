package develop.signals

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Workflow
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder
import dev.restate.sdk.kotlin.KtDurablePromiseKey
import dev.restate.sdk.kotlin.SharedWorkflowContext
import dev.restate.sdk.kotlin.WorkflowContext

// <start_here>
@Workflow
class MyWorkflow {

    companion object {
        private val MY_BOOLEAN_SIGNAL = KtDurablePromiseKey.json<Boolean>("my-boolean-signal")
    }

    @Workflow
    suspend fun run(ctx: WorkflowContext, input: String): String {

        // do some steps...

        // withClass highlight-line
        // Creation of the Durable Promise
        // withClass highlight-line
        val signal: Boolean = ctx.durablePromise(MY_BOOLEAN_SIGNAL).awaitable().await()

        // do some steps...

        return "success"
    }

    @Handler
    suspend fun resolveMySignal(ctx: SharedWorkflowContext, signal: Boolean) {
        // withClass highlight-line
        // Resolution of the Durable Promise
        // withClass highlight-line
        ctx.durablePromiseHandle(MY_BOOLEAN_SIGNAL).resolve(signal)
    }

}
// <end_here>
