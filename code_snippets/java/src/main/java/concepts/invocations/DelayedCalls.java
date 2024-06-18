package concepts.invocations;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.client.Client;
import dev.restate.sdk.client.SendResponse;
import develop.MyWorkflowClient;
import java.time.Duration;

@Service
public class DelayedCalls {

  // <start_delayed_call>
  @Handler
  public void myRestateHandler(Context ctx) {
    // focus(1:11)
    GreeterServiceClient.fromContext(ctx).send(Duration.ofMillis(1000)).greet("Hi");

    GreetCounterObjectClient.fromContext(ctx, "Mary").send(Duration.ofMillis(1000)).greet("Hi");

    MyWorkflowClient.fromContext(ctx, "wf-id-1").send(Duration.ofMillis(1000)).run("input");
  }

  // <end_delayed_call>

  // <start_delayed_call_java>
  public void myJavaHandler(Context ctx) {
    // focus(1:10)
    Client restate = Client.connect("http://localhost:8080");
    SendResponse handle =
        GreeterServiceClient.fromClient(restate).send(Duration.ofMillis(1000)).greet("Hi");

    SendResponse handle2 =
        GreetCounterObjectClient.fromClient(restate, "Mary")
            .send(Duration.ofMillis(1000))
            .greet("Hi");
  }
  // <end_delayed_call_java>
}
