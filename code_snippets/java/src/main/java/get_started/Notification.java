package get_started;

public class Notification {
    private String userId;
    private String message;

    public Notification(String userId, String message) {
        this.userId = userId;
        this.message = message;
    }

    public String getUserId() {
        return userId;
    }

    public String getMessage() {
        return message;
    }
}
