package develop;

import com.google.protobuf.Empty;
import dev.restate.sdk.ObjectContext;
import static greeter.generated.GreeterProto.*;

import static example.generated.ExampleProto.*;
import static example.generated.TicketServiceRestate.*;

import dev.restate.sdk.common.TerminalException;
import example.generated.TicketServiceRestate;
import greeter.generated.GreeterRestate;

import java.time.Duration;

public class Tour extends TicketServiceRestateImplBase {

    @Override
    public void unreserve(ObjectContext ctx, Ticket request) throws TerminalException {

        // <start_sleep_and_send>
        ctx.sleep(Duration.ofMinutes(15));
        TicketServiceRestateClient ticketClnt = TicketServiceRestate.newClient(ctx);
        ticketClnt.oneWay().unreserve(Ticket.newBuilder().setTicketId(request.getTicketId()).build());
        // <end_sleep_and_send>

        // <start_idempotency_key_retry>
        String idempotencyKey = ctx.random().nextUUID().toString();
        System.out.println("My idempotency key: " + idempotencyKey);
        throw new IllegalStateException("Something went wrong.");
        // <end_idempotency_key_retry>
    }

    private String doDbRequest(){ return ""; }
}