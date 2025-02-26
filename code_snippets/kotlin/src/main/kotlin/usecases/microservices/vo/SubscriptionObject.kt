package usecases.microservices.vo

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder
import dev.restate.sdk.kotlin.*
import kotlinx.serialization.Serializable

// <start_here>
@VirtualObject
class SubscriptionObject {
  companion object {
    val SUBSCRIPTION = KtStateKey.json<String>("my-key")
  }

  @Handler
  suspend fun add(ctx: ObjectContext, req: SubscriptionRequest) {
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

fun main() {
  RestateHttpEndpointBuilder.builder().bind(SubscriptionObject()).buildAndListen()
}
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
