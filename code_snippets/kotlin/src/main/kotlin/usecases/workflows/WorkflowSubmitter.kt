package usecases.workflows

import dev.restate.client.Client

class WorkflowSubmitter {
  suspend fun submit(user: User) {
    // <start_here>
    // import dev.restate.client.Client;
    val restateClient = Client.connect("http://localhost:8080")
    // !mark
    SignupWorkflowClient.fromClient(restateClient, user.id)
        // !mark
        .submit(user)

    // do something else, with workflow running in the background

    // attach back to the workflow
    // !mark
    val result =
        SignupWorkflowClient.fromClient(restateClient, user.id)
            // !mark
            .workflowHandle()
            // !mark
            .attach()
    // <end_here>
  }
}
