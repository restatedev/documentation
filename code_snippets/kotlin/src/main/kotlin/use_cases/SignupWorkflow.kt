package use_cases

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Workflow
import dev.restate.sdk.common.TerminalException
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder
import dev.restate.sdk.kotlin.*
import kotlinx.serialization.Serializable

// <start_here>
@Workflow
class SignupWorkflow {
    companion object {
        private val STAGE = KtStateKey.json<String>("stage")
        private val EMAIL_LINK = KtDurablePromiseKey.json<String>("email-link")
    }

    // <mark_1>
    @Workflow
    suspend fun run(ctx: WorkflowContext, user: User): Boolean {
        // <mark_3>
        ctx.set(STAGE, "Creating user")
        // </mark_3>
        // <mark_2>
        ctx.runBlock { createUserEntry(ctx.key(), user.name) }
        // </mark_2>

        // <mark_3>
        ctx.set(STAGE, "Email verification")
        // </mark_3>
        // <mark_2>
        val secret: String = ctx.random().nextUUID().toString()
        ctx.runBlock { sendEmailWithLink(user.email, secret) }
        // </mark_2>

        // <mark_5>
        val clickSecret: String = ctx.promise(EMAIL_LINK).awaitable().await()
        // </mark_5>
        // <mark_7>
        if (clickSecret != secret) {
            // <mark_3>
            ctx.set(STAGE, "Verification failed")
            // </mark_3>
            throw TerminalException("Wrong secret from email link")
        }
        // <mark_3>
        // </mark_7>
        ctx.set(STAGE, "User verified")
        // </mark_3>
        return true
    }
    // </mark_1>

    // <mark_4>
    @Handler
    suspend fun getStage(ctx: SharedWorkflowContext): String? {
        return ctx.get(STAGE)
    }
    // </mark_4>

    // <mark_6>
    @Handler
    suspend fun approveEmail(ctx: SharedWorkflowContext, secret: String) {
        ctx.promiseHandle(EMAIL_LINK).resolve(secret)
    }

    @Handler
    suspend fun rejectEmail(ctx: SharedWorkflowContext) {
        ctx.promiseHandle(EMAIL_LINK).reject("Abort verification")
    }
    // </mark_6>
}
// <end_here>

fun main(args: Array<String>) {
    RestateHttpEndpointBuilder
        .builder()
        .bind(SignupWorkflow())
        .buildAndListen()
}

fun createUserEntry(id: String?, name: String?) {}

fun sendEmailWithLink(email: String?, secret: String?) {}

@Serializable
data class User(val id: String, val email: String, val name: String)