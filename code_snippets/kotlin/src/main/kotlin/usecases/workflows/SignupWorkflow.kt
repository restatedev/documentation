package usecases.workflows

import dev.restate.sdk.annotation.Shared
import dev.restate.sdk.annotation.Workflow
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder
import dev.restate.sdk.kotlin.*
import kotlinx.serialization.Serializable

// <start_here>
@Workflow
class SignupWorkflow {

  companion object {
    // <mark_3>
    private val LINK_CLICKED = KtDurablePromiseKey.json<String>("link_clicked")
    // </mark_3>
  }

  // <mark_1>
  @Workflow
  suspend fun run(ctx: WorkflowContext, user: User): Boolean {
    // </mark_1>
    // workflow ID = user ID; workflow runs once per user
    val userId = ctx.key()

    // <mark_2>
    ctx.runBlock { createUserEntry(user) }
    // </mark_2>

    // <mark_2>
    val secret = ctx.random().nextUUID().toString()
    ctx.runBlock { sendEmailWithLink(userId, user, secret) }
    // </mark_2>

    // <mark_2>
    // <mark_3>
    val clickSecret: String =
      ctx.promise(LINK_CLICKED)
        .awaitable()
        .await()
    // </mark_3>
    // </mark_2>

    return clickSecret == secret
  }

  @Shared
  suspend fun click(ctx: SharedWorkflowContext, secret: String) {
    // <mark_3>
    ctx.promiseHandle(LINK_CLICKED).resolve(secret)
    // </mark_3>
  }
}

fun main() {
  RestateHttpEndpointBuilder.builder()
    .bind(SignupWorkflow())
    .buildAndListen()
}
// <end_here>

fun createUserEntry(user: User) {}

fun sendEmailWithLink(email: String?, user: User, secret: String?) {}

@Serializable
data class User(val id: String, val email: String, val name: String)
