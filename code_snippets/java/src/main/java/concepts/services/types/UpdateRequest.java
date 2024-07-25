package concepts.services.types;

import usecases.utils.Permission;
import usecases.utils.UserRole;

public class UpdateRequest {
  private String userId;
  private UserRole role;
  private Permission[] permissions;

  public UpdateRequest(String userId, UserRole role, Permission[] permissions) {
    this.userId = userId;
    this.role = role;
    this.permissions = permissions;
  }

  public String getUserId() {
    return userId;
  }

  public UserRole getRole() {
    return role;
  }

  public Permission[] getPermissions() {
    return permissions;
  }
}
