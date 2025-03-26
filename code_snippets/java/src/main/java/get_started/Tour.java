package get_started;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.http.vertx.RestateHttpServer;
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
    // !mark
    String idempotencyKey = ctx.random().nextUUID().toString();
    // !mark
    System.out.println("My idempotency key: " + idempotencyKey);

    // !mark
    throw new IllegalStateException("The handler failed");
  }

  // <end_uuid>

  public static void main(String[] args) {
    RestateHttpServer.listen(Endpoint.bind(new Tour()).bind(new TicketObject()).build());
  }
}

@Service
class CheckoutService {
  // <start_checkout>
  @Handler
  public boolean handle(Context ctx, CheckoutRequest request) {
    // !mark
    double totalPrice = request.getTickets().size() * 40.0;

    String idempotencyKey = ctx.random().nextUUID().toString();

    // !mark
    boolean success =
        // !mark
        ctx.run(
            // !mark
            Boolean.class,
            // !mark
            () -> PaymentClient.get().call(idempotencyKey, totalPrice));

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
