package operate.invocations

import dev.restate.client.Client
import dev.restate.client.kotlin.*
import dev.restate.common.Output
import develop.clients.GreetCounterObjectClient
import develop.clients.GreeterServiceClient
import kotlin.time.Duration.Companion.seconds

class Ingress {
  suspend fun myJavaHandler() {
    // <start_rpc_kotlin>
    val rs = Client.connect("http://localhost:8080")
    val greet: String = GreeterServiceClient.fromClient(rs).greet("Hi")

    val count: Int = GreetCounterObjectClient.fromClient(rs, "Mary").greet("Hi")
    // <end_rpc_kotlin>
  }

  suspend fun myOneWayCallHandler() {
    // <start_one_way_call_kotlin>
    val rs = Client.connect("http://localhost:8080")
    GreeterServiceClient.fromClient(rs)
        // !mark
        .send()
        .greet("Hi")

    GreetCounterObjectClient.fromClient(rs, "Mary")
        // !mark
        .send()
        .greet("Hi")
    // <end_one_way_call_kotlin>
  }

  suspend fun myDelayedOneWayCallHandler() {
    // <start_delayed_call_kotlin>
    val rs = Client.connect("http://localhost:8080")
    GreeterServiceClient.fromClient(rs)
        .send()
        // !mark
        .greet("Hi", 1.seconds)

    GreetCounterObjectClient.fromClient(rs, "Mary")
        .send()
        // !mark
        .greet("Hi", 1.seconds)
    // <end_delayed_call_kotlin>
  }

  suspend fun idempotentInvoke() {
    // <start_service_idempotent>
    val rs = Client.connect("http://localhost:8080")
    GreetCounterObjectClient.fromClient(rs, "Mary")
        .send()
        // !mark
        .greet("Hi") { idempotencyKey = "abcde" }
    // <end_service_idempotent>
  }

  suspend fun attach() {
    // <start_service_attach>
    val rs = Client.connect("http://localhost:8080")
    val sendResponse =
        GreeterServiceClient.fromClient(rs)
            .send()
            // !mark
            .greet("Hi") { idempotencyKey = "abcde" }

    // ... do something else ...

    // Option 1: Attach later to retrieve the result
    // !mark(1:1)
    val greeting: String = sendResponse.attachSuspend().response

    // Option 2: Peek to see if the result is ready
    // !mark(1:1)
    val output: Output<String> = sendResponse.getOutputSuspend().response
    if (output.isReady) {
      val result = output.value
    }
    // <end_service_attach>
  }
}
