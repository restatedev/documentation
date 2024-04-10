package develop

import dev.restate.sdk.kotlin.Context
import java.time.Duration
import kotlin.time.Duration.Companion.seconds

class ServiceCommunication {
    suspend fun requestResponseService(ctx: Context) {
        val request = ""

        // <start_request_response_service>
        val client = MyServiceClient.fromContext(ctx)
        val response: String = client.myHandler(request).await()
        // <end_request_response_service>
    }

    suspend fun requestResponseVirtualObject(ctx: Context) {
        val objectKey = ""
        val request = ""

        // <start_request_response_virtual_object>
        val client = MyVirtualObjectClient.fromContext(ctx, objectKey)
        val response: String = client.myHandler(request).await()
        // <end_request_response_virtual_object>
    }

    suspend fun oneWay(ctx: Context) {
        val request = ""

        // <start_one_way>
        val client = MyServiceClient.fromContext(ctx)
        client
            //highlight-next-line
            .send()
            .myHandler(request)
        // <end_one_way>
    }

    suspend fun delayedCall(ctx: Context) {
        val request = ""

        // <start_delayed>
        val client = MyServiceClient.fromContext(ctx)
        client
            //highlight-next-line
            .send(1.seconds)
            .myHandler(request)
        // <end_delayed>
    }
}
