package usecases.microservices;

import dev.restate.sdk.client.CallRequestOptions;
import dev.restate.sdk.client.Client;

class Config {
  public static String RESTATE_URL = "http://localhost:8080";
}

public class Idempotency {

  // <start_here>
  Client rs = Client.connect(Config.RESTATE_URL);

  public void reserveProduct(String productId, String reservationId) {
    // <mark_1>
    ProductServiceClient.fromClient(rs, productId)
        .send()
        .reserve(CallRequestOptions.DEFAULT.withIdempotency(reservationId));
    // </mark_1>
  }
  // <end_here>

}
