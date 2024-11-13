package get_started;

import dev.restate.sdk.Context;
import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.util.UUID;

@Service
public class SubscriptionService {

    @Handler
    public void add(Context ctx, SubscriptionRequest req) {

        String idempotencyKey = ctx.run(JsonSerdes.STRING, () -> UUID.randomUUID().toString());

        ctx.run(() -> {
            var recurringPaymentReq = HttpRequest.newBuilder()
                    .
                    .build();

            HttpClient.newHttpClient()
                    .send(recurringPaymentReq);
        });


    }




}


import java.util.UUID;
import java.util.List;
import java.util.Map;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class SubscriptionService {

    private static final String PAYMENT_API = "https://pvd5p37t6zz5hpsetbqda2bzra0fwqkx.lambda-url.eu-central-1.on.aws";
    private static final String SUBSCRIPTION_API = "https://z2bo2pifnqgfscdzinm6szme5u0fajja.lambda-url.eu-central-1.on.aws";

    public void add(Map<String, Object> ctx, Map<String, Object> req) throws Exception {
        String userId = (String) req.get("userId");
        String creditCard = (String) req.get("creditCard");
        List<String> subscriptions = (List<String>) req.get("subscriptions");

        // 1. Generate an idempotency key
        String idempotencyKey = UUID.randomUUID().toString();

        // 2. Create a recurring payment
        String paymentRef = createRecurringPayment(userId, creditCard, idempotencyKey);

        // 3. Create subscriptions
        for (String subscription : subscriptions) {
            createSubscription(userId, subscription, paymentRef);
        }
    }

    private String createRecurringPayment(String userId, String creditCard, String idempotencyKey) throws Exception {
        URL url = new URL(PAYMENT_API + "/createRecurringPayment");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Idempotency-Key", idempotencyKey);
        conn.setDoOutput(true);

        String jsonInputString = String.format("{\"userId\": \"%s\", \"creditCard\": \"%s\"}", userId, creditCard);
        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }

        // Assuming the response is a JSON object with a field "paymentRef"
        // Parse the response to get the paymentRef
        // For simplicity, returning a dummy paymentRef
        return "dummyPaymentRef";
    }

    private void createSubscription(String userId, String subscription, String paymentRef) throws Exception {
        URL url = new URL(SUBSCRIPTION_API + "/create");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);

        String jsonInputString = String.format("{\"userId\": \"%s\", \"subscription\": \"%s\", \"paymentRef\": \"%s\"}", userId, subscription, paymentRef);
        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }

        // Handle the response if needed
    }
}