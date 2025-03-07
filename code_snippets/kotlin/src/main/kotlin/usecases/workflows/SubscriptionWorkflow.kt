package usecases.workflows

import dev.restate.sdk.annotation.Shared
import dev.restate.sdk.annotation.Workflow
import dev.restate.sdk.common.TerminalException
import dev.restate.sdk.kotlin.*
import dev.restate.sdk.lambda.BaseRestateLambdaHandler
import dev.restate.sdk.lambda.RestateLambdaEndpointBuilder
import kotlinx.serialization.Serializable

// <start_here>
@Workflow
class SubscriptionWorkflow {

  companion object {
    // <mark_1>
    val STATUS = KtStateKey.json<String>("status")
    // </mark_1>
  }

  @Workflow
  suspend fun run(ctx: WorkflowContext, req: SubscriptionRequest) {
    // <mark_2> orange
    val compensations: MutableList<suspend () -> Unit> = mutableListOf()
    // </mark_2>

    try {
      val paymentId = ctx.random().nextUUID().toString()
      // <mark_2> orange
      compensations.add { removeRecurringPayment(paymentId) }
      // </mark_2>
      // <mark_2> green
      ctx.runBlock { createRecurringPayment(req.creditCard, paymentId) }
      // </mark_2>
      // <mark_1>
      ctx.set(STATUS, "payment_success")
      // </mark_1>

      for (subscription in req.subscriptions) {
        // <mark_2> orange
        compensations.add { removeSubscription(req.userId, subscription) }
        // </mark_2>
        // <mark_2> green
        ctx.runBlock { createSubscription(req.userId, subscription) }
        // </mark_2>
      }
      // <mark_1>
      ctx.set(STATUS, "subscribed")
      // </mark_1>
    } catch (e: TerminalException) {
      // <mark_2> orange
      compensations.reversed().forEach { ctx.runBlock { it() } }
      // </mark_2>
      // <mark_1>
      ctx.set(STATUS, "rolled_back")
      // </mark_1>
      throw TerminalException("Subscription failed")
    }
  }
}

// <mark_3>
class MyLambdaHandler : BaseRestateLambdaHandler() {
  override fun register(builder: RestateLambdaEndpointBuilder) {
    builder.bind(SubscriptionWorkflow())
  }
}
// </mark_3>
// <end_here>

@Serializable
data class SubscriptionRequest(
    val userId: String,
    val creditCard: String,
    val subscriptions: List<String>
)

fun createSubscription(userId: String, subscription: String): String {
  return "SUCCESS"
}

fun createRecurringPayment(creditCard: String, paymentId: String): String {
  return "payment-reference"
}

fun removeSubscription(userId: String, subscription: String) {
  return
}

fun removeRecurringPayment(paymentId: String) {
  return
}
