package concepts.services;

import static usecases.microservices.Utils.createRecurringPayment;
import static usecases.microservices.Utils.createSubscription;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.http.vertx.RestateHttpServer;
import usecases.microservices.Utils.SubscriptionRequest;

// <start_here>
// <mark_2>
@Service
public class SubscriptionService {
  // </mark_2>

  // <mark_2>
  @Handler
  public void add(Context ctx, SubscriptionRequest req) {
    // </mark_2>
    // <mark_3>
    // <mark_1>
    var paymentId = ctx.random().nextUUID().toString();
    // </mark_1>

    // <mark_1>
    var payRef =
        ctx.run(
            String.class,
            // break
            () -> createRecurringPayment(req.creditCard(), paymentId));
    // </mark_1>

    for (String subscription : req.subscriptions()) {
      // <mark_1>
      ctx.run(() -> createSubscription(req.userId(), subscription, payRef));
      // </mark_1>
    }
    // </mark_3>
  }

  public static void main(String[] args) {
    // <mark_4>
    RestateHttpServer.listen(
        // break
        Endpoint.bind(new SubscriptionService()));
    // </mark_4>
  }
}
// <end_here>
