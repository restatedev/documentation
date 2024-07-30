package usecases.asynctasks.simple

import dev.restate.sdk.client.CallRequestOptions
import dev.restate.sdk.client.Client
import dev.restate.sdk.kotlin.KtSerdes

// <start_here>
class TaskSubmitter {
  companion object {
    private val rs: Client = Client.connect("http://localhost:8080")
  }

  suspend fun submitAndAwaitTasks(taskOpts: TaskOpts) {
    // <mark_1>
    val handle =
        AsyncTaskServiceClient.fromClient(rs)
            .send()
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
        rs.invocationHandle(
                handle.invocationId,
                KtSerdes.json<String>(),
            )
            .attach()
    // </mark_3>
  }
}
// <end_here>
