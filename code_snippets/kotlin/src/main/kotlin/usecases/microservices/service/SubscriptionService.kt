package usecases.microservices.service

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder
import dev.restate.sdk.kotlin.*
import dev.restate.sdk.kotlin.Context
import usecases.microservices.SubscriptionRequest

// <start_here>
// <mark_1>
@Service
class SubscriptionService {
  // </mark_1>

  // <mark_1>
  @Handler
  suspend fun add(ctx: Context, req: SubscriptionRequest) {
    // </mark_1>
    val paymentId = ctx.random().nextUUID().toString()

    // <mark_2>
    val payRef = ctx.runBlock { createRecurringPayment(req.creditCard, paymentId) }
    // </mark_2>

    for (subscription in req.subscriptions) {
      // <mark_2>
      ctx.runBlock { createSubscription(req.userId, subscription, payRef) }
      // </mark_2>
    }
  }
}

fun main() {
  RestateHttpEndpointBuilder.builder().bind(SubscriptionService()).buildAndListen()
}
// <end_here>

fun createSubscription(userId: String, subscription: String, paymentRef: String): String {
  return "SUCCESS"
}

fun createRecurringPayment(creditCard: String, paymentId: String): String {
  return "payment-reference"
}
