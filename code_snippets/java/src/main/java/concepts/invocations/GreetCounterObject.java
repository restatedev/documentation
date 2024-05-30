package concepts.invocations;

import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;
import dev.restate.sdk.common.StateKey;

@VirtualObject
public class GreetCounterObject {

    public final static StateKey<Integer> COUNT =
            StateKey.of("count", JsonSerdes.INT);

    @Handler
    public int greet(ObjectContext ctx, String greeting){
        int count = ctx.get(COUNT).orElse(0);
        int newCount = count + 1;
        ctx.set(COUNT, newCount);
        return newCount;
    }
}
