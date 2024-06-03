package develop;

import dev.restate.sdk.*;
import dev.restate.sdk.annotation.*;
import dev.restate.sdk.common.*;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

@VirtualObject
public class Greeter {

  private static final StateKey<Integer> COUNT = StateKey.of("count", JsonSerdes.INT);

  @Handler
  public String greet(ObjectContext ctx, String greeting) {
    // Get the count and increment it
    int count = ctx.get(COUNT).orElse(1);
    ctx.set(COUNT, count + 1);

    // Send the response back
    return greeting + " " + ctx.key() + ", for the " + count + " time!";
  }

  public static void main(String[] args) {
    RestateHttpEndpointBuilder.builder()
      .bind(new Greeter())
      // Start the Restate Endpoint HTTP Server
      .buildAndListen();
  }
}