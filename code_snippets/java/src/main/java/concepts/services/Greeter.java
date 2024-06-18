package concepts.services;

import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

/**
 * WARNING: The Services page relies on the line numbers for the code animations Make sure you adapt
 * the line numbers when adapting the code
 */

// <start_here>
// <mark_1>
@VirtualObject
public class Greeter {
  // </mark_1>

  public static final StateKey<Integer> COUNT = StateKey.of("count", JsonSerdes.INT);

  // <mark_1>
  // <mark_3>
  @Handler
  public String greet(ObjectContext ctx, String greeting) {
    // </mark_3>
    // </mark_1>
    // <mark_2>
    Integer count = ctx.get(COUNT).orElse(0);
    count++;
    ctx.set(COUNT, count);
    // </mark_2>
    // <mark_1>
    return greeting + " " + ctx.key() + "for the " + count + "-th time";
    // </mark_1>
  }

  // <mark_1>
  // <mark_3>
  @Handler
  public String ungreet(ObjectContext ctx) {
    // </mark_3>
    // </mark_1>
    // <mark_2>
    Integer count = ctx.get(COUNT).orElse(0);
    // </mark_2>
    if (count > 0) {
      // <mark_2>
      count--;
      // </mark_2>
    }
    // <mark_2>
    ctx.set(COUNT, count);
    // </mark_2>
    // <mark_1>
    return "Dear " + ctx.key() + ", taking one greeting back";
    // </mark_1>
  }

  public static void main(String[] args) {
    RestateHttpEndpointBuilder.builder().bind(new Greeter()).buildAndListen();
  }
}
// <end_here>
