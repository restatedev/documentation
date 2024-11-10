package get_started;

public class SubscriptionRequest {
    private String userId;
    private String creditCard;
    private String[] subscriptions;

    public SubscriptionRequest(String creditCard, String[] subscriptions, String userId) {
        this.creditCard = creditCard;
        this.subscriptions = subscriptions;
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCreditCard() {
        return creditCard;
    }

    public void setCreditCard(String creditCard) {
        this.creditCard = creditCard;
    }

    public String[] getSubscriptions() {
        return subscriptions;
    }

    public void setSubscriptions(String[] subscriptions) {
        this.subscriptions = subscriptions;
    }
}
