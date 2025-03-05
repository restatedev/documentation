package usecases.workflows;

import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.SharedWorkflowContext;
import dev.restate.sdk.WorkflowContext;
import dev.restate.sdk.annotation.Shared;
import dev.restate.sdk.annotation.Workflow;
import dev.restate.sdk.common.DurablePromiseKey;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;
import usecases.utils.User;

import static usecases.utils.Utils.createUserEntry;
import static usecases.utils.Utils.sendEmailWithLink;


// <start_here>
@Workflow
public class SignupWorkflow {

  private static final DurablePromiseKey<String> EMAIL_CLICKED =
          DurablePromiseKey.of("email_clicked", JsonSerdes.STRING);

  // --- The workflow logic ---
  @Workflow
  public boolean run(WorkflowContext ctx, User user) {
    // workflow ID = user ID; workflow runs once per user
    String userId = ctx.key();

    ctx.run(() -> createUserEntry(user));

    String secret = ctx.random().nextUUID().toString();
    ctx.run(() -> sendEmailWithLink(userId, user, secret));

    String clickSecret =
            ctx.promise(EMAIL_CLICKED)
                    .awaitable()
                    .await();

    return clickSecret.equals(secret);
  }

  // --- Other handlers interact with the workflow via queries and signals ---
  @Shared
  public void click(SharedWorkflowContext ctx, String secret) {
    ctx.promiseHandle(EMAIL_CLICKED).resolve(secret);
  }

  public static void main(String[] args) {
    RestateHttpEndpointBuilder.builder()
            .bind(new SignupWorkflow())
            .buildAndListen();
  }
}
// <end_here>
