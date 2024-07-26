package usecases.asynctasks.synctoasync

import dev.restate.sdk.client.Client
import develop.workflows.Email
import usecases.asynctasks.synctoasync.DataPreparationServiceClient.IngressClient
import java.util.concurrent.CompletableFuture
import java.util.concurrent.TimeUnit

// <start_here>
class MyClient {

    companion object {
        private val rs: Client = Client.connect("http://localhost:8080")
    }

    suspend fun downloadData(userId: String, email: Email) {
        // <mark_1>
        val client: IngressClient = DataPreparationServiceClient.fromClient(rs, userId)
        // </mark_1>

        // <mark_2>
        client.submit(userId)
        // </mark_2>

        try {
            // <mark_3>
            CompletableFuture.anyOf(client.workflowHandle().attachAsync())
                .orTimeout(30, TimeUnit.SECONDS)
                .join()
            // </mark_3>
            // <mark_4>
        } catch (e: Exception) {
            client.resultAsEmail(email)
            return
        }
        // </mark_4>
        // ... process directly ...
    }
}
// <end_here>
