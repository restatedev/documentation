package my.example.sagas

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.http.vertx.RestateHttpServer
import dev.restate.sdk.kotlin.*
import dev.restate.sdk.kotlin.endpoint.endpoint
import kotlinx.serialization.Serializable
import my.example.sagas.clients.FlightBookingRequest
import my.example.sagas.clients.reserveFlight
import my.example.sagas.clients.cancelFlight
import my.example.sagas.clients.charge
import my.example.sagas.clients.confirmFlight
import my.example.sagas.clients.refund

@Serializable
data class BookingRequest(
  val customerId: String,
  val flight: FlightBookingRequest,
  val paymentInfo: String,

)

@Service
class BookingWorkflow {

  @Handler
  suspend fun run(ctx: Context, req: BookingRequest) {
    val customerId = req.customerId
    val flight = req.flight
    val paymentInfo = req.paymentInfo

    // Create a list of undo actions
    val compensations = mutableListOf<suspend () -> Unit>()

    // <start_twostep>
    // For each action, we register a compensation that will be executed on failures
    // !mark[/bookingId/] red
    val bookingId = ctx.runBlock { reserveFlight(customerId, flight) }
    // !mark[/bookingId/] red
    compensations.add { ctx.runBlock { cancelFlight(bookingId) } }

    // ... do other work, like reserving a car, etc. ...

    // !mark[/bookingId/] red
    compensations.add { ctx.runBlock { confirmFlight(bookingId) } }
    // <end_twostep>

    // <start_idempotency>
    // !mark[/paymentId/] red
    val paymentId = ctx.random().nextUUID().toString();
    // !mark[/paymentId/] red
    compensations.add { ctx.runBlock { refund(paymentId) } }
    // !mark[/paymentId/] red
    ctx.runBlock { charge(paymentInfo, paymentId) }
    // <end_idempotency>

  }
}

fun main() {
  RestateHttpServer.listen(endpoint { bind(BookingWorkflow()) })
}
