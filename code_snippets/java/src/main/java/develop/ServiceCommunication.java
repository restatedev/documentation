package develop;

import dev.restate.sdk.Context;
import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.common.Target;
import java.time.Duration;

public class ServiceCommunication {

  private void requestResponseService(Context ctx) {
    String request = "";

    // <start_request_response_service>
    String response = MyServiceClient.fromContext(ctx).myHandler(request).await();
    // <end_request_response_service>
  }

  private void requestResponseVirtualObject(Context ctx) {
    String objectKey = "";
    String request = "";

    // <start_request_response_virtual_object>
    String response = MyVirtualObjectClient.fromContext(ctx, objectKey).myHandler(request).await();
    // <end_request_response_virtual_object>
  }

  private void requestResponseWorkflow(Context ctx) {
    String workflowId = "";
    String request = "";

    // <start_request_response_workflow>
    // Call the `run` handler of the workflow
    String response = MyWorkflowClient.fromContext(ctx, workflowId).run(request).await();

    // Calling some other `interactWithWorkflow` handler of the workflow
    MyWorkflowClient.fromContext(ctx, workflowId).interactWithWorkflow(request).await();
    // <end_request_response_workflow>
  }

  private void genericCall(Context ctx) {
    String request = "";

    // <start_request_response_generic>
    Target target = Target.service("MyService", "myHandler"); // or virtualObject or workflow
    String response = ctx.call(target, JsonSerdes.STRING, JsonSerdes.STRING, request).await();
    // <end_request_response_generic>
  }

  private void genericSend(Context ctx) {
    String request = "";

    // <start_one_way_generic>
    Target target = Target.service("MyService", "myHandler"); // or virtualObject or workflow
    ctx.send(target, JsonSerdes.STRING, request);
    // <end_one_way_generic>
  }

  private void genericDelayedSend(Context ctx) {
    String request = "";

    // <start_delayed_generic>
    Target target = Target.service("MyService", "myHandler"); // or virtualObject or workflow
    ctx.send(target, JsonSerdes.STRING, request, Duration.ofSeconds(5));
    // <end_delayed_generic>
  }

  private void oneWay(Context ctx) {
    String request = "";

    // <start_one_way>
    MyServiceClient.fromContext(ctx).send().myHandler(request);
    // <end_one_way>
  }

  private void delayedCall(Context ctx) {
    String request = "";

    // <start_delayed>
    MyServiceClient.fromContext(ctx).send(Duration.ofSeconds(1)).myHandler(request);
    // <end_delayed>
  }

  private void orderingGuarantees(Context ctx) {
    String objectKey = "";
    // <start_ordering>
    MyVirtualObjectClient.fromContext(ctx, objectKey).send().myHandler("I'm call A");
    MyVirtualObjectClient.fromContext(ctx, objectKey).send().myHandler("I'm call B");
    // <end_ordering>
  }
}
