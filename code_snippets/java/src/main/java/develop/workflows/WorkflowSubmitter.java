package develop.workflows;

import dev.restate.sdk.client.Client;

public class WorkflowSubmitter {

    public void submitWorkflow(Email email) {
        // <start_submit>
        Client restate = Client.connect("http://localhost:8080");
        SignupWorkflowClient
                .fromClient(restate, "someone")
                .submit(email);
        // <end_submit>
    }


    public void interactWithWorkflow() {
        // <start_interact>
        Client restate = Client.connect("http://localhost:8080");
        boolean success = SignupWorkflowClient
                .fromClient(restate, "someone")
                .workflowHandle()
                .attach();
        // <end_interact>

    }

}
