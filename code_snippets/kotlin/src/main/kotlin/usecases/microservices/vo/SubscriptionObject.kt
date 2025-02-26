package usecases.microservices.vo

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder
import dev.restate.sdk.kotlin.*
import dev.restate.sdk.lambda.BaseRestateLambdaHandler
import dev.restate.sdk.lambda.RestateLambdaEndpointBuilder
import kotlinx.serialization.Serializable

// <start_here>
// <mark_2>
@VirtualObject
class SubscriptionObject {
  // </mark_2>
  companion object {
    // <mark_1>
    val SUBSCRIPTION = KtStateKey.json<String>("subscription")
    // </mark_1>
  }

  // <mark_2>
  @Handler
  suspend fun add(ctx: ObjectContext, req: SubscriptionRequest) {
    // </mark_2>
    // <mark_1>
    ctx.set(SUBSCRIPTION, "awaiting_payment")
    // </mark_1>

    val paymentId = ctx.random().nextUUID().toString()
    val success = ctx.runBlock { createRecurringPayment(req.creditCard, paymentId) }

    if (!success) {
      // <mark_1>
      ctx.set(SUBSCRIPTION, "payment_failed")
      // </mark_1>
      return
    }

    // <mark_1>
    ctx.set(SUBSCRIPTION, "creating_subscription")
    // </mark_1>
    ctx.runBlock { createSubscription(req.userId, req.subscription) }

    // <mark_1>
    ctx.set(SUBSCRIPTION, "created")
    // </mark_1>
  }
}

// <mark_3>
class MyLambdaHandler : BaseRestateLambdaHandler() {
  override fun register(builder: RestateLambdaEndpointBuilder) {
    builder.bind(SubscriptionObject())
  }
}
// </mark_3>
// <end_here>

@Serializable
data class SubscriptionRequest(
    val userId: String,
    val creditCard: String,
    val subscription: String
)

fun createSubscription(userId: String, subscription: String): String {
  return "SUCCESS"
}

fun createRecurringPayment(creditCard: String, paymentId: String): Boolean {
  return true
}
