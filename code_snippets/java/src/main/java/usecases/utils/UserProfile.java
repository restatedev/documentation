package usecases.utils;

public class UserProfile {

  private final String id;
  private final String name;
  private String email;

  public UserProfile(String id, String name) {
    this.id = id;
    this.name = name;
  }

  public UserProfile(String id, String name, String email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  public String getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}
