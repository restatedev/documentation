package develop;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;

class MyEvent {}

// <start_here>
@VirtualObject
public class MyKafkaVirtualObject {

    @Handler
    public void handle(ObjectContext context, MyEvent request) {
        // Key
        String kafkaEventKey = context.key();

        // ... Do something ...
    }
}
// <end_here>