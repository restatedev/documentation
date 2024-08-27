package usecases.microservices;

import dev.restate.sdk.client.CallRequestOptions;
import dev.restate.sdk.client.Client;

class Config {
  public static String RESTATE_URL = "http://localhost:8080";
}

public class Idempotency {

  // <start_here>
  Client rs = Client.connect(Config.RESTATE_URL);

  public void reserveProduct(String productId, String reservationId) {
    // <mark_1>
    ProductServiceClient.fromClient(rs, productId)
        .send()
        .reserve(CallRequestOptions.DEFAULT.withIdempotency(reservationId));
    // </mark_1>
  }
  // <end_here>

}


@Workflow
public class SignupWorkflow {

  final DurablePromiseKey<String> EMAIL_CLICKED =
          DurablePromiseKey.of("email_clicked", STRING);

  @Workflow
  public boolean run(WorkflowContext ctx, User user) {

    // Persist progress: code doesn't get re-executed on retries
    ctx.run(() -> createUserEntry(user));

    String secret = ctx.random().nextUUID().toString();
    ctx.run(() -> sendEmailWithLink(user.getEmail(), secret));

    // Wait until user clicked email verification link
    // Resolved or rejected by the other handlers
    String clickSecret =
            ctx.promise(EMAIL_CLICKED)
                    .awaitable()
                    .await();
    return clickSecret.equals(secret);
  }

  @Shared
  public void click(SharedWorkflowContext ctx, String secret) {
    // Durable signals and query:
    // Workflow interaction via callbacks, Kafka events,...
    ctx.promiseHandle(EMAIL_CLICKED).resolve(secret);
  }
}


@VirtualObject
public class UserUpdatesService {

  @Handler
  public void updateUser(ObjectContext ctx, UpdateEvent event) {
    // Durable actions: result persisted and recovered on failures
    String userId = ctx.run(STRING, () ->
            updateUserProfile(event.getProfile()));

    // Flexible control flow: no restrictions (e.g. loops, cycles)
    // Each event crafts its own recovery log
    while (userId.equals("NOT_READY")) {
      // Delay execution
      ctx.sleep(Duration.ofMillis(5000));
      userId = ctx.run(STRING, () ->
              updateUserProfile(event.getProfile()));
    }

    String roleId = ctx.run(STRING, () ->
            setUserPermissions(userId, event.getPermissions()));
    ctx.run(() -> provisionResources(
            userId, roleId, event.getResources()));
  }
}



@VirtualObject
public class ProfileService {

  final StateKey<UserProfile> USER =
          StateKey.of("user", UserSerde());

  @Handler
  public void userEvent(ObjectContext ctx, String name) {
    // Durable actions: result persisted and recoverable
    // Enrich events with data from multiple sources
    UserProfile profile = ctx.run(() ->
            createUserProfile(name));

    // Persistent built-in K/V state
    ctx.set(USER, profile);

    // Delay execution or schedule async actions
    // Restate triggers them when the time comes
    ProfileServiceClient.fromContext(ctx, name)
            .send(Seconds(1)).emit();
  }

  // The same functions can be called over RPC and Kafka
  @Handler
  public void featureEvent(ObjectContext ctx, String email) {
    UserProfile user = ctx.get(USER);
    user.setEmail(email);
    ctx.set(USER, user);
  }

  @Handler
  public void emit(ObjectContext ctx) {
    UserProfile user = ctx.get(USER);
    sendDownstream(user);
    ctx.clearAll();
  }
}