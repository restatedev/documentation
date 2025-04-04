package usecases.eventprocessing.eventtransactions;

import static usecases.eventprocessing.eventtransactions.utils.Stubs.*;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.lambda.BaseRestateLambdaHandler;
import java.time.Duration;
import usecases.microservices.SubscriptionService;

// <start_here>
@VirtualObject
public class UserFeed {

  public record SocialMediaPost(String content, String metadata) {}

  // <mark_1>
  @Handler
  public void processPost(ObjectContext ctx, SocialMediaPost post) {
    // </mark_1>
    // <mark_5>
    String userId = ctx.key();
    // </mark_5>

    // <mark_3>
    String postId = ctx.run(String.class, () -> createPost(userId, post));
    // </mark_3>

    // <mark_4>
    // <mark_3>
    while (ctx.run(String.class, () -> getPostStatus(postId)).equals("PENDING")) {
      // </mark_3>
      // <mark_2>
      ctx.sleep(Duration.ofSeconds(5));
      // </mark_2>
    }
    // </mark_4>

    // <mark_3>
    ctx.run(() -> updateUserFeed(userId, postId));
    // </mark_3>
  }
}

// <mark_6>
class MyLambdaHandler extends BaseRestateLambdaHandler {
  @Override
  public void register(Endpoint.Builder builder) {
    builder.bind(new SubscriptionService());
  }
}
// </mark_6>
// <end_here>
