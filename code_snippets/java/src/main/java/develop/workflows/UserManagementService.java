package develop.workflows;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;


@VirtualObject
public class UserManagementService {
    // <start_here>
    @Handler
    public void setup(ObjectContext ctx, Email email) {
        // focus(1:2)
        SignupWorkflowClient.fromContext(ctx, ctx.key())
                .run(email);
    }
    // <end_here>
}

