package develop.workflows

import dev.restate.sdk.annotation.Shared
import dev.restate.sdk.annotation.Workflow
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder
import dev.restate.sdk.kotlin.*
import develop.workflows.Utils.Companion.sendEmailWithLink
import kotlinx.serialization.Serializable

// <start_here>
@Workflow
class SignupWorkflow {

    companion object {
        private val EMAIL_CLICKED = KtDurablePromiseKey.json<String>("email_clicked")
        private val STATUS = KtStateKey.json<String>("status")
    }

    @Workflow
    suspend fun run(ctx: WorkflowContext, email: Email): Boolean {
        val secret = ctx.random().nextUUID().toString()
        ctx.set(STATUS, "Generated secret")

        ctx.runBlock ("send email") {
            sendEmailWithLink(email, secret)
        }

        val clickSecret = ctx.promise(EMAIL_CLICKED)
            .awaitable()
            .await()
        ctx.set(STATUS, "Clicked email")

        return clickSecret == secret
    }

    @Shared
    suspend fun click(ctx: SharedWorkflowContext, secret: String) {
        ctx.promiseHandle(EMAIL_CLICKED).resolve(secret)
    }

    @Shared
    suspend fun getStatus(ctx: SharedWorkflowContext): String? {
        return ctx.get(STATUS)
    }
}

fun main() {
    RestateHttpEndpointBuilder
        .builder()
        .bind(SignupWorkflow())
        .buildAndListen()
}
// <end_here>

@Serializable
data class Email(val email: String)

class Utils {
    companion object {
        fun sendEmailWithLink(email: Email, secret: String){

        }
    }
}