package develop;

import dev.restate.sdk.Awakeable;
import dev.restate.sdk.ObjectContext;

public class Awakeables {

  public void awakeables(ObjectContext ctx) {
    // <start_here>
    // <mark_1>
    Awakeable<String> awakeable = ctx.awakeable(String.class);
    String awakeableId = awakeable.id();
    // </mark_1>

    // <mark_2>
    ctx.run(() -> triggerTaskAndDeliverId(awakeableId));
    // </mark_2>

    // <mark_3>
    String payload = awakeable.await();
    // </mark_3>
    // <end_here>

    // <start_resolve>
    ctx.awakeableHandle(awakeableId).resolve(String.class, "hello");
    // <end_resolve>

    // <start_reject>
    ctx.awakeableHandle(awakeableId).reject("my error reason");
    // <end_reject>
  }

  public void triggerTaskAndDeliverId(String awakeableId) {}
}
