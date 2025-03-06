package usecases.microservices

import dev.restate.sdk.client.CallRequestOptions
import dev.restate.sdk.client.Client
import usecases.microservices.service.SubscriptionServiceClient

class Config {
  companion object {
    const val RESTATE_URL = "http://localhost:8080"
  }
}

class Idempotency {
  suspend fun createSubscription() {
     val requestId = "123"
      val subscriptionRequest = SubscriptionRequest("123", "123", listOf("123"))
      // <start_here>
      val restateClient = Client.connect(Config.RESTATE_URL)
    // <mark_1>
      SubscriptionServiceClient.fromClient(restateClient)
        .send()
        .add(
            subscriptionRequest,
            // <mark_2>
            CallRequestOptions.DEFAULT.withIdempotency(requestId)
            // </mark_2>
        )
    // </mark_1>
  // <end_here>
  }
}
