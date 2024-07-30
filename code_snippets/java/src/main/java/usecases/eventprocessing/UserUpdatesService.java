package usecases.eventprocessing;

import static usecases.utils.ExampleStubs.*;

import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;
import java.time.Duration;
import usecases.utils.UserUpdate;

// <start_here>
@VirtualObject
public class UserUpdatesService {

  // <mark_1>
  @Handler
  public void updateUserEvent(ObjectContext ctx, UserUpdate event) {
    // </mark_1>
    // <mark_3>
    String userId = ctx.run(JsonSerdes.STRING, () -> updateUserProfile(event.getProfile()));
    // </mark_3>

    // <mark_4>
    while (userId.equals("NOT_READY")) {
      // <mark_2>
      ctx.sleep(Duration.ofMillis(5000));
      // </mark_2>
      // <mark_3>
      userId = ctx.run(JsonSerdes.STRING, () -> updateUserProfile(event.getProfile()));
      // </mark_3>
    }

    String finalUserId = userId;
    // <mark_3>
    String roleId =
        ctx.run(JsonSerdes.STRING, () -> setUserPermissions(finalUserId, event.getPermissions()));
    ctx.run(() -> provisionResources(finalUserId, roleId, event.getResources()));
    // </mark_3>
    // </mark_4>
  }
}
// <end_here>
