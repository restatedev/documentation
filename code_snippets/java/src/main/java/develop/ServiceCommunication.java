package develop;

import dev.restate.sdk.Context;
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

  private void oneWay(Context ctx) {
    String request = "";

    // <start_one_way>
    MyServiceClient.fromContext(ctx).send().myHandler(request);
    // <end_one_way>
  }

  private void delayedCall(Context ctx) {
    String request = "";

    // <start_delayed>
    MyServiceClient.fromContext(ctx).send(Duration.ofDays(5)).myHandler(request);
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
