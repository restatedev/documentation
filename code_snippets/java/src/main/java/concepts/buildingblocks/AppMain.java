package concepts.buildingblocks;

import concepts.buildingblocks.part0.OrderWorkflow;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

public class AppMain {
  public static void main(String[] args) {
    RestateHttpEndpointBuilder.builder()
        .bind(new OrderWorkflow())
        .bind(new DeliveryManager())
        .buildAndListen();
  }
}
