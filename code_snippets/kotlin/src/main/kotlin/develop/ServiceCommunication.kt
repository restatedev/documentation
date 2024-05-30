package develop

import dev.restate.sdk.kotlin.Context
import kotlin.time.Duration.Companion.seconds

class ServiceCommunication {
    suspend fun requestResponseService(ctx: Context) {
        val request = ""

        // <start_request_response_service>
        val response: String = MyServiceClient.fromContext(ctx)
            .myHandler(request)
            .await()
        // <end_request_response_service>
    }

    suspend fun requestResponseVirtualObject(ctx: Context) {
        val objectKey = ""
        val request = ""

        // <start_request_response_virtual_object>
        val response: String = MyVirtualObjectClient.fromContext(ctx, objectKey)
            .myHandler(request)
            .await()
        // <end_request_response_virtual_object>
    }

    suspend fun requestResponseWorkflow(ctx: Context) {
        val workflowId = ""
        val request = ""

        // <start_request_response_workflow>
        // Call the `run` handler of the workflow
        val response: String = MyWorkflowClient.fromContext(ctx, workflowId)
            .run(request)
            .await()

        // Calling other handlers of the workflow. (Callable up to 24 hours after end of `run` handler execution.)
        MyWorkflowClient.fromContext(ctx, workflowId)
            .interactWithWorkflow(request)
            .await()
        // <end_request_response_workflow>
    }

    suspend fun oneWay(ctx: Context) {
        val request = ""

        // <start_one_way>
        MyServiceClient.fromContext(ctx)
            // withClass highlight-line
            .send()
            .myHandler(request)
        // <end_one_way>
    }

    suspend fun delayedCall(ctx: Context) {
        val request = ""

        // <start_delayed>
        MyServiceClient.fromContext(ctx)
            // withClass highlight-line
            .send(1.seconds)
            .myHandler(request)
        // <end_delayed>
    }
}
