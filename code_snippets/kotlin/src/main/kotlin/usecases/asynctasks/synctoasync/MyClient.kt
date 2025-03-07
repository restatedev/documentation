package usecases.asynctasks.synctoasync

import dev.restate.sdk.client.Client
import develop.workflows.Email
import java.util.concurrent.TimeUnit
import java.util.concurrent.TimeoutException

class MyClient {

  // <start_here>
  suspend fun uploadFile(userId: String, email: Email) {
    // <mark_1>
    val restateClient: Client = Client.connect("http://localhost:8080")
    val fileUploadClient = FileUploadWorkflowClient.fromClient(restateClient, userId)
    fileUploadClient.submit()
    // </mark_1>

    try {
      // <mark_1>
      val fileUploadUrl = fileUploadClient.workflowHandle().attachAsync()
        // break
        .orTimeout(30, TimeUnit.SECONDS).join()
      // </mark_1>

      // ... process directly ...

    } catch (e: Exception) {
      // <mark_2>
      if (e.cause is TimeoutException) {
        fileUploadClient.getUrlViaEmail(email)
        // </mark_2>
        return
      }
      throw e
    }
  }
  // <end_here>
}
