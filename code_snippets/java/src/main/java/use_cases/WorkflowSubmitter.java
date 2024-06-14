package use_cases;

import dev.restate.sdk.client.Client;
import use_cases.utils.User;

// <start_here>
public class WorkflowSubmitter {
    public void submit(User user){
        // import dev.restate.sdk.client.Client;
        Client rs = Client.connect("http://localhost:8080");
        // mark
        SignupWorkflowClient.fromClient(rs, user.getId())
                // mark
                .submit(user);

        // do something else, with workflow running in the background

        // attach back to the workflow
        // mark
        boolean result = SignupWorkflowClient.fromClient(rs, user.getId())
                // mark
                .workflowHandle()
                // mark
                .attach();
    }
}
// <end_here>
