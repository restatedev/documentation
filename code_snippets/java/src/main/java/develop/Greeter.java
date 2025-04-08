package develop;

import dev.restate.sdk.*;
import dev.restate.sdk.annotation.*;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.http.vertx.RestateHttpServer;

@VirtualObject
public class Greeter {

  private static final StateKey<Integer> COUNT = StateKey.of("count", Integer.class);

  @Handler
  public String greet(ObjectContext ctx, String greeting) {
    // Get the count and increment it
    int count = ctx.get(COUNT).orElse(1);
    ctx.set(COUNT, count + 1);

    // Send the response back
    return greeting + " " + ctx.key() + ", for the " + count + " time!";
  }

  public static void main(String[] args) {
    // Start the Restate Endpoint HTTP Server
    RestateHttpServer.listen(Endpoint.bind(new Greeter()));
  }
}
