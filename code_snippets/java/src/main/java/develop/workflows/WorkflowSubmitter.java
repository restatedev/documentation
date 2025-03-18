package develop.workflows;

import dev.restate.client.Client;
import dev.restate.client.SendResponse;
import dev.restate.common.Output;

public class WorkflowSubmitter {

  public void submitWorkflow(Email email) {
    // <start_submit>
    Client restateClient = Client.connect("http://localhost:8080");
    SendResponse<Boolean> handle =
        SignupWorkflowClient.fromClient(restateClient, "someone").submit(email);
    // <end_submit>

    // <start_query>
    String status = SignupWorkflowClient.fromClient(restateClient, "someone").getStatus();
    // <end_query>

    // <start_interact>
    // Option 1: attach and wait for result
    boolean result =
        SignupWorkflowClient.fromClient(restateClient, "someone")
            .workflowHandle()
            .attach()
            .response();

    // Option 2: peek to check if ready
    Output<Boolean> peekOutput =
        SignupWorkflowClient.fromClient(restateClient, "someone")
            .workflowHandle()
            .getOutput()
            .response();
    if (peekOutput.isReady()) {
      boolean result2 = peekOutput.getValue();
    }
    // <end_interact>

  }
}
