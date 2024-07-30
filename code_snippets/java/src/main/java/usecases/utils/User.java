package usecases.utils;

public class User {
  private String id;
  private String name;
  private String email;

  public User(String id, String email, String name) {
    this.id = id;
    this.email = email;
    this.name = name;
  }

  public String getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  public String getName() {
    return name;
  }
}
