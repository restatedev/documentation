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

@Service
public class BookingWorkflow {

  public record BookingRequest(
      FlightClient.FlightBookingRequest flight,
      CarRentalClient.CarRentalRequest car,
      PaymentClient.PaymentInfo paymentInfo) {}

  @Handler
  public void run(Context ctx, BookingRequest req) throws TerminalException {
    var flight = req.flight;
    var paymentInfo = req.paymentInfo;
    List<Runnable> compensations = new ArrayList<>();

    // <start_twostep>
    // !mark[/bookingId/] red
    String bookingId = ctx.run(String.class, () -> FlightClient.reserve(flight));
    // !mark[/bookingId/] red
    compensations.add(() -> ctx.run(() -> FlightClient.cancel(bookingId)));

    // ... do other work, like reserving a car, etc. ...

    // !mark[/bookingId/] red
    ctx.run(() -> FlightClient.confirm(bookingId));
    // <end_twostep>

    // <start_idempotency>
    // !mark[/paymentId/] red
    String paymentId = ctx.random().nextUUID().toString();
    // !mark[/paymentId/] red
    compensations.add(() -> ctx.run(() -> PaymentClient.refund(paymentId)));
    // !mark[/paymentId/] red
    ctx.run(() -> PaymentClient.charge(paymentInfo, paymentId));
    // <end_idempotency>
  }

  public static void main(String[] args) {
    RestateHttpServer.listen(Endpoint.bind(new BookingWorkflow()));
  }
}
