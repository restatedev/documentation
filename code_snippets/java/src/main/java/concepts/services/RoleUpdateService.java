package concepts.services;

import concepts.services.types.SystemA;
import concepts.services.types.SystemB;
import concepts.services.types.UpdateRequest;
import dev.restate.sdk.Context;
import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

/**
 * WARNING:
 * The Services page relies on the line numbers for the code animations
 * Make sure you adapt the line numbers when adapting the code
 */

// <start_here>
@Service
public class RoleUpdateService {

  @Handler
  public void applyRoleUpdate(Context ctx, UpdateRequest req) {
    boolean success = ctx.run(JsonSerdes.BOOLEAN, () ->
        SystemA.applyUserRole(req.getUserId(), req.getRole()));
    if (!success) {
        return;
    }

    for(String permission: req.getPermissions()) {
        ctx.run(JsonSerdes.BOOLEAN, () ->
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