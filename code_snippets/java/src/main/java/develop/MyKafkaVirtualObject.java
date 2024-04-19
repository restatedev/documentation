package develop;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;

import java.util.Map;

class MyEvent {}

// <start_here>
@VirtualObject
public class MyKafkaVirtualObject {

    @Handler
    public void handle(ObjectContext ctx, MyEvent request) {


        // <start_headers>
        ctx.request().headers();
        // <end_headers>

    }


}
// <end_here>