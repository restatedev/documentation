package concepts.invocations;

import dev.restate.client.Client;
import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import java.time.Duration;

@Service
public class DelayedCalls {

  // <start_delayed_call>
  @Handler
  public void myRestateHandler(Context ctx) {
    // !focus
    GreeterServiceClient.fromContext(ctx)
        .send()
        // !focus
        .greet("Hi", Duration.ofSeconds(1));
  }

  // <end_delayed_call>

  // <start_delayed_call_java>
  public void myJavaHandler() {
    // !focus
    Client restate = Client.connect("http://localhost:8080");
    // !focus
    GreeterServiceClient.fromClient(restate)
        .send()
        // !focus
        .greet("Hi", Duration.ofSeconds(1));
  }
  // <end_delayed_call_java>
}
