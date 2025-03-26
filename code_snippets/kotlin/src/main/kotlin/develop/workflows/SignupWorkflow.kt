package develop.workflows

import dev.restate.sdk.annotation.Shared
import dev.restate.sdk.annotation.Workflow
import dev.restate.sdk.http.vertx.RestateHttpServer
import dev.restate.sdk.kotlin.*
import dev.restate.sdk.kotlin.endpoint.endpoint
import kotlinx.serialization.Serializable

// <start_here>
@Workflow
class SignupWorkflow {

  companion object {
    private val EMAIL_CLICKED = durablePromiseKey<String>("email_clicked")
    private val STATUS = stateKey<String>("status")
  }

  // <mark_1>
  @Workflow
  suspend fun run(ctx: WorkflowContext, email: Email): Boolean {
    val secret = ctx.random().nextUUID().toString()
    ctx.set(STATUS, "Generated secret")

    ctx.runBlock("send email") { sendEmailWithLink(email, secret) }

    // <mark_3>
    val clickSecret = ctx.promise(EMAIL_CLICKED).future().await()
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
  RestateHttpServer.listen(endpoint { bind(SignupWorkflow()) })
  // </mark_4>
}
// <end_here>

@Serializable data class Email(val email: String)

fun sendEmailWithLink(email: Email, secret: String) {}
