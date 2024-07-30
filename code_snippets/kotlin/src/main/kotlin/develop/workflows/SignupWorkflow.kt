package develop.workflows

import dev.restate.sdk.annotation.Shared
import dev.restate.sdk.annotation.Workflow
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder
import dev.restate.sdk.kotlin.*
import kotlinx.serialization.Serializable

// <start_here>
@Workflow
class SignupWorkflow {

  companion object {
    private val EMAIL_CLICKED = KtDurablePromiseKey.json<String>("email_clicked")
    private val STATUS = KtStateKey.json<String>("status")
  }

  // <mark_1>
  @Workflow
  suspend fun run(ctx: WorkflowContext, email: Email): Boolean {
    val secret = ctx.random().nextUUID().toString()
    ctx.set(STATUS, "Generated secret")

    ctx.runBlock("send email") { sendEmailWithLink(email, secret) }

    // <mark_3>
    val clickSecret = ctx.promise(EMAIL_CLICKED).awaitable().await()
    // </mark_3>
    ctx.set(STATUS, "Clicked email")

    return clickSecret == secret
  }
  // </mark_1>

  @Shared
  suspend fun click(ctx: SharedWorkflowContext, secret: String) {
    // <mark_3>
    ctx.promiseHandle(EMAIL_CLICKED).resolve(secret)
    // </mark_3>
  }

  // <mark_2>
  @Shared
  suspend fun getStatus(ctx: SharedWorkflowContext): String? {
    return ctx.get(STATUS)
  }
  // </mark_2>
}

fun main() {
  // <mark_4>
  RestateHttpEndpointBuilder.builder().bind(SignupWorkflow()).buildAndListen()
  // </mark_4>
}
// <end_here>

@Serializable data class Email(val email: String)

fun sendEmailWithLink(email: Email, secret: String) {}
