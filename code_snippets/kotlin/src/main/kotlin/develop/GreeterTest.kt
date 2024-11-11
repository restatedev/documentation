package develop

import dev.restate.sdk.client.Client
import dev.restate.sdk.testing.RestateClient
import dev.restate.sdk.testing.RestateRunner
import dev.restate.sdk.testing.RestateRunnerBuilder
import develop.clients.GreeterService
import develop.clients.GreeterServiceClient
import kotlinx.coroutines.test.runTest
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.RegisterExtension

internal class GreeterTest {

  // <start_extension>
  companion object {
    @RegisterExtension
    private val RESTATE_RUNNER: RestateRunner =
        RestateRunnerBuilder.create()
            // The service to test
            .bind(GreeterService())
            .buildRunner()
  }
  // <end_extension>

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
