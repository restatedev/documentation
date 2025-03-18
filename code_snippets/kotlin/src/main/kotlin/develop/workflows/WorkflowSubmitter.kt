package develop.workflows

import dev.restate.client.Client
import dev.restate.client.kotlin.attachSuspend
import dev.restate.client.kotlin.getOutputSuspend

class WorkflowSubmitter {

  suspend fun submitWorkflow(email: Email) {
    // <start_submit>
    val restate = Client.connect("http://localhost:8080")
    val handle = SignupWorkflowClient.fromClient(restate, "someone").submit(email).invocationHandle
    // <end_submit>

    // <start_query>
    val status = SignupWorkflowClient.fromClient(restate, "someone").getStatus()
    // <end_query>

    // <start_interact>

    // <end_query>

    // <start_interact>
    // Option 1: attach and wait for result
    val result =
        SignupWorkflowClient.fromClient(restate, "someone")
            .workflowHandle()
            .attachSuspend()
            .response

    // Option 2: peek to check if ready
    val peekOutput =
        SignupWorkflowClient.fromClient(restate, "someone")
            .workflowHandle()
            .getOutputSuspend()
            .response
    if (peekOutput.isReady) {
      val result2 = peekOutput.value
    }
    // <end_interact>
  }
}
