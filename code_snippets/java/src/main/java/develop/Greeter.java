package develop;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.common.CoreSerdes;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;
import static greeter.generated.GreeterProto.*;
import greeter.generated.GreeterRestate;


public class Greeter extends GreeterRestate.GreeterRestateImplBase {

  private static final StateKey<Integer> COUNT = StateKey.of("count", CoreSerdes.JSON_INT);

  @Override
  public GreetResponse greet(ObjectContext ctx, GreetRequest request) {
    int count = ctx.get(COUNT).orElse(1);
    ctx.set(COUNT, count + 1);

    return GreetResponse.newBuilder()
            .setMessage("Hello " + request.getName() + " for the " + count + " time!")
            .build();
  }

  public static void main(String[] args) {
    RestateHttpEndpointBuilder.builder().withService(new Greeter()).buildAndListen();
  }
}