package concepts.components;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;

@Service
public class Components {

    @Handler
    public void runFn(Context ctx){

        // <start_call_virtual_object>
        // Request-response call:
        String response = GreeterClient.fromContext(ctx, "Mary").greet("Hi").await();
        // One-way call:
        GreeterClient.fromContext(ctx, "Mary").send().greet("Hi");
        // <end_call_virtual_object>

        UpdateRequest update = new UpdateRequest("user123", "admin", new String[]{"read", "write"});
        // <start_call_service>
        // Request-response call:
        RoleUpdateServiceClient.fromContext(ctx).applyRoleUpdate(update).await();
        // One-way call:
        RoleUpdateServiceClient.fromContext(ctx).send().applyRoleUpdate(update);
        // <end_call_service>

    }
}
