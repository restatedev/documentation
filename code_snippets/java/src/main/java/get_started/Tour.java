package get_started;

import dev.restate.sdk.Context;
import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

import java.time.Duration;

@Service
public class Tour {

   @Handler
   public void myFn(Context ctx) {
       String ticketId = "123";

       // <start_sleep>
       ctx.sleep(Duration.ofMinutes(15));
       // <end_sleep>

       // <start_sleep_and_send>
       ctx.sleep(Duration.ofMinutes(15));
       TicketObjectClient.fromContext(ctx, ticketId).send().unreserve();
       // <end_sleep_and_send>
   }

   // <start_uuid>
   @Handler
    public boolean handle(Context ctx, CheckoutRequest request) {
       // withClass(1,2,4) highlight-line
       String idempotencyKey = ctx.random().nextUUID().toString();
       System.out.println("My idempotency key: " + idempotencyKey);

       throw new IllegalStateException("The handler failed");
    }
    // <end_uuid>

    public static void main(String[] args) {
        RestateHttpEndpointBuilder.builder().bind(new Tour()).bind(new TicketObject()).buildAndListen();
    }
}

@Service
class CheckoutService {
    // <start_checkout>
    @Handler
    public boolean handle(Context ctx, CheckoutRequest request) {
        // withClass highlight-line
        double totalPrice = request.getTickets().size() * 40.0;

        String idempotencyKey = ctx.random().nextUUID().toString();

        // withClass highlight-line
        boolean success = ctx.run(JsonSerdes.BOOLEAN, () ->
                PaymentClient.get().call(idempotencyKey, totalPrice));

        return success;
    }
    // <end_checkout>


}

class PaymentClient {

    public static PaymentClient get() {
        return new PaymentClient();
    }
    public boolean call(String idempotencyKey, double totalPrice) {
        return true;
    }
}