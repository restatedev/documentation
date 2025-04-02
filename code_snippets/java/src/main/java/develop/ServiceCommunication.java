package develop;

import dev.restate.common.Request;
import dev.restate.common.Target;
import dev.restate.sdk.Context;
import dev.restate.serde.TypeTag;
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
    String response =
        ctx.call(Request.of(target, TypeTag.of(String.class), TypeTag.of(String.class), request))
            .await();
    // <end_request_response_generic>
  }

  private void genericSend(Context ctx) {
    String request = "";

    // <start_one_way_generic>
    Target target = Target.service("MyService", "myHandler"); // or virtualObject or workflow
    ctx.send(Request.of(target, TypeTag.of(String.class), TypeTag.of(String.class), request));
    // <end_one_way_generic>
  }

  private void genericDelayedSend(Context ctx) {
    String request = "";

    // <start_delayed_generic>
    Target target = Target.service("MyService", "myHandler"); // or virtualObject or workflow
    ctx.send(
        Request.of(target, TypeTag.of(String.class), TypeTag.of(String.class), request),
        Duration.ofDays(5));
    // <end_delayed_generic>
  }

  private void oneWay(Context ctx) {
    String request = "";

    // <start_one_way>
    MyServiceClient.fromContext(ctx).send().myHandler(request);
    // <end_one_way>
  }

  private void idempotencyKey(Context ctx) {
    String request = "";

    // <start_idempotency_key>
    // For a regular call
    MyServiceClient.fromContext(ctx)
        .myHandler(request, req -> req.idempotencyKey("my-idempotency-key"));
    // For a one way call
    MyServiceClient.fromContext(ctx)
        .send()
        .myHandler(request, req -> req.idempotencyKey("my-idempotency-key"));
    // <end_idempotency_key>
  }

  private void attach(Context ctx) {
    String request = "";

    // <start_attach>
    var handle =
        MyServiceClient.fromContext(ctx)
            .send()
            .myHandler(
                request,
                // Optional: send attaching idempotency key
                req -> req.idempotencyKey("my-idempotency-key"));
    var response = handle.attach().await();
    // <end_attach>
  }

  private void cancel(Context ctx) {
    String request = "";

    // <start_cancel>
    var handle = MyServiceClient.fromContext(ctx).send().myHandler(request);
    handle.cancel();
    // <end_cancel>
  }

  private void delayedCall(Context ctx) {
    String request = "";

    // <start_delayed>
    MyServiceClient.fromContext(ctx).send().myHandler(request, Duration.ofDays(5));
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
