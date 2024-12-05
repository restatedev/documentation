package concepts.invocations;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.client.Client;

@Service
public class OneWayCalls {

  // <start_one_way_call>
  @Handler
  public void myRestateHandler(Context ctx) {
    // !focus
    GreeterServiceClient.fromContext(ctx)
        // !focus
        .send()
        // !focus
        .greet("Hi");
  }

  // <end_one_way_call>

  // <start_one_way_call_java>
  public void myJavaHandler() {
    // !focus
    Client restate = Client.connect("http://localhost:8080");
    // !focus
    GreeterServiceClient.fromClient(restate)
        // !focus
        .send()
        // !focus
        .greet("Hi");
  }
  // <end_one_way_call_java>
}
