package get_started;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.UUID;

import static java.net.http.HttpResponse.BodyHandlers;

public class SubscriptionService {

    private static final String PAYMENT_API = "https://pvd5p37t6zz5hpsetbqda2bzra0fwqkx.lambda-url.eu-central-1.on.aws";
    private static final String SUBSCRIPTION_API = "https://z2bo2pifnqgfscdzinm6szme5u0fajja.lambda-url.eu-central-1.on.aws";

    static class AddHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) throws IOException {
            ObjectMapper mapper = new ObjectMapper();
            var req = mapper.readValue(t.getRequestBody(), SubscriptionRequest.class);

            // 1. Generate an idempotency key
            String idempotencyKey = UUID.randomUUID().toString();

            try {
                // 2. Create a recurring payment
                String paymentRef = createRecurringPayment(req.getUserId(), req.getCreditCard(), idempotencyKey);

                // 3. Create subscriptions
                for (String subscription : req.getSubscriptions()) {
                    createSubscription(req.getUserId(), subscription, paymentRef);
                }
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
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
                            .header("Idempotency-Key", idempotencyKey)
                            .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                            .build();

            HttpResponse<String> response = httpClient.send(request, BodyHandlers.ofString());
            if (response.statusCode() != 200) {
                throw new RuntimeException("Creating recurring payment failed with status code: " + response.statusCode());
            }
            return response.body();
        }

        private String createSubscription(String userId, String subscription, String paymentRef) throws IOException, InterruptedException {
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
                throw new RuntimeException("Creating subscription failed with status code: " + response.statusCode());
            }
            return response.body();
        }
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        HttpServer server = HttpServer.create(new InetSocketAddress(5000), 0);
        server.createContext("/add", new AddHandler());
        server.setExecutor(null);
        server.start();
    }
}