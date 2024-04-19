package develop

import dev.restate.sdk.kotlin.Context
import java.time.Duration
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
