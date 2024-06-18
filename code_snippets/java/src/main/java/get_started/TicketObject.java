package get_started;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;

@VirtualObject
public class TicketObject {
  @Handler
  public void unreserve(ObjectContext ctx) {
    return;
  }
}
