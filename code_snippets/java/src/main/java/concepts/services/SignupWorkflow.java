package concepts.services;

import static usecases.utils.Utils.createUserEntry;
import static usecases.utils.Utils.sendEmailWithLink;

import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.SharedWorkflowContext;
import dev.restate.sdk.WorkflowContext;
import dev.restate.sdk.annotation.Shared;
import dev.restate.sdk.annotation.Workflow;
import dev.restate.sdk.common.DurablePromiseKey;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;
import usecases.utils.User;

// <start_here>
@Workflow
public class SignupWorkflow {

  // <mark_3>
  private static final DurablePromiseKey<String> LINK_CLICKED =
      DurablePromiseKey.of("link_clicked", JsonSerdes.STRING);

  // </mark_3>

  // <mark_1>
  @Workflow
  public boolean run(WorkflowContext ctx, User user) {
    // workflow ID = user ID; workflow runs once per user
    String userId = ctx.key();

    // <mark_2>
    ctx.run(() -> createUserEntry(user));
    // </mark_2>

    // <mark_2>
    String secret = ctx.random().nextUUID().toString();
    ctx.run(() -> sendEmailWithLink(userId, user, secret));
    // </mark_2>

    // <mark_3>
    String clickSecret = ctx.promise(LINK_CLICKED).awaitable().await();
    // </mark_3>

    return clickSecret.equals(secret);
  }

  // </mark_1>

  // <mark_3>
  @Shared
  public void click(SharedWorkflowContext ctx, String secret) {
    ctx.promiseHandle(LINK_CLICKED).resolve(secret);
  }

  // </mark_3>

  public static void main(String[] args) {
    RestateHttpEndpointBuilder.builder().bind(new SignupWorkflow()).buildAndListen();
  }
}
// <end_here>
