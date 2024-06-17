package concepts.services;

import concepts.buildingblocks.utils.PaymentClient;
import concepts.services.types.PaymentRequest;
import concepts.services.types.PaymentSuccess;
import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.SharedWorkflowContext;
import dev.restate.sdk.WorkflowContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Shared;
import dev.restate.sdk.annotation.Workflow;
import dev.restate.sdk.common.DurablePromiseKey;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.common.TerminalException;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;
import dev.restate.sdk.serde.jackson.JacksonSerdes;


// <start_here>
@Workflow
public class Payment {

    private final StateKey<String> STATUS = StateKey.of("status", JsonSerdes.STRING);
    private static final DurablePromiseKey<PaymentSuccess> PAYMENT_SUCCESS =
        DurablePromiseKey.of("payment.success", JacksonSerdes.of(PaymentSuccess.class));

    // <mark_1>
    @Workflow
    public String run(WorkflowContext ctx, PaymentRequest payment) {

        if (payment.getAmount() < 0) {
            throw new TerminalException("Payment refused: negative amount");
        }

        ctx.run("make a payment", JsonSerdes.BOOLEAN, () ->
            PaymentClient.charge(ctx.key(), payment.getAccount(), payment.getAmount()));

        // <mark_3>
        ctx.promise(PAYMENT_SUCCESS).awaitable().await();
        // </mark_3>

        // <mark_2>
        ctx.set(STATUS, "Payment succeeded");
        // </mark_2>

        ctx.run("notify the user", JsonSerdes.BOOLEAN, () ->
            EmailClient.sendSuccessNotification(payment.getEmail()));

        // <mark_2>
        ctx.set(STATUS, "User notified of payment success");
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
        RestateHttpEndpointBuilder.builder()
                .bind(new Payment())
                .buildAndListen();
    }
}
// <end_here>
