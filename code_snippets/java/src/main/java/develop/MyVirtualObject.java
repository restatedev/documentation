package develop;

// <start_here>
import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.SharedObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Shared;
import dev.restate.sdk.annotation.VirtualObject;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

@VirtualObject
public class MyVirtualObject {

  @Handler
  public String myHandler(ObjectContext ctx, String greeting) {
    String objectId = ctx.key();

    return greeting + " " + objectId + "!";
  }

  @Shared
  public String myConcurrentHandler(SharedObjectContext ctx, String input) {
    return "my-output";
  }

  public static void main(String[] args) {
    RestateHttpEndpointBuilder.builder().bind(new MyVirtualObject()).buildAndListen();
  }
}
// <end_here>
