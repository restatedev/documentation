package usecases.asynctasks.reminder;

import static usecases.asynctasks.reminder.Utils.escalateToHuman;
import static usecases.asynctasks.reminder.Utils.sendReminderEmail;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;
import dev.restate.sdk.common.StateKey;
import java.time.Duration;

record StripeEvent() {}

// <start_here>
@VirtualObject
public class PaymentTracker {

  StateKey<Boolean> PAID = StateKey.of("paid", Boolean.class);
  StateKey<Integer> REMINDER_COUNT = StateKey.of("reminder_count", Integer.class);

  // Stripe sends us webhook events for invoice payment attempts
  // <mark_1>
  @Handler
  public void onPaymentSuccess(ObjectContext ctx, StripeEvent event) {
    // </mark_1>
    // <mark_3>
    ctx.set(PAID, true);
    // </mark_3>
  }

  // <mark_1>
  @Handler
  public void onPaymentFailure(ObjectContext ctx, StripeEvent event) {
    // </mark_1>
    // <mark_3>
    if (ctx.get(PAID).orElse(false)) {
      return;
    }
    // </mark_3>

    int remindersCount = ctx.get(REMINDER_COUNT).orElse(0);
    if (remindersCount < 3) {
      ctx.set(REMINDER_COUNT, remindersCount + 1);
      ctx.run(() -> sendReminderEmail(event));

      // Schedule next reminder via a delayed self call
      // <mark_2>
      PaymentTrackerClient.fromContext(ctx, ctx.key())
          .send()
          .onPaymentFailure(event, Duration.ofDays(1));
      // </mark_2>
    } else {
      // <mark_2>
      ctx.run(() -> escalateToHuman(event));
      // </mark_2>
    }
  }
}
// <end_here>
