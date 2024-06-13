package develop.workflows

import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;
import dev.restate.sdk.kotlin.ObjectContext

@VirtualObject
class UserManagementService {
    // <start_here>
    @Handler
    suspend fun setup(ctx: ObjectContext, email: Email) {
        // focus(1:3)
        val result = SignupWorkflowClient.fromContext(ctx, "someone")
            .run(email)
            .await()

    }

    @Handler
    suspend fun queryStatus(ctx: ObjectContext) {
        // focus(1:3)
        val status = SignupWorkflowClient.fromContext(ctx, "someone")
            .getStatus()
            .await()
    }
    // <end_here>
}
