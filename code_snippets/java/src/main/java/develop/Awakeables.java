package develop;

import dev.restate.sdk.Awakeable;
import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.ObjectContext;

public class Awakeables {

    public void awakeables(ObjectContext ctx) {
        // <start_create>
        Awakeable<String> awakeable = ctx.awakeable(JsonSerdes.STRING);
        String awakeableId = awakeable.id();

        ctx.run(() -> triggerTaskAndDeliverId(awakeableId));

        String payload = awakeable.await();
        // <end_create>

        // <start_resolve>
        ctx.awakeableHandle(awakeableId)
                .resolve(JsonSerdes.STRING, "hello");
        // <end_resolve>

        // <start_reject>
        ctx.awakeableHandle(awakeableId)
                .reject("my error reason");
        // <end_reject>
    }

    public void triggerTaskAndDeliverId(String awakeableId) {
    }
}