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
  public void applyRoleUpdate(Context ctx, UpdateRequest req) {
    boolean success = ctx.run(CoreSerdes.JSON_BOOLEAN, () ->
        SystemA.applyUserRole(req.getUserId(), req.getRole()));
    if (!success) {
        return;
    }

    for(String permission: req.getPermissions()) {
        ctx.run(CoreSerdes.JSON_BOOLEAN, () ->
          SystemB.applyPermission(req.getUserId(), permission));
    }
  }

  public static void main(String[] args) {
    RestateHttpEndpointBuilder.builder()
        .bind(new RoleUpdateService())
        .buildAndListen();
  }
}
// <end_here>