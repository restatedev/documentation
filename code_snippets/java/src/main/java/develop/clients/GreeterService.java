package develop.clients;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;

@Service
public class GreeterService {
  @Handler
  public String greet(Context ctx, String greeting) {
    return "Hello, " + greeting + "!";
  }
}
