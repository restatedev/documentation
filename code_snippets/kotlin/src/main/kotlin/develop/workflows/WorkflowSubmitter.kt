package develop.workflows

import dev.restate.sdk.client.Client
import dev.restate.sdk.client.SendResponse

class WorkflowSubmitter {

    suspend fun submitWorkflow(email: Email){
        // <start_submit>
        val restate = Client.connect("http://localhost:8080")
        val handle: SendResponse = SignupWorkflowClient
            .fromClient(restate, "someone")
            .submit(email)
        // <end_submit>

        // <start_query>
        val status = SignupWorkflowClient
            .fromClient(restate, "someone")
            .getStatus()
        // <end_query>

        // <start_interact>

        // <end_query>

        // <start_interact>
        // Option 1: attach and wait for result
        val result = SignupWorkflowClient
            .fromClient(restate, "someone")
            .workflowHandle()
            .attach()

        // Option 2: peek to check if ready
        val peekOutput = SignupWorkflowClient
            .fromClient(restate, "someone")
            .workflowHandle()
            .output
        if (peekOutput.isReady) {
            val result2 = peekOutput.value
        }
        // <end_interact>
    }
}