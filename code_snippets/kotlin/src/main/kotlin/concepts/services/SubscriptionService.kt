package concepts.services

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder
import dev.restate.sdk.kotlin.*
import dev.restate.sdk.kotlin.Context
import kotlinx.serialization.Serializable

@Serializable
data class SubscriptionRequest(
    val userId: String,
    val creditCard: String,
    val subscriptions: List<String>
)

// <start_here>
// <mark_2>
@Service
class SubscriptionService {
  // </mark_2>

  // <mark_2>
  @Handler
  suspend fun add(ctx: Context, req: SubscriptionRequest) {
    // </mark_2>
    // <mark_3>
    // <mark_1>
    val paymentId = ctx.random().nextUUID().toString()
    // </mark_1>

    // <mark_1>
    val payRef = ctx.runBlock { createRecurringPayment(req.creditCard, paymentId) }
    // </mark_1>

    for (subscription in req.subscriptions) {
      // <mark_1>
      ctx.runBlock { createSubscription(req.userId, subscription, payRef) }
      // </mark_1>
    }
    // </mark_3>
  }
}

fun main() {
  // <mark_4>
  RestateHttpEndpointBuilder.builder().bind(SubscriptionService()).buildAndListen()
  // </mark_4>
}
// <end_here>

fun createSubscription(userId: String, subscription: String, paymentRef: String): String {
  return "SUCCESS"
}

fun createRecurringPayment(creditCard: String, paymentId: String): String {
  return "payment-reference"
}
