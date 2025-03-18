package concepts.invocations;

import dev.restate.client.Client;
import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;

@Service
public class OneWayCalls {

  // <start_one_way_call>
  @Handler
  public void myRestateHandler(Context ctx) {
    // !focus(1:2)
    // From a Java Restate service
    GreeterServiceClient.fromContext(ctx).send().greet("Hi");
  }

  // <end_one_way_call>

  // <start_one_way_call_java>
  public void myJavaHandler() {
    // !focus(1:3)
    // Or from any other Java program
    Client restateClient = Client.connect("http://localhost:8080");
    GreeterServiceClient.fromClient(restateClient).send().greet("Hi");
  }
  // <end_one_way_call_java>
}
