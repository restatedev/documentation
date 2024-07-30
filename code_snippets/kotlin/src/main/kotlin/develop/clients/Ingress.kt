package operate.invocations

import dev.restate.sdk.client.CallRequestOptions
import dev.restate.sdk.client.Client
import dev.restate.sdk.client.SendResponse
import dev.restate.sdk.common.Output
import dev.restate.sdk.kotlin.KtSerdes
import develop.clients.GreetCounterObjectClient
import develop.clients.GreeterServiceClient
import kotlin.time.Duration.Companion.milliseconds
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
        // mark
        .send()
        .greet("Hi")

    GreetCounterObjectClient.fromClient(rs, "Mary")
        // mark
        .send()
        .greet("Hi")
    // <end_one_way_call_kotlin>
  }

  suspend fun myDelayedOneWayCallHandler() {
    // <start_delayed_call_kotlin>
    val rs = Client.connect("http://localhost:8080")
    GreeterServiceClient.fromClient(rs)
        // withClass highlight-line
        .send(1.seconds)
        .greet("Hi")

    GreetCounterObjectClient.fromClient(rs, "Mary")
        // withClass highlight-line
        .send(1000.milliseconds)
        .greet("Hi")
    // <end_delayed_call_kotlin>
  }

  suspend fun idempotentInvoke() {
    // <start_service_idempotent>
    val rs = Client.connect("http://localhost:8080")
    GreetCounterObjectClient.fromClient(rs, "Mary")
        .send()
        // withClass highlight-line
        .greet("Hi", CallRequestOptions.DEFAULT.withIdempotency("abcde"))
    // <end_service_idempotent>
  }

  suspend fun attach() {
    // <start_service_attach>
    val rs = Client.connect("http://localhost:8080")
    val handle: SendResponse =
        GreeterServiceClient.fromClient(rs)
            .send()
            // mark
            .greet("Hi", CallRequestOptions.DEFAULT.withIdempotency("abcde"))

    // ... do something else ...

    // Option 1: Attach later to retrieve the result
    // mark(1:3)
    val greeting: String =
        rs.invocationHandle(handle.invocationId, KtSerdes.json<String>()).attach()

    // Option 2: Peek to see if the result is ready
    // mark(1:3)
    val output: Output<String> =
        rs.invocationHandle(handle.invocationId, KtSerdes.json<String>()).output
    if (output.isReady) {
      val result = output.value
    }
    // <end_service_attach>
  }
}
