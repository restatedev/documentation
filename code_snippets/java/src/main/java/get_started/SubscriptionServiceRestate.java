package get_started;

import dev.restate.sdk.Context;
import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.common.TerminalException;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import static java.net.http.HttpResponse.BodyHandlers;
import java.util.UUID;

@Service
public class SubscriptionServiceRestate {

    private static final String PAYMENT_API = "https://pvd5p37t6zz5hpsetbqda2bzra0fwqkx.lambda-url.eu-central-1.on.aws";
    private static final String SUBSCRIPTION_API = "https://z2bo2pifnqgfscdzinm6szme5u0fajja.lambda-url.eu-central-1.on.aws";

    @Handler
    public void add(Context ctx, SubscriptionRequest req) {
        // 1. Generate an idempotency key
        String idempotencyKey = ctx.run(JsonSerdes.STRING, () -> UUID.randomUUID().toString());

        // 2. Create a recurring payment
        String paymentRef = ctx.run(JsonSerdes.STRING,
                () -> createRecurringPayment(req.getUserId(), req.getCreditCard(), idempotencyKey));

        // 3. Create subscriptions
        for (String subscription : req.getSubscriptions()) {
            ctx.run(() -> createSubscription(req.getUserId(), subscription, paymentRef));
        }
    }

    private String createRecurringPayment(String userId, String creditCard, String idempotencyKey) throws IOException, InterruptedException {
        HttpClient httpClient = HttpClient.newHttpClient();
        URI uri = URI.create(PAYMENT_API + "/createRecurringPayment");
        String requestBody = String.format("{\"userId\": \"%s\", \"creditCard\": \"%s\"}", userId, creditCard);
        HttpRequest request =
                HttpRequest.newBuilder()
                        .uri(uri)
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                        .build();

        HttpResponse<String> response = httpClient.send(request, BodyHandlers.ofString());
        if (response.statusCode() != 200) {
            throw new TerminalException(
                    "Prepare request to restaurant failed with status code: " + response.statusCode());
        }
        return response.body();
    }

    private void createSubscription(String userId, String subscription, String paymentRef) throws IOException, InterruptedException {
        HttpClient httpClient = HttpClient.newHttpClient();
        URI uri = URI.create(SUBSCRIPTION_API + "/create");
        String requestBody = String.format("{\"userId\": \"%s\", \"subscription\": \"%s\", \"paymentRef\": \"%s\"}", userId, subscription, paymentRef);
        HttpRequest request =
                HttpRequest.newBuilder()
                        .uri(uri)
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                        .build();

        HttpResponse<String> response = httpClient.send(request, BodyHandlers.ofString());
        if (response.statusCode() != 200) {
            throw new TerminalException(
                    "Prepare request to restaurant failed with status code: " + response.statusCode());
        }
    }

    public static void main(String[] args){
        RestateHttpEndpointBuilder.builder()
                .bind(new SubscriptionServiceRestate())
                .buildAndListen(9081);
    }
}