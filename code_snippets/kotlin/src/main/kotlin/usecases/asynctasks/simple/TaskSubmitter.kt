package usecases.asynctasks.simple

import dev.restate.client.Client
import dev.restate.client.kotlin.attachSuspend
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
            .send()
            .runTask(taskOpts, 5.days) {
              // <mark_2>
              idempotencyKey = "dQw4w9WgXcQ"
              // </mark_2>
            }
            .invocationHandle
    // </mark_1>

    // Attach to the async task to get the result
    // <mark_3>
    val result = handle.attachSuspend()
    // </mark_3>
    // <end_here>
  }
}
