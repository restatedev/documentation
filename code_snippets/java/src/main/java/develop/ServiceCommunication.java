package develop;

import dev.restate.sdk.Context;
import java.time.Duration;

public class ServiceCommunication {

    private void requestResponseService(Context ctx) {
        String request = "";

        // <start_request_response_service>
        MyServiceClient.ContextClient client = MyServiceClient.fromContext(ctx);
        String response = client.myHandler(request).await();
        // <end_request_response_service>
    }

    private void requestResponseVirtualObject(Context ctx) {
        String objectKey = "";
        String request = "";

        // <start_request_response_virtual_object>
        MyVirtualObjectClient.ContextClient client = MyVirtualObjectClient.fromContext(ctx, objectKey);
        String response = client.myHandler(request).await();
        // <end_request_response_virtual_object>
    }

    private void oneWay(Context ctx) {
        String request = "";

        // <start_one_way>
        MyServiceClient.ContextClient client = MyServiceClient.fromContext(ctx);
        client
            //highlight-next-line
            .send()
            .myHandler(request);
        // <end_one_way>
    }

    private void delayedCall(Context ctx) {
        String request = "";

        // <start_delayed>
        MyServiceClient.ContextClient client = MyServiceClient.fromContext(ctx);
        client
            //highlight-next-line
            .send(Duration.ofSeconds(1))
            .myHandler(request);
        // <end_delayed>
    }
}
