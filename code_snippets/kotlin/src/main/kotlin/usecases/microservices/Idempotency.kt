package usecases.microservices

import dev.restate.sdk.client.CallRequestOptions
import dev.restate.sdk.client.Client

class Config {
  companion object {
    const val RESTATE_URL = "http://localhost:8080"
  }
}

class Idempotency {

  // <start_here>
  val rs = Client.connect(Config.RESTATE_URL)

  suspend fun reserveProduct(productId: String, reservationId: String) {
    // <mark_1>
    ProductServiceClient.fromClient(rs, productId)
        .send()
        .reserve(CallRequestOptions.DEFAULT.withIdempotency(reservationId))
    // </mark_1>
  }
  // <end_here>
}
