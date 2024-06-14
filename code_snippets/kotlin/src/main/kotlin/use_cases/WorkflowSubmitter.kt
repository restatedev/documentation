package use_cases

import dev.restate.sdk.client.Client

// <start_here>
class WorkflowSubmitter {
    suspend fun submit(user: User) {
        // import dev.restate.sdk.client.Client;
        val rs = Client.connect("http://localhost:8080")
        // mark
        SignupWorkflowClient.fromClient(rs, user.id)
            // mark
            .submit(user)

        // do something else, with workflow running in the background

        // attach back to the workflow
        // mark
        val result: Boolean = SignupWorkflowClient.fromClient(rs, user.id)
            // mark
            .workflowHandle()
            // mark
            .attach()
    }
} // <end_here>