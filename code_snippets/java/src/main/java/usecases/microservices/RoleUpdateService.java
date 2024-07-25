package usecases.microservices;

import concepts.services.types.UpdateRequest;
import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.common.TerminalException;
import dev.restate.sdk.serde.jackson.JacksonSerdes;
import java.util.ArrayList;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import usecases.utils.Permission;
import usecases.utils.UserRole;
import usecases.utils.ExampleStubs;

// <start_here>
// <mark_1>
@Service
public class RoleUpdateService {
  // </mark_1>

  private static final Logger logger = LogManager.getLogger(RoleUpdateService.class);

  // <mark_1>
  // <mark_2>
  @Handler
  public void applyRoleUpdate(Context ctx, UpdateRequest update) {
    // </mark_2>
    // </mark_1>

    // <mark_3>
    UserRole previousRole =
        ctx.run(JacksonSerdes.of(UserRole.class), () -> ExampleStubs.getCurrentRole(update.getUserId()));
    ctx.run(() -> ExampleStubs.tryApplyUserRole(update.getUserId(), update.getRole()));
    // </mark_3>

    List<Permission> previousPermissions = new ArrayList<>();
    for (Permission permission : update.getPermissions()) {
      // <mark_4>
      try {
        // <mark_3>
        Permission previous =
            ctx.run(
                JacksonSerdes.of(Permission.class),
                () -> ExampleStubs.tryApplyPermission(update.getUserId(), permission));
        // </mark_3>
        previousPermissions.add(previous); // remember the previous setting
      } catch (TerminalException err) {
        ExampleStubs.rollback(ctx, update.getUserId(), previousRole, previousPermissions);
        throw err;
      }
      // </mark_4>
    }
  }
}
// <end_here>
