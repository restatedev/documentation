package usecases.eventprocessing;

import static usecases.utils.ExampleStubs.send;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.common.TerminalException;
import dev.restate.sdk.serde.jackson.JacksonSerdes;
import java.time.Duration;
import usecases.utils.UserProfile;

// <start_here>
@VirtualObject
public class ProfileService {

  // <mark_1>
  private static final StateKey<UserProfile> USER =
      StateKey.of("user", JacksonSerdes.of(UserProfile.class));
  // </mark_1>

  // <mark_2>
  @Handler
  public void userEvent(ObjectContext ctx, String name) {
    // </mark_2>
    UserProfile profile = new UserProfile(ctx.key(), name);
    // <mark_1>
    ctx.set(USER, profile);
    // </mark_1>

    // <mark_3>
    ProfileServiceClient
            .fromContext(ctx, ctx.key())
            .send(Duration.ofSeconds(1))
            .emit();
    // </mark_3>
  }

  // <mark_2>
  @Handler
  public void featureEvent(ObjectContext ctx, String email) {
    // </mark_2>
    // <mark_1>
    UserProfile user = ctx.get(USER)
            // </mark_1>
            .orElseThrow(() -> new TerminalException("No user found"));
    user.setEmail(email);
    // <mark_1>
    ctx.set(USER, user);
    // </mark_1>
  }

  // <mark_2>
  @Handler
  public void emit(ObjectContext ctx) {
    // </mark_2>
    // <mark_1>
    UserProfile user = ctx.get(USER)
            // </mark_1>
            .orElseThrow(() -> new TerminalException("No user found"));

    send(ctx.key(), user);
    // <mark_1>
    ctx.clearAll();
    // </mark_1>
  }
}
// <end_here>
