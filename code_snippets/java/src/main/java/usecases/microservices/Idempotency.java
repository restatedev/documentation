package usecases.microservices;

import dev.restate.sdk.client.CallRequestOptions;
import dev.restate.sdk.client.Client;

public class Idempotency {

  public static String RESTATE_URL = "http://localhost:8080";

  // <start_here>
  public void reserveProduct(String productId, String reservationId) {
    // !focus(1:4)
    // <mark_1>
    Client restateClient = Client.connect(RESTATE_URL);
    ProductServiceClient.fromClient(restateClient, productId)
        .send()
        // <mark_2>
        .reserve(CallRequestOptions.DEFAULT.withIdempotency(reservationId));
    // </mark_2>
    // </mark_1>
  }
  // <end_here>

}
