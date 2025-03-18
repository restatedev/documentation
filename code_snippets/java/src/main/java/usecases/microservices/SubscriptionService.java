package usecases.microservices;

import static usecases.microservices.Utils.createRecurringPayment;
import static usecases.microservices.Utils.createSubscription;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.http.vertx.RestateHttpServer;
import usecases.microservices.Utils.SubscriptionRequest;

// <start_here>
// <mark_1>
@Service
public class SubscriptionService {
  // </mark_1>

  // <mark_1>
  @Handler
  public void add(Context ctx, SubscriptionRequest req) {
    // </mark_1>
    var paymentId = ctx.random().nextUUID().toString();

    // <mark_2>
    var payRef =
        ctx.run(
            String.class,
            // break
            () -> createRecurringPayment(req.creditCard(), paymentId));
    // </mark_2>

    for (String subscription : req.subscriptions()) {
      // <mark_2>
      ctx.run(() -> createSubscription(req.userId(), subscription, payRef));
      // </mark_2>
    }
  }

  public static void main(String[] args) {
    RestateHttpServer.listen(
        // break
        Endpoint.bind(new SubscriptionService()));
  }
}
// <end_here>
