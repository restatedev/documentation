package concepts.services;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.common.CoreSerdes;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

// <start_here>
@Service
public class RoleUpdateService {

    @Handler
    public void applyRoleUpdate(Context ctx, UpdateRequest update) {
        // Apply a change to one system (e.g., DB upsert, API call, ...)
        // and persist the result in Restate.
        boolean success = ctx.sideEffect(CoreSerdes.JSON_BOOLEAN, () ->
            SystemA.applyUserRole(update.getUserId(), update.getRole()));
        if (!success) {
            return;
        }

        // Loop over the permission settings and
        // journal each operation in Restate to avoid re-execution during retries.
        for(String permission: update.getPermissions()) {
            ctx.sideEffect(CoreSerdes.JSON_BOOLEAN, () ->
                SystemB.applyPermission(update.getUserId(), permission));
        }
    }

    public static void main(String[] args) {
        RestateHttpEndpointBuilder.builder()
            .bind(new RoleUpdateService())
            .buildAndListen();
    }
}
// <end_here>