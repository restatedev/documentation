package concepts.invocations;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.client.Client;
import develop.MyWorkflowClient;

@Service
public class RpcCalls {

  // <start_rpc>
  @Handler
  public void myRestateHandler(Context ctx) {
    // focus
    String greet =
        // focus
        GreeterServiceClient.fromContext(ctx)
            // focus
            .greet("Hi")
            // focus
            .await();

    // focus
    int count =
        // focus
        GreetCounterObjectClient.fromContext(ctx, "Mary")
            // focus
            .greet("Hi")
            // focus
            .await();

    // focus
    String result =
        // focus
        MyWorkflowClient.fromContext(ctx, "wf-id-1")
            // focus
            .run("input")
            // focus
            .await();
  }

  // <end_rpc>

  // <start_rpc_java>
  public void myJavaHandler(Context ctx) {
    // focus
    Client restate = Client.connect("http://localhost:8080");
    // focus
    String greet =
        // focus
        GreeterServiceClient.fromClient(restate)
            // focus
            .greet("Hi");

    // focus
    int count =
        // focus
        GreetCounterObjectClient.fromClient(restate, "Mary")
            // focus
            .greet("Hi");
  }
  // <end_rpc_java>

}
