package develop.workflows;

import develop.workflow.SignupWorkflowClient;

public class WorkflowSubmitter {

    public void submitWorkflow(Email email) {
        // <start_submit>
        SignupWorkflowClient
                .fromIngress("http://localhost:8080", "someone")
                .submit(email);
        // <end_submit>
    }


    public void interactWithWorkflow() {
        // <start_interact>
        boolean success = SignupWorkflowClient
                .fromIngress("http://localhost:8080", "someone")
                .workflowHandle()
                .attach();
        // <end_interact>

    }

}
