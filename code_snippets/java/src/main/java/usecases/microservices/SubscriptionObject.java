package usecases.microservices;

import static dev.restate.sdk.JsonSerdes.BOOLEAN;
import static dev.restate.sdk.JsonSerdes.STRING;
import static usecases.microservices.ObjectUtils.createRecurringPayment;
import static usecases.microservices.Utils.createSubscription;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.lambda.BaseRestateLambdaHandler;
import dev.restate.sdk.lambda.RestateLambdaEndpointBuilder;

// <start_here>
// <mark_2>
@VirtualObject
public class SubscriptionObject {
  // </mark_2>

  // <mark_1>
  StateKey<String> SUBSCRIPTION = StateKey.of("subscription", STRING);

  // </mark_1>

  // <mark_2>
  @Handler
  public void add(ObjectContext ctx, ObjectUtils.SubscriptionRequest req) {
    // </mark_2>

    // <mark_1>
    ctx.set(SUBSCRIPTION, "awaiting_payment");
    // </mark_1>
    var paymentId = ctx.random().nextUUID().toString();
    boolean success =
        ctx.run(
            BOOLEAN,
            // break
            () -> createRecurringPayment(req.creditCard(), paymentId));

    if (!success) {
      // <mark_1>
      ctx.set(SUBSCRIPTION, "payment_failed");
      // </mark_1>
      return;
    }

    // <mark_1>
    ctx.set(SUBSCRIPTION, "creating_subscription");
    // </mark_1>
    ctx.run(() -> createSubscription(req.userId(), req.subscription()));

    // <mark_1>
    ctx.set(SUBSCRIPTION, "created");
    // </mark_1>
  }
}

// <mark_3>
class MyLambdaHandler extends BaseRestateLambdaHandler {
  @Override
  public void register(RestateLambdaEndpointBuilder builder) {
    builder.bind(new SubscriptionService());
  }
}
// </mark_3>
// <end_here>
