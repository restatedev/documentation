package develop;

import static org.junit.jupiter.api.Assertions.assertEquals;

import dev.restate.sdk.client.Client;
import dev.restate.sdk.testing.RestateClient;
import dev.restate.sdk.testing.RestateRunner;
import dev.restate.sdk.testing.RestateRunnerBuilder;
import develop.clients.GreeterService;
import develop.clients.GreeterServiceClient;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;

class GreeterTest {

  // <start_extension>
  @RegisterExtension
  private static final RestateRunner RESTATE_RUNNER =
      RestateRunnerBuilder.create()
          // The service to test
          .bind(new GreeterService())
          .buildRunner();

  // <end_extension>

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
