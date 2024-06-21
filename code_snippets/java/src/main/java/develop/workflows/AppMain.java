package develop.workflows;

import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

public class AppMain {

  public static void main(String[] args) {
    RestateHttpEndpointBuilder.builder()
        .bind(new SignupWorkflow())
        .bind(new UserManagementService())
        .buildAndListen(9086);
  }
}
