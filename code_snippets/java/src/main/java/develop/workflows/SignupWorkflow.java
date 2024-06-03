package develop.workflows;

import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.SharedWorkflowContext;
import dev.restate.sdk.WorkflowContext;
import dev.restate.sdk.annotation.Shared;
import dev.restate.sdk.annotation.Workflow;
import dev.restate.sdk.common.DurablePromiseKey;
import dev.restate.sdk.common.StateKey;

import static develop.workflows.Utils.sendEmailWithLink;

// <start_here>
@Workflow
public class SignupWorkflow {

    private static final DurablePromiseKey<String> EMAIL_CLICKED =
            DurablePromiseKey.of("email_clicked", JsonSerdes.STRING);
    private static final StateKey<String> STATUS =
            StateKey.of("status", JsonSerdes.STRING);

    @Workflow
    public boolean run(WorkflowContext ctx, Email email) {
        String secret = ctx.random().nextUUID().toString();
        ctx.set(STATUS, "Generated secret");

        ctx.run("send email",
                () -> sendEmailWithLink(email, secret));
        ctx.set(STATUS, "Sent email");

        String clickSecret = ctx.promise(EMAIL_CLICKED)
                .awaitable()
                .await();
        ctx.set(STATUS, "Clicked email");

        return clickSecret.equals(secret);
    }

    @Shared
    public void click(SharedWorkflowContext ctx, String secret) {
        ctx.promiseHandle(EMAIL_CLICKED).resolve(secret);
    }

    @Shared
    public String getStatus(SharedWorkflowContext ctx) {
        return ctx.get(STATUS).orElse("Ynknown");
    }
}
// <end_here>