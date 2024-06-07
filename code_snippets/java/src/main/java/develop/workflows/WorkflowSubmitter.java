package develop.workflows;

import dev.restate.sdk.client.Client;
import dev.restate.sdk.client.SendResponse;

public class WorkflowSubmitter {

    public void submitWorkflow(Email email) {
        // <start_submit>
        Client restate = Client.connect("http://localhost:8080");
        SendResponse handle = SignupWorkflowClient
                .fromClient(restate, "someone")
                .submit(email);
        // <end_submit>

        // <start_query>
        String status = SignupWorkflowClient
                .fromClient(restate, "someone")
                .getStatus();
        // <end_query>

        // <start_interact>
        boolean result = SignupWorkflowClient
                .fromClient(restate, "someone")
                .workflowHandle()
                .attach();
        // <end_interact>

    }

}
