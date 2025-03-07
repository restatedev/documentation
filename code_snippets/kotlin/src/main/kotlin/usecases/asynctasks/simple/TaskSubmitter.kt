package usecases.asynctasks.simple

import dev.restate.sdk.client.CallRequestOptions
import dev.restate.sdk.client.Client
import dev.restate.sdk.kotlin.KtSerdes
import kotlin.time.Duration.Companion.days

class TaskSubmitter {

  suspend fun scheduleTask(taskOpts: TaskOpts) {
      val RESTATE_URL = "http://localhost:8080"
    // <start_here>
    // The Kotlin SDK generates clients for each service
    val restateClient: Client = Client.connect(RESTATE_URL)
    val handle =
        // <mark_1>
        AsyncTaskServiceClient.fromClient(restateClient)
            .send(5.days)
            .runTask(
                taskOpts,
                // <mark_2>
                CallRequestOptions.DEFAULT.withIdempotency("dQw4w9WgXcQ"),
                // </mark_2>
            )
    // </mark_1>

    // Attach to the async task to get the result
    // <mark_3>
    val result =
        restateClient.invocationHandle(
                handle.invocationId,
                KtSerdes.json<String>(),
            )
            .attach()
    // </mark_3>
    // <end_here>
  }
}
