package develop.workflows;

import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.http.vertx.RestateHttpServer;

public class AppMain {

  public static void main(String[] args) {
    RestateHttpServer.listen(
        Endpoint.bind(new SignupWorkflow()).bind(new UserManagementService()), 9086);
  }
}
