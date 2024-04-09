package concepts.components;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;
import dev.restate.sdk.common.CoreSerdes;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

// <start_here>
@VirtualObject
public class Greeter {

    public final static StateKey<Integer> COUNT =
            StateKey.of("count", CoreSerdes.JSON_INT);

    @Handler
    public String greet(ObjectContext ctx, String greeting) {
        // access the state attached to this object (this 'name')
        // state access and updates are exclusive and consistent with the invocations
        Integer count = ctx.get(COUNT).orElse(0);
        count++;
        ctx.set(COUNT, count);
        return String.format("%s %s for the %d-th time", greeting, ctx.key(), count);
    }

    @Handler
    public String ungreet(ObjectContext ctx) {
        Integer count = ctx.get(COUNT).orElse(0);
        if (count > 0) {
            count--;
        }
        ctx.set(COUNT, count);
        return String.format("Dear %s, taking one greeting back: %d", ctx.key(), count);
    }

    public static void main(String[] args) {
        RestateHttpEndpointBuilder.builder()
            .bind(new Greeter())
            .buildAndListen();
    }
}
// <end_here>
