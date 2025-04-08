package usecases.microservices;

import static usecases.microservices.Utils.*;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.common.TerminalException;
import java.util.ArrayList;
import java.util.List;
import usecases.microservices.Utils.SubscriptionRequest;

// <start_here>
@Service
public class SubscriptionSaga {

  @Handler
  public void add(Context ctx, SubscriptionRequest req) {
    // !focus(1:17)
    // <mark_1>
    List<Runnable> compensations = new ArrayList<>();
    // </mark_1>
    try {
      var paymentId = ctx.random().nextUUID().toString();
      // <mark_1>
      compensations.add(() -> removeRecurringPayment(paymentId));
      // </mark_1>
      // <mark_1> green
      ctx.run(String.class, () -> createRecurringPayment(req.creditCard(), paymentId));
      // </mark_1>

      for (String subscription : req.subscriptions()) {
        // <mark_1>
        compensations.add(() -> removeSubscription(req.userId(), subscription));
        // </mark_1>
        // <mark_1> green
        ctx.run(() -> createSubscription(req.userId(), subscription));
        // </mark_1>
      }
    } catch (TerminalException e) {
      // <mark_2>
      for (Runnable compensation : compensations) {
        ctx.run(() -> compensation.run());
      }
      // </mark_2>
      throw e;
    }
  }
}
// <end_here>
