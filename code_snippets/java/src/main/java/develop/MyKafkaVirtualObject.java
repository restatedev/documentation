package develop;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;

@VirtualObject
public class MyKafkaVirtualObject {

  @Handler
  public void handle(ObjectContext ctx, String req) {
    // <start_headers>
    ctx.request().headers();
    // <end_headers>
  }
}
