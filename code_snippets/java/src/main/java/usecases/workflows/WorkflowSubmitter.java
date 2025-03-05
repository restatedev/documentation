package usecases.workflows;

import dev.restate.sdk.client.Client;
import usecases.utils.User;

public class WorkflowSubmitter {
  public void submit(User user) {
    // <start_here>
    // import dev.restate.sdk.client.Client;
    Client restateClient = Client.connect("http://localhost:8080");
    // !mark
    SignupWorkflowClient.fromClient(restateClient, user.id())
        // !mark
        .submit(user);

    // do something else, with workflow running in the background

    // attach back to the workflow
    // !mark
    boolean result =
        SignupWorkflowClient.fromClient(restateClient, user.id())
            // !mark
            .workflowHandle()
            // !mark
            .attach();
    // <end_here>
  }
}
