package develop.signals;

import dev.restate.sdk.DurablePromise;
import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.SharedWorkflowContext;
import dev.restate.sdk.WorkflowContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Workflow;
import dev.restate.sdk.common.DurablePromiseKey;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

// <start_here>
@Workflow
public class MyWorkflow {

    // withClass highlight-line
    DurablePromiseKey<Boolean> MY_BOOLEAN_SIGNAL = DurablePromiseKey.of("my-boolean-signal", JsonSerdes.BOOLEAN);

    @Workflow
    public String run(WorkflowContext ctx, String input) {

        // do some steps...

        // withClass highlight-line
        // Creation of the Durable Promise
        // withClass highlight-line
        boolean signal = ctx.durablePromise(MY_BOOLEAN_SIGNAL).awaitable().await();

        // do some steps...

        return "success";
    }

    @Handler
    public void resolveMySignal(SharedWorkflowContext ctx, boolean signal) {
        // withClass highlight-line
        // Resolution of the Durable Promise
        // withClass highlight-line
        ctx.durablePromiseHandle(MY_BOOLEAN_SIGNAL).resolve(signal);
    }
}
// <end_here>