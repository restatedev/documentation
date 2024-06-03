package concepts.services.types;

public class UpdateRequest {
    private String userId;
    private String role;
    private String[] permissions;

    public UpdateRequest(String userId, String role, String[] permissions) {
        this.userId = userId;
        this.role = role;
        this.permissions = permissions;
    }

    public String getUserId() {
        return userId;
    }

    public String getRole() {
        return role;
    }

    public String[] getPermissions() {
        return permissions;
    }
}
