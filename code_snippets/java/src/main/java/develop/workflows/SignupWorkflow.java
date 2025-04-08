package develop.workflows;

import static develop.workflows.Utils.sendEmailWithLink;

import dev.restate.sdk.SharedWorkflowContext;
import dev.restate.sdk.WorkflowContext;
import dev.restate.sdk.annotation.Shared;
import dev.restate.sdk.annotation.Workflow;
import dev.restate.sdk.common.DurablePromiseKey;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.http.vertx.RestateHttpServer;

// <start_here>
@Workflow
public class SignupWorkflow {
  private static final DurablePromiseKey<String> EMAIL_CLICKED =
      DurablePromiseKey.of("email_clicked", String.class);
  private static final StateKey<String> STATUS =
      // break
      StateKey.of("status", String.class);

  // <mark_1>
  @Workflow
  public boolean run(WorkflowContext ctx, Email email) {
    String secret = ctx.random().nextUUID().toString();
    ctx.set(STATUS, "Generated secret");

    ctx.run("send email", () -> sendEmailWithLink(email, secret));
    ctx.set(STATUS, "Sent email");

    // <mark_3>
    String clickSecret =
        ctx.promise(EMAIL_CLICKED)
            // break
            .future()
            // break
            .await();
    // </mark_3>
    ctx.set(STATUS, "Clicked email");

    return clickSecret.equals(secret);
  }

  // </mark_1>

  @Shared
  public void click(SharedWorkflowContext ctx, String secret) {
    // <mark_3>
    ctx.promiseHandle(EMAIL_CLICKED).resolve(secret);
    // </mark_3>
  }

  // <mark_2>
  @Shared
  public String getStatus(SharedWorkflowContext ctx) {
    return ctx.get(STATUS).orElse("Unknown");
  }

  // </mark_2>

  public static void main(String[] args) {
    // <mark_4>
    var endpoint =
        Endpoint
            // break
            .bind(new SignupWorkflow());
    // break
    RestateHttpServer.listen(endpoint);
    // </mark_4>
  }
}
// <end_here>
