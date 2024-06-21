package develop.workflows;

import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.SharedWorkflowContext;
import dev.restate.sdk.WorkflowContext;
import dev.restate.sdk.annotation.Shared;
import dev.restate.sdk.annotation.Workflow;
import dev.restate.sdk.common.DurablePromiseKey;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

import static develop.workflows.Utils.sendEmailWithLink;

// <start_here>
@Workflow
public class SignupWorkflow {
    private static final DurablePromiseKey<String> EMAIL_CLICKED =
            DurablePromiseKey.of("email_clicked", JsonSerdes.STRING);
    private static final StateKey<String> STATUS =
            StateKey.of("status", JsonSerdes.STRING);

    // <mark_1>
    @Workflow
    public boolean run(WorkflowContext ctx, Email email) {
        String secret = ctx.random().nextUUID().toString();
        ctx.set(STATUS, "Generated secret");

        ctx.run("send email",
                () -> sendEmailWithLink(email, secret));
        ctx.set(STATUS, "Sent email");

        // <mark_3>
        String clickSecret = ctx.promise(EMAIL_CLICKED)
                .awaitable()
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
        RestateHttpEndpointBuilder.builder()
                .bind(new SignupWorkflow())
                .buildAndListen();
        // </mark_4>
    }
}
// <end_here>