package develop.workflows;

import dev.restate.sdk.client.Client;
import dev.restate.sdk.client.SendResponse;
import dev.restate.sdk.common.Output;

public class WorkflowSubmitter {

  public void submitWorkflow(Email email) {
    // <start_submit>
    Client restate = Client.connect("http://localhost:8080");
    SendResponse handle =
        SignupWorkflowClient.fromClient(restate, "someone")
            // break
            .submit(email);
    // <end_submit>

    // <start_query>
    String status =
        SignupWorkflowClient.fromClient(restate, "someone")
            // break
            .getStatus();
    // <end_query>

    // <start_interact>
    // Option 1: attach and wait for result
    boolean result =
        SignupWorkflowClient.fromClient(restate, "someone")
            // break
            .workflowHandle()
            // break
            .attach();

    // Option 2: peek to check if ready
    Output<Boolean> peekOutput =
        SignupWorkflowClient.fromClient(restate, "someone")
            // break
            .workflowHandle()
            // break
            .getOutput();
    if (peekOutput.isReady()) {
      boolean result2 = peekOutput.getValue();
    }
    // <end_interact>

  }
}
