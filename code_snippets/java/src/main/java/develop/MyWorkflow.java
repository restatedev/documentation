package develop;

// <start_here>
import dev.restate.sdk.SharedWorkflowContext;
import dev.restate.sdk.WorkflowContext;
import dev.restate.sdk.annotation.Shared;
import dev.restate.sdk.annotation.Workflow;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

@Workflow
public class MyWorkflow {

  @Workflow
  public String run(WorkflowContext ctx, String input) {

    // implement workflow logic here

    return "success";
  }

  @Shared
  public void interactWithWorkflow(SharedWorkflowContext ctx, String input) {
    // implement interaction logic here
  }

  public static void main(String[] args) {
    RestateHttpEndpointBuilder.builder().bind(new MyWorkflow()).buildAndListen();
  }
}
// <end_here>
