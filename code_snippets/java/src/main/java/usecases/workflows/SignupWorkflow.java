package usecases.workflows;

import static usecases.utils.Utils.createUserEntry;
import static usecases.utils.Utils.sendEmailWithLink;

import dev.restate.sdk.SharedWorkflowContext;
import dev.restate.sdk.WorkflowContext;
import dev.restate.sdk.annotation.Shared;
import dev.restate.sdk.annotation.Workflow;
import dev.restate.sdk.common.DurablePromiseKey;
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.http.vertx.RestateHttpServer;
import usecases.utils.User;

// <start_here>
@Workflow
public class SignupWorkflow {

  // <mark_3>
  private static final DurablePromiseKey<String> LINK_CLICKED =
      DurablePromiseKey.of("link_clicked", String.class);

  // </mark_3>

  // <mark_1>
  @Workflow
  public boolean run(WorkflowContext ctx, User user) {
    // </mark_1>
    // workflow ID = user ID; workflow runs once per user
    String userId = ctx.key();

    // <mark_2>
    ctx.run(() -> createUserEntry(user));
    // </mark_2>

    // <mark_2>
    String secret = ctx.random().nextUUID().toString();
    ctx.run(() -> sendEmailWithLink(userId, user, secret));
    // </mark_2>

    // <mark_2>
    // <mark_3>
    String clickSecret = ctx.promise(LINK_CLICKED).future().await();
    // </mark_3>
    // </mark_2>

    return clickSecret.equals(secret);
  }

  @Shared
  public void click(SharedWorkflowContext ctx, String secret) {
    // <mark_3>
    ctx.promiseHandle(LINK_CLICKED).resolve(secret);
    // </mark_3>
  }

  public static void main(String[] args) {
    RestateHttpServer.listen(Endpoint.bind(new SignupWorkflow()));
  }
}
// <end_here>
