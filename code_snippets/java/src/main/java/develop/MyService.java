package develop;

// <start_here>
import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

@Service
public class MyService {
  @Handler
  public String myHandler(Context ctx, String greeting) {
    return greeting + "!";
  }

  public static void main(String[] args) {
    RestateHttpEndpointBuilder.builder().bind(new MyService()).buildAndListen();
  }
}
// <end_here>
