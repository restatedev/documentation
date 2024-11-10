//package get_started;
//
//import java.net.http.HttpClient;
//import java.net.http.HttpRequest;
//import java.util.UUID;
//
//@Service
//public class SubscriptionService {
//
//    @Handler
//    public void add(Context ctx, SubscriptionRequest req) {
//
//        String idempotencyKey = ctx.run(JsonSerdes.STRING, () -> UUID.randomUUID().toString());
//
//        ctx.run(() -> {
//            var recurringPaymentReq = HttpRequest.newBuilder()
//                    .build();
//
//            HttpClient.newHttpClient()
//                    .send(recurringPaymentReq);
//        })
//
//
//    }
//}
