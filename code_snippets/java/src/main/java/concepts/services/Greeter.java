package concepts.services;

import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

/**
 * WARNING:
 * The Services page relies on the line numbers for the code animations
 * Make sure you adapt the line numbers when adapting the code
 */

// <start_here>
@VirtualObject
public class Greeter {

    public final static StateKey<Integer> COUNT =
            StateKey.of("count", JsonSerdes.INT);

    @Handler
    public String greet(ObjectContext ctx, String greeting) {
        Integer count = ctx.get(COUNT).orElse(0);
        count++;
        ctx.set(COUNT, count);
        return greeting + " " + ctx.key() + "for the " + count + "-th time";
    }

    @Handler
    public String ungreet(ObjectContext ctx) {
        Integer count = ctx.get(COUNT).orElse(0);
        if (count > 0) {
            count--;
        }
        ctx.set(COUNT, count);
        return "Dear "  + ctx.key() + ", taking one greeting back";
    }

    public static void main(String[] args) {
        RestateHttpEndpointBuilder.builder()
            .bind(new Greeter())
            .buildAndListen();
    }
}
// <end_here>
