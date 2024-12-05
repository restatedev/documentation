package usecases.asynctasks.synctoasync

import dev.restate.sdk.client.Client
import develop.workflows.Email
import java.util.concurrent.TimeUnit

class MyClient {

  // <start_here>
  suspend fun downloadData(userId: String, email: Email) {
    // <mark_1>
    val rs: Client = Client.connect("http://localhost:8080")
    val client = DataPreparationServiceClient.fromClient(rs, userId)
    // </mark_1>

    // <mark_2>
    client.submit()
    // </mark_2>

    try {
      // <mark_3>
      client.workflowHandle().attachAsync().orTimeout(30, TimeUnit.SECONDS).join()
      // </mark_3>
      // <mark_4>
    } catch (e: Exception) {
      client.resultAsEmail(email)
      return
    }
    // </mark_4>
    // ... process directly ...
  }
  // <end_here>
}
