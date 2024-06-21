package develop.workflows;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;

@VirtualObject
public class UserManagementService {
  // <start_here>
  @Handler
  public void setup(ObjectContext ctx, Email email) {
    // focus
    boolean result =
        // focus
        SignupWorkflowClient.fromContext(ctx, "someone")
            // focus
            .run(email)
            // focus
            .await();
  }

  @Handler
  public void queryStatus(ObjectContext ctx) {
    // focus
    String status =
        // focus
        SignupWorkflowClient.fromContext(ctx, "someone")
            // focus
            .getStatus()
            // focus
            .await();
  }
  // <end_here>
}
