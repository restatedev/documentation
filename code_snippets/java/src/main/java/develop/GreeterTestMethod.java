package develop;

import static org.junit.jupiter.api.Assertions.assertEquals;

import dev.restate.client.Client;
import dev.restate.sdk.testing.BindService;
import dev.restate.sdk.testing.RestateClient;
import dev.restate.sdk.testing.RestateTest;
import develop.clients.GreeterService;
import develop.clients.GreeterServiceClient;
import org.junit.jupiter.api.Test;

@RestateTest
class GreeterTestMethod {

  @BindService GreeterService service = new GreeterService();

  // <start_test>
  @Test
  void testGreet(@RestateClient Client ingressClient) {
    // Create the service client from the injected ingress client
    var client = GreeterServiceClient.fromClient(ingressClient);

    // Send request to service and assert the response
    var response = client.greet("Francesco");
    assertEquals(response, "Hello, Francesco!");
  }
  // <end_test>
}
