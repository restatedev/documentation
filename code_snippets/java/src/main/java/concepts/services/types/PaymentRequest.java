package concepts.services.types;

public class PaymentRequest {
    private String account;
    private String email;
    private double amount;

    public PaymentRequest(String account, String email, double amount) {
        this.account = account;
        this.email = email;
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }

    public String getAccount() {
        return account;
    }

    public String getEmail() {
        return email;
    }
}
