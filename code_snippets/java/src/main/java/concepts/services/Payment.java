package concepts.services;

import concepts.buildingblocks.utils.PaymentClient;
import concepts.services.types.PaymentRequest;
import concepts.services.types.PaymentSuccess;
import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.SharedWorkflowContext;
import dev.restate.sdk.WorkflowContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Workflow;
import dev.restate.sdk.common.DurablePromiseKey;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.common.TerminalException;
import dev.restate.sdk.serde.jackson.JacksonSerdes;


// <start_workflow>
@Workflow
public class Payment {

    private final StateKey<String> STATUS = StateKey.of("status", JsonSerdes.STRING);
    private static final DurablePromiseKey<PaymentSuccess> PAYMENT_SUCCESS =
        DurablePromiseKey.of("payment.success", JacksonSerdes.of(PaymentSuccess.class));

    @Workflow
    public String run(WorkflowContext ctx, PaymentRequest payment){

        if(payment.getAmount() < 0){
            throw new TerminalException("Payment refused: negative amount");
        }

        ctx.run("make a payment", JsonSerdes.BOOLEAN, () ->
            PaymentClient.charge(ctx.key(), payment.getAccount(), payment.getAmount()));

        ctx.durablePromise(PAYMENT_SUCCESS).awaitable().await();

        ctx.set(STATUS, "Payment succeeded");

        ctx.run("notify the user", JsonSerdes.BOOLEAN, () ->
            EmailClient.sendSuccessNotification(payment.getEmail()));

        ctx.set(STATUS, "User notified of payment success");

        return "success";
    }

    @Handler
    public void paymentWebhook(SharedWorkflowContext ctx, PaymentSuccess msg){
        ctx.durablePromiseHandle(PAYMENT_SUCCESS).resolve(msg);
    }

    @Handler
    public String getStatus (SharedWorkflowContext ctx){
        return ctx.get(STATUS).orElse("unknown");
    }
}
// <end_workflow>
