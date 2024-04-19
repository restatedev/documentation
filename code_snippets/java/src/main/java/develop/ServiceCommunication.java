package develop;

import dev.restate.sdk.Context;
import java.time.Duration;

public class ServiceCommunication {

    private void requestResponseService(Context ctx) {
        String request = "";

        // <start_request_response_service>
        String response = MyServiceClient.fromContext(ctx)
            .myHandler(request)
            .await();
        // <end_request_response_service>
    }

    private void requestResponseVirtualObject(Context ctx) {
        String objectKey = "";
        String request = "";

        // <start_request_response_virtual_object>
        String response = MyVirtualObjectClient.fromContext(ctx, objectKey)
            .myHandler(request)
            .await();
        // <end_request_response_virtual_object>
    }

    private void oneWay(Context ctx) {
        String request = "";

        // <start_one_way>
        MyServiceClient.fromContext(ctx)
            // withClass highlight-line
            .send()
            .myHandler(request);
        // <end_one_way>
    }

    private void delayedCall(Context ctx) {
        String request = "";

        // <start_delayed>
        MyServiceClient.fromContext(ctx)
            // withClass highlight-line
            .send(Duration.ofSeconds(1))
            .myHandler(request);
        // <end_delayed>
    }

    private void orderingGuarantees(Context ctx){
           // <start_ordering>
           MyVirtualObjectClient.fromContext(ctx, objectKey).send().myHandler("Hi!");
           MyVirtualObjectClient.fromContext(ctx, objectKey).send().myHandler("Hi again!");
           // <end_ordering>
    }
}
