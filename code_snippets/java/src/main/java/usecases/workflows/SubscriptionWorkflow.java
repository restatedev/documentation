package usecases.workflows;

import static usecases.microservices.Utils.*;

import dev.restate.sdk.WorkflowContext;
import dev.restate.sdk.annotation.Workflow;
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.lambda.BaseRestateLambdaHandler;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.common.TerminalException;
import java.util.ArrayList;
import java.util.List;

// <start_here>
@Workflow
public class SubscriptionWorkflow {

  // <mark_1>
  StateKey<String> STATUS = StateKey.of("status", String.class);

  // </mark_1>

  @Workflow
  public void run(WorkflowContext ctx, SubscriptionRequest req) {
    // <mark_2> orange
    List<Runnable> compensations = new ArrayList<>();
    // </mark_2>
    try {
      var paymentId = ctx.random().nextUUID().toString();
      // <mark_2> orange
      compensations.add(() -> removeRecurringPayment(paymentId));
      // </mark_2>
      // <mark_2> green
      ctx.run(String.class, () -> createRecurringPayment(req.creditCard(), paymentId));
      // </mark_2>
      // <mark_1>
      ctx.set(STATUS, "payment_success");
      // </mark_1>

      for (String subscription : req.subscriptions()) {
        // <mark_2> orange
        compensations.add(() -> removeSubscription(req.userId(), subscription));
        // </mark_2>
        // <mark_2> green
        ctx.run(() -> createSubscription(req.userId(), subscription));
        // </mark_2>
      }
      // <mark_1>
      ctx.set(STATUS, "subscribed");
      // </mark_1>
    } catch (TerminalException e) {
      // <mark_2> orange
      for (Runnable compensation : compensations) {
        ctx.run(() -> compensation.run());
      }
      // </mark_2>
      // <mark_1>
      ctx.set(STATUS, "rolled_back");
      // </mark_1>
      throw e;
    }
  }
}

// <mark_3>
class MyLambdaHandler extends BaseRestateLambdaHandler {
  @Override
  public void register(Endpoint.Builder builder) {
    builder.bind(new SubscriptionWorkflow());
  }
}
// </mark_3>
// <end_here>
