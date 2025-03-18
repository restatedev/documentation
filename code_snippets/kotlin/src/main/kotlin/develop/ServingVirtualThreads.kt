package develop

import dev.restate.sdk.endpoint.Endpoint
import dev.restate.sdk.kotlin.HandlerRunner
import java.util.concurrent.Executors
import kotlinx.coroutines.asCoroutineDispatcher

class ServingVirtualThreads {
  fun virtualThreads(builder: Endpoint.Builder) {
    // <start_here>
    builder.bind(
        Greeter(),
        HandlerRunner.Options(
            coroutineContext = Executors.newVirtualThreadPerTaskExecutor().asCoroutineDispatcher(),
        ),
    )
    // <end_here>
  }
}
