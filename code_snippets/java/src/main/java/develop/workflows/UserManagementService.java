package develop.workflows;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;

@VirtualObject
public class UserManagementService {
    // <start_here>
    @Handler
    public void setup(ObjectContext ctx, Email email) {
        // focus(1:3)
        boolean result = SignupWorkflowClient.fromContext(ctx, "someone")
                .run(email)
                .await();
    }

    @Handler
    public void queryStatus(ObjectContext ctx) {
        // focus(1:3)
        String status = SignupWorkflowClient.fromContext(ctx, "someone")
                .getStatus()
                .await();
    }
    // <end_here>
}

