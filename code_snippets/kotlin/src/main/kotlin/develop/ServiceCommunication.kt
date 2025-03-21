package develop

import dev.restate.sdk.common.Target
import dev.restate.sdk.kotlin.Context
import dev.restate.sdk.kotlin.KtSerdes
import kotlin.time.Duration.Companion.days

class ServiceCommunication {
  suspend fun requestResponseService(ctx: Context) {
    val request = ""

    // <start_request_response_service>
    val response: String = MyServiceClient.fromContext(ctx).myHandler(request).await()
    // <end_request_response_service>
  }

  suspend fun requestResponseVirtualObject(ctx: Context) {
    val objectKey = ""
    val request = ""

    // <start_request_response_virtual_object>
    val response: String =
        MyVirtualObjectClient.fromContext(ctx, objectKey).myHandler(request).await()
    // <end_request_response_virtual_object>
  }

  suspend fun requestResponseWorkflow(ctx: Context) {
    val workflowId = ""
    val request = ""

    // <start_request_response_workflow>
    // Call the `run` handler of the workflow
    val response: String = MyWorkflowClient.fromContext(ctx, workflowId).run(request).await()

    // Call some other `interactWithWorkflow` handler of the workflow.
    MyWorkflowClient.fromContext(ctx, workflowId).interactWithWorkflow(request).await()
    // <end_request_response_workflow>
  }

  suspend fun oneWay(ctx: Context) {
    val request = ""

    // <start_one_way>
    MyServiceClient.fromContext(ctx).send().myHandler(request)
    // <end_one_way>
  }

  suspend fun generic(ctx: Context) {
    val request = ""

    // <start_request_response_generic>
    val target = Target.service("MyService", "myHandler")
    val response =
        ctx.callAsync(
            target,
            inputSerde = KtSerdes.json<String>(),
            outputSerde = KtSerdes.json<String>(),
            request).await()
    // <end_request_response_generic>
  }

  suspend fun genericSend(ctx: Context) {
    val request = ""

    // <start_one_way_generic>
    val target = Target.service("MyService", "myHandler")
    ctx.send(target, KtSerdes.json<String>(), request)
    // <end_one_way_generic>
  }

  suspend fun genericDelayed(ctx: Context) {
    val request = ""

    // <start_delayed_generic>
    val target = Target.service("MyService", "myHandler")
    ctx.send(target, KtSerdes.json<String>(), request, delay = 5.seconds)
    // <end_delayed_generic>

  }

  suspend fun delayedCall(ctx: Context) {
    val request = ""

    // <start_delayed>
    MyServiceClient.fromContext(ctx).send(5.days).myHandler(request)
    // <end_delayed>
  }
}
