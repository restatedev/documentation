package usecases.asynctasks.simple

import dev.restate.sdk.client.CallRequestOptions
import dev.restate.sdk.client.Client
import dev.restate.sdk.kotlin.KtSerdes
import kotlin.time.Duration.Companion.days

// <start_here>
class TaskSubmitter {
  companion object {
    private val restateClient: Client = Client.connect("http://localhost:8080")
  }

  suspend fun scheduleTask(taskOpts: TaskOpts) {
    // <mark_1>
    // The Kotlin SDK generates clients for each service
    val handle =
        AsyncTaskServiceClient.fromClient(restateClient)
            .send(5.days)
            .runTask(
                taskOpts,
                // <mark_2>
                CallRequestOptions.DEFAULT.withIdempotency("dQw4w9WgXcQ"),
                // </mark_2>
            )
    // </mark_1>

    // await the handler's result
    // <mark_3>
    val result =
        restateClient.invocationHandle(
                handle.invocationId,
                KtSerdes.json<String>(),
            )
            .attach()
    // </mark_3>
  }
}
// <end_here>
