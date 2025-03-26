package concepts.services;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.SharedObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Shared;
import dev.restate.sdk.annotation.VirtualObject;
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.http.vertx.RestateHttpServer;
import dev.restate.sdk.types.StateKey;

// <start_here>
// <mark_1>
@VirtualObject
public class Greeter {
  // </mark_1>

  // <mark_2>
  public static final StateKey<Integer> COUNT = StateKey.of("count", Integer.class);

  // </mark_2>

  // <mark_1>
  // <mark_3>
  @Handler
  public String greet(ObjectContext ctx, String greeting) {
    // </mark_3>
    String name = ctx.key();
    // </mark_1>

    // <mark_2>
    int count = ctx.get(COUNT).orElse(0);
    // </mark_2>
    int newCount = count + 1;
    // <mark_2>
    ctx.set(COUNT, newCount);
    // </mark_2>

    return String.format("%s %s, for the %d-th time", greeting, name, newCount);
  }

  // <mark_1>
  // <mark_3>
  @Handler
  public String ungreet(ObjectContext ctx) {
    // </mark_3>
    String name = ctx.key();
    // </mark_1>

    // <mark_2>
    int count = ctx.get(COUNT).orElse(0);
    // </mark_2>
    if (count > 0) {
      int newCount = count - 1;
      // <mark_2>
      ctx.set(COUNT, newCount);
      // </mark_2>
    }

    return String.format("Dear %s, taking one greeting back: %d", name, count);
  }

  // <mark_4>
  // <mark_1>
  @Shared
  public int getGreetCount(SharedObjectContext ctx) {
    // </mark_1>
    // <mark_2>
    return ctx.get(COUNT).orElse(0);
    // </mark_2>
  }

  // </mark_4>

  public static void main(String[] args) {
    RestateHttpServer.listen(Endpoint.bind(new Greeter()));
  }
}
// <end_here>
