package usecases.asynctasks.reminder;

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder
import dev.restate.sdk.kotlin.*
import kotlin.time.Duration.Companion.days


// <start_here>
@VirtualObject
class PaymentTracker {

    companion object {
        private val PAID = KtStateKey.json<Boolean>("paid")
        private val REMINDER_COUNT = KtStateKey.json<Int>("reminder_count")
    }

    // Stripe sends us webhook events for invoice payment attempts
    // <mark_1>
    @Handler
    suspend fun onPaymentSuccess(ctx: ObjectContext, event: StripeEvent) {
        // </mark_1>
        // <mark_3>
        ctx.set(PAID, true)
        // </mark_3>
    }

    // <mark_1>
    @Handler
    suspend fun onPaymentFailure(ctx: ObjectContext, event: StripeEvent) {
        // </mark_1>
        // <mark_3>
        if (ctx.get(PAID) == true) {
            return
        }
        // </mark_3>

        val remindersCount = ctx.get(REMINDER_COUNT) ?: 0
        if (remindersCount < 3) {
            ctx.set(REMINDER_COUNT, remindersCount + 1)
            ctx.runBlock { sendReminderEmail(event) }

            // Schedule next reminder via a delayed self call
            // <mark_2>
            PaymentTrackerClient.fromContext(ctx, ctx.key())
                    .send(1.days)
                    .onPaymentFailure(event)
            // </mark_2>
        } else {
            // <mark_2>
            ctx.runBlock { escalateToHuman(event) }
            // </mark_2>
        }
    }
}
// <end_here>

fun main() {
    RestateHttpEndpointBuilder.builder().bind(PaymentTracker()).buildAndListen()
}
