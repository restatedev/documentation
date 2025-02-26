package usecases.microservices;


public class Utils {
    public record SubscriptionRequest(String userId, String creditCard, String[] subscriptions) {}

    public static String createRecurringPayment(String s, String paymentId) {
        return "";
    }

    public static void createSubscription(String s, String subscription, String payRef) {
    }


    public static void createSubscription(String s, String subscription) {
    }

    public static void removeSubscription(String s, String subscription) {
    }


    public static void removeRecurringPayment(String paymentId) {
    }

}
