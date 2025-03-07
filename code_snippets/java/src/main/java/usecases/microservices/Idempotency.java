package usecases.microservices;

import dev.restate.sdk.client.CallRequestOptions;
import dev.restate.sdk.client.Client;

public class Idempotency {

  public static String RESTATE_URL = "http://localhost:8080";

  public void createSubscription() {
    String requestId = "123";
    Utils.SubscriptionRequest subscriptionRequest =
        new Utils.SubscriptionRequest("123", "123", new String[] {"123"});
    // <start_here>
    // <mark_1>
    Client restateClient = Client.connect(RESTATE_URL);
    SubscriptionServiceClient.fromClient(restateClient)
        .send()
        .add(
            subscriptionRequest,
            // <mark_2>
            CallRequestOptions.DEFAULT.withIdempotency(requestId));
    // </mark_2>
    // </mark_1>
    // <end_here>
  }
}
