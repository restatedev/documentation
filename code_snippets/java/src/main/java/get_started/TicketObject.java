package get_started;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;

@VirtualObject
public class TicketObject {
    @Handler
    public void unreserve(Context ctx) {
        return;
    }
}
