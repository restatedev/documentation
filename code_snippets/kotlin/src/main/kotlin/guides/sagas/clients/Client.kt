package my.example.sagas.clients

import kotlinx.serialization.Serializable
import org.apache.logging.log4j.LogManager

@Serializable data class FlightBookingRequest(val flightId: String, val passengerName: String)

private val logger = LogManager.getLogger("Flights")

fun reserveFlight(customerId: String, request: FlightBookingRequest): String {
  // this should implement the communication with the flight
  // provider's APIs
  logger.info("Flight reservation created for customer: {}", customerId)
  return "my id"
}

fun cancelFlight(flightId: String) {
  // this should implement the communication with the flight
  // provider's APIs
  logger.info("Flight reservation cancelled for customer: {}", flightId)
}

fun confirmFlight(flightId: String) {
  // this should implement the communication with the flight
  // provider's APIs
  logger.info("Flight reservation cancelled for customer: {}", flightId)
}

fun charge(paymentInfo: String, paymentId: String) {}

fun refund(paymentInfo: String) {}
