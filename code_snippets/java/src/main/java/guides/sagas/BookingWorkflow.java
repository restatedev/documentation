package guides.sagas;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.common.TerminalException;
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.http.vertx.RestateHttpServer;
import guides.sagas.clients.CarRentalClient;
import guides.sagas.clients.FlightClient;
import guides.sagas.clients.PaymentClient;

import java.util.ArrayList;
import java.util.List;

/*
Trip reservation workflow using sagas:
Restate infinitely retries failures, and recovers previous progress.
But for some types of failures (terminal exceptions), we don't want to retry
but want to undo the previous actions and finish.

Restate guarantees the execution of your code. This makes it very easy to implement sagas.
We execute actions, and keep track of a list of undo actions.
When a terminal exception occurs, Restate ensures execution of all compensations.

+------ Initialize compensations list ------+
                     |
                     v
+------------------ Try --------------------+
| 1. Reserve Flights & Register Undo        |
| 2. Reserve Car & Register Undo            |
| 3. Generate Payment ID & Register Refund  |
| 4. Perform Payment                        |
| 5. Confirm Flight Reservation             |
| 6. Confirm Car Reservation                |
+------------------ Catch ------------------+
| If TerminalException:                     |
|   Execute compensations in reverse order  |
| Rethrow error                             |
+-------------------------------------------+

Note: that the compensation logic is purely implemented in user code (no special Restate API)
 */
@Service
public class BookingWorkflow {

    public record BookingRequest(
            FlightClient.FlightBookingRequest flights,
            CarRentalClient.CarRentalRequest car,
            PaymentClient.PaymentInfo paymentInfo) {}

    @Handler
    public void run(Context ctx, BookingRequest req) throws TerminalException {
        List<Runnable> compensations = new ArrayList<>();

        // <start_twostep>
        // !mark[/flightBookingId/] red
        String flightBookingId = ctx.run(String.class, () -> FlightClient.reserve(req.flights()));
        // !mark[/flightBookingId/] red
        compensations.add(() -> ctx.run(() -> FlightClient.cancel(flightBookingId)));

        // ... do other work, like reserving a car, etc. ...

        // !mark[/flightBookingId/] red
        ctx.run(() -> FlightClient.confirm(flightBookingId));
        // <end_twostep>


        // <start_idempotency>
        // !mark[/paymentId/] red
        String paymentId = ctx.random().nextUUID().toString();
        // !mark[/paymentId/] red
        compensations.add(() -> ctx.run(() -> PaymentClient.refund(paymentId)));
        // !mark[/paymentId/] red
        ctx.run(() -> PaymentClient.charge(req.paymentInfo(), paymentId));
        // <end_idempotency>
    }

    public static void main(String[] args) {
        RestateHttpServer.listen(Endpoint.bind(new BookingWorkflow()));
    }
}