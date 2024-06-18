package use_cases;

import static use_cases.utils.Utils.createUserEntry;
import static use_cases.utils.Utils.sendEmailWithLink;

import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.SharedWorkflowContext;
import dev.restate.sdk.WorkflowContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Workflow;
import dev.restate.sdk.common.DurablePromiseKey;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.common.TerminalException;
import use_cases.utils.User;

// <start_here>
@Workflow
public class SignupWorkflow {

  private final StateKey<String> STAGE = StateKey.of("stage", JsonSerdes.STRING);
  private final DurablePromiseKey<String> EMAIL_LINK =
      DurablePromiseKey.of("email-link", JsonSerdes.STRING);

  // <mark_1>
  @Workflow
  public boolean run(WorkflowContext ctx, User user) {
    // <mark_3>
    ctx.set(STAGE, "Creating user");
    // </mark_3>
    // <mark_2>
    ctx.run(() -> createUserEntry(ctx.key(), user.getName()));
    // </mark_2>

    // <mark_3>
    ctx.set(STAGE, "Email verification");
    // </mark_3>
    // <mark_2>
    String secret = ctx.random().nextUUID().toString();
    ctx.run(() -> sendEmailWithLink(user.getEmail(), secret));
    // </mark_2>

    // <mark_5>
    String clickSecret = ctx.promise(EMAIL_LINK).awaitable().await();
    // </mark_5>
    // <mark_7>
    if (!clickSecret.equals(secret)) {
      // <mark_3>
      ctx.set(STAGE, "Verification failed");
      // </mark_3>
      throw new TerminalException("Wrong secret from email link");
    }
    // <mark_3>
    // </mark_7>
    ctx.set(STAGE, "User verified");
    // </mark_3>
    return true;
  }

  // </mark_1>

  // <mark_4>
  @Handler
  public String getStage(SharedWorkflowContext ctx) {
    return ctx.get(STAGE).orElse("Unknown");
  }

  // </mark_4>

  // <mark_6>
  @Handler
  public void approveEmail(SharedWorkflowContext ctx, String secret) {
    ctx.promiseHandle(EMAIL_LINK).resolve(secret);
  }

  @Handler
  public void rejectEmail(SharedWorkflowContext ctx) {
    ctx.promiseHandle(EMAIL_LINK).reject("Abort verification");
  }
  // </mark_6>
}
// <end_here>
