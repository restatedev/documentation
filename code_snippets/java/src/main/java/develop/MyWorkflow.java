package develop;

import dev.restate.sdk.SharedWorkflowContext;
import dev.restate.sdk.WorkflowContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Workflow;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

import java.time.Duration;

// <start_here>
@Workflow
public class MyWorkflow {

    @Workflow
    public String run(WorkflowContext ctx, String input) {

        // implement workflow logic here

        return "success";
    }

    @Handler
    public void interactWithWorkflow(SharedWorkflowContext ctx, String input) {
        // implement interaction logic here
    }

    public static void main(String[] args) {
        RestateHttpEndpointBuilder.builder()
                .bind(new MyWorkflow())
                .buildAndListen();
    }
}
// <end_here>