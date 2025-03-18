package concepts.services;

import concepts.services.types.SystemA;
import concepts.services.types.SystemB;
import concepts.services.types.UpdateRequest;
import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.http.vertx.RestateHttpServer;
import usecases.utils.Permission;

/**
 * WARNING: The Services page relies on the line numbers for the code animations Make sure you adapt
 * the line numbers when adapting the code
 */

// <start_here>
// <mark_2>
@Service
public class RoleUpdateService {
  // </mark_2>

  // <mark_2>
  @Handler
  public void applyRoleUpdate(Context ctx, UpdateRequest req) {
    // </mark_2>
    // <mark_1>
    boolean success =
        ctx.run(
            Boolean.class,
            // break
            () -> SystemA.applyUserRole(req.getUserId(), req.getRole()));
    // </mark_1>
    // <mark_3>
    if (!success) {
      return;
    }
    // </mark_3>

    // <mark_3>
    for (Permission permission : req.getPermissions()) {
      // </mark_3>
      // <mark_1>
      ctx.run(
          Boolean.class,
          // break
          () -> SystemB.applyPermission(req.getUserId(), permission));
      // </mark_1>
    }
  }

  public static void main(String[] args) {
    var endpoint =
        Endpoint
            // break
            .bind(new RoleUpdateService());
    // break
    RestateHttpServer.listen(endpoint);
  }
}
// <end_here>
