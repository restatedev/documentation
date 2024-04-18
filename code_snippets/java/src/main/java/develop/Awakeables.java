package develop;

import dev.restate.sdk.Awakeable;
import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.common.CoreSerdes;

public class Awakeables {

    public void awakeables(ObjectContext ctx) {
        // <start_create>
        // 1. Generate the ID
        Awakeable<String> awakeable = ctx.awakeable(CoreSerdes.JSON_STRING);

        // 2. Send the ID to some external system
        String awakeableId = awakeable.id();
        // ... send a request to another system and include the awakeableId as callback url...

        // 3. Wait for the ID to returned and retrieve the payload
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