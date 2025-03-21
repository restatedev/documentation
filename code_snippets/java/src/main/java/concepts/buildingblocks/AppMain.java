package concepts.buildingblocks;

import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.http.vertx.RestateHttpServer;

public class AppMain {
  public static void main(String[] args) {
    RestateHttpServer.listen(Endpoint.bind(new OrderWorkflow()).bind(new DeliveryManager()));
  }
}
