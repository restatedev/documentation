package develop

import dev.restate.client.Client
import dev.restate.sdk.testing.BindService
import dev.restate.sdk.testing.RestateClient
import dev.restate.sdk.testing.RestateTest
import develop.clients.GreeterService
import develop.clients.GreeterServiceClient
import kotlinx.coroutines.test.runTest
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

@RestateTest
class GreeterTestMethod {

  @BindService val service = GreeterService()

  // <start_test>
  @Test
  fun testGreet(@RestateClient ingressClient: Client) = runTest {
    // Create the service client from the injected ingress client
    val client = GreeterServiceClient.fromClient(ingressClient)

    // Send request to service and assert the response
    val response = client.greet("Francesco")
    assertEquals(response, "Hello, Francesco!")
  }
  // <end_test>
}
