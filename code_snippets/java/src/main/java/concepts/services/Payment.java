package concepts.services;

import concepts.buildingblocks.utils.PaymentClient;
import concepts.services.types.PaymentRequest;
import concepts.services.types.PaymentSuccess;
import dev.restate.sdk.SharedWorkflowContext;
import dev.restate.sdk.WorkflowContext;
import dev.restate.sdk.annotation.Shared;
import dev.restate.sdk.annotation.Workflow;
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.http.vertx.RestateHttpServer;
import dev.restate.sdk.types.DurablePromiseKey;
import dev.restate.sdk.types.StateKey;
import dev.restate.sdk.types.TerminalException;

// <start_here>
@Workflow
public class Payment {

  private static final StateKey<String> STATUS =
      // break
      StateKey.of("status", String.class);
  private static final DurablePromiseKey<PaymentSuccess> PAYMENT_SUCCESS =
      DurablePromiseKey.of("success", PaymentSuccess.class);

  // <mark_1>
  @Workflow
  public String run(WorkflowContext ctx, PaymentRequest req) {

    if (req.getAmount() < 0) {
      throw new TerminalException("Payment refused: negative amount");
    }

    ctx.run(
        "make a req", Boolean.class, () -> PaymentClient.charge(req.getAccount(), req.getAmount()));

    // <mark_3>
    ctx.promise(PAYMENT_SUCCESS).future().await();
    // </mark_3>

    // <mark_2>
    ctx.set(STATUS, "Payment succeeded");
    // </mark_2>

    ctx.run(
        "notify the user",
        Boolean.class,
        () -> EmailClient.sendSuccessNotification(req.getEmail()));

    // <mark_2>
    ctx.set(STATUS, "User notified of req success");
    // </mark_2>

    return "success";
  }

  // </mark_1>

  // <mark_3>
  @Shared
  public void paymentWebhook(SharedWorkflowContext ctx, PaymentSuccess msg) {
    ctx.promiseHandle(PAYMENT_SUCCESS).resolve(msg);
  }

  // </mark_3>

  // <mark_2>
  @Shared
  public String getStatus(SharedWorkflowContext ctx) {
    return ctx.get(STATUS).orElse("unknown");
  }

  // </mark_2>

  public static void main(String[] args) {
    var endpoint =
        Endpoint
            // break
            .bind(new Payment());
    // break
    RestateHttpServer.listen(endpoint);
  }
}
// <end_here>
