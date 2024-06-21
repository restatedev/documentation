package concepts.invocations;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.client.Client;
import develop.MyWorkflowClient;

@Service
public class OneWayCalls {

  // <start_one_way_call>
  @Handler
  public void myRestateHandler(Context ctx) {
    // focus
    GreeterServiceClient.fromContext(ctx)
        // focus
        .send()
        // focus
        .greet("Hi");

    // focus
    GreetCounterObjectClient.fromContext(ctx, "Mary")
        // focus
        .send()
        // focus
        .greet("Hi");

    // focus
    MyWorkflowClient.fromContext(ctx, "wf-id-1")
        // focus
        .send()
        // focus
        .run("input");
  }

  // <end_one_way_call>

  // <start_one_way_call_java>
  public void myJavaHandler(Context ctx) {
    // focus
    Client restate = Client.connect("http://localhost:8080");
    // focus
    GreeterServiceClient.fromClient(restate)
        // focus
        .send()
        // focus
        .greet("Hi");

    // focus
    GreetCounterObjectClient.fromClient(restate, "Mary")
        // focus
        .send()
        // focus
        .greet("Hi");

    // focus
    MyWorkflowClient.fromClient(restate, "wf-id-1")
        // focus
        .submit("input");
  }
  // <end_one_way_call_java>
}
