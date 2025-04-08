package usecases.microservices.saga

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.common.TerminalException
import dev.restate.sdk.http.vertx.RestateHttpServer
import dev.restate.sdk.kotlin.*
import dev.restate.sdk.kotlin.Context
import dev.restate.sdk.kotlin.endpoint.endpoint
import kotlinx.serialization.Serializable

// <start_here>
@Service
class SubscriptionSaga {

  @Handler
  suspend fun add(ctx: Context, req: SubscriptionRequest) {
    // !focus(1:17)
    // <mark_1>
    val compensations: MutableList<suspend () -> Unit> = mutableListOf()
    // </mark_1>

    try {
      val paymentId = ctx.random().nextUUID().toString()
      // <mark_1>
      compensations.add { removeRecurringPayment(paymentId) }
      // </mark_1>
      // <mark_1> green
      ctx.runBlock { createRecurringPayment(req.creditCard, paymentId) }
      // </mark_1>

      for (subscription in req.subscriptions) {
        // <mark_1>
        compensations.add { removeSubscription(req.userId, subscription) }
        // </mark_1>
        // <mark_1> green
        ctx.runBlock { createSubscription(req.userId, subscription) }
        // </mark_1>
      }
    } catch (e: TerminalException) {
      // <mark_2>
      compensations.reversed().forEach { ctx.runBlock { it() } }
      // </mark_2>
      throw TerminalException("Subscription failed")
    }
  }
}
// <end_here>

fun main() {
  RestateHttpServer.listen(endpoint { bind(SubscriptionSaga()) })
}

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
