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
    // !focus(1:3)
    // From a Java Restate service
    Duration delay = Duration.ofDays(5);
    GreeterServiceClient.fromContext(ctx).send().greet("Hi", delay);
  }

  // <end_delayed_call>

  // <start_delayed_call_java>
  public void myJavaHandler() {
    // !focus(1:4)
    // Or from any other Java program
    Client restateClient = Client.connect("http://localhost:8080");
    Duration delay = Duration.ofDays(5);
    GreeterServiceClient.fromClient(restateClient).send().greet("Hi", delay);
  }
  // <end_delayed_call_java>
}
