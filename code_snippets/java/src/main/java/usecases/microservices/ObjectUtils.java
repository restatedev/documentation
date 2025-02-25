package usecases.microservices;


public class ObjectUtils {
    public record SubscriptionRequest(String userId, String creditCard, String subscription) {}


    public static boolean createRecurringPayment(String s, String paymentId) {
        return true;
    }

}
