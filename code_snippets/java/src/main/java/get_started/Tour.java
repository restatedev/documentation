package get_started;

import dev.restate.sdk.Context;
import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.common.TerminalException;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

import java.time.Duration;

@Service
public class Tour {

   @Handler
   public void handle(Context ctx) {
       String ticketId = "123";

       // <start_sleep_and_send>
       ctx.sleep(Duration.ofMinutes(15));
       TicketObjectClient.fromContext(ctx).send().unreserve();
       // <end_sleep_and_send>

       // <start_idempotency_key_retry>
       String idempotencyKey = ctx.random().nextUUID().toString();
       System.out.println("My idempotency key: " + idempotencyKey);
       TourUtils.fail();
       // <end_idempotency_key_retry>
   }

    public static void main(String[] args) {
        RestateHttpEndpointBuilder.builder().bind(new Tour()).bind(new TicketObject()).buildAndListen();
    }
}

class TourUtils {
    public static fail() {}
    }
}
