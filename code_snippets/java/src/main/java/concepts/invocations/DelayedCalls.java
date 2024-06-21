package concepts.invocations;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.client.Client;
import java.time.Duration;

@Service
public class DelayedCalls {

  // <start_delayed_call>
  @Handler
  public void myRestateHandler(Context ctx) {
    // focus
    GreeterServiceClient.fromContext(ctx)
        // focus
        .send(Duration.ofMillis(1000))
        // focus
        .greet("Hi");
  }

  // <end_delayed_call>

  // <start_delayed_call_java>
  public void myJavaHandler(Context ctx) {
    // focus
    Client restate = Client.connect("http://localhost:8080");
    // focus
    GreeterServiceClient.fromClient(restate)
        // focus
        .send(Duration.ofMillis(1000))
        // focus
        .greet("Hi");
  }
  // <end_delayed_call_java>
}
