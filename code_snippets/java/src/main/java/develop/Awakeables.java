package develop;

import dev.restate.sdk.Awakeable;
import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.common.CoreSerdes;

public class Awakeables {

    public void awakeables(ObjectContext ctx) {
        // <start_create>
        // 1. Generate the awakeable
        Awakeable<String> awakeable = ctx.awakeable(CoreSerdes.JSON_STRING);

        // 2. Deliver the ID to the process that will resolve the awakeable
        String awakeableId = awakeable.id();
        ctx.run(() -> { /** deliver the ID **/ });

        // 3. Wait for the awakeable to be resolved, and get the payload
        String payload = awakeable.await();
        // <end_create>


        // <start_resolve>
        ctx.awakeableHandle(awakeableId).resolve(CoreSerdes.JSON_STRING, "hello");
        // <end_resolve>

        // <start_reject>
        ctx.awakeableHandle(awakeableId).reject("my error reason");
        // <end_reject>
    }
}