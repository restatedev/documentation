package use_cases.utils;

public class User {
    private String name;
    private String email;

    public User(String email, String id, String name) {
        this.email = email;
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }
}
