package develop.clients;

import dev.restate.client.Client;
import dev.restate.client.SendResponse;
import dev.restate.common.Output;
import java.time.Duration;

public class Ingress {

  public void myJavaHandler() {
    // <start_rpc_java>
    Client rs = Client.connect("http://localhost:8080");
    String greet = GreeterServiceClient.fromClient(rs).greet("Hi");

    int count = GreetCounterObjectClient.fromClient(rs, "Mary").greet("Hi");
    // <end_rpc_java>
  }

  public void myOneWayCallHandler() {

    // <start_one_way_call_java>
    Client rs = Client.connect("http://localhost:8080");
    GreeterServiceClient.fromClient(rs)
        // !mark
        .send()
        .greet("Hi");

    GreetCounterObjectClient.fromClient(rs, "Mary")
        // !mark
        .send()
        .greet("Hi");
    // <end_one_way_call_java>
  }

  public void myDelayedOneWayCallHandler() {
    // <start_delayed_call_java>
    Client rs = Client.connect("http://localhost:8080");
    GreeterServiceClient.fromClient(rs)
        .send()
        // !mark
        .greet("Hi", Duration.ofSeconds(1));

    GreetCounterObjectClient.fromClient(rs, "Mary")
        .send()
        // !mark
        .greet("Hi", Duration.ofSeconds(1));
    // <end_delayed_call_java>

  }

  public void idempotentInvoke() {
    // <start_service_idempotent>
    Client rs = Client.connect("http://localhost:8080");
    GreetCounterObjectClient.fromClient(rs, "Mary")
        .send()
        // !mark
        .greet("Hi", opt -> opt.idempotencyKey("abcde"));
    // <end_service_idempotent>
  }

  public void attach() {

    // <start_service_attach>
    Client rs = Client.connect("http://localhost:8080");
    SendResponse<String> sendResponse =
        GreeterServiceClient.fromClient(rs)
            .send()
            // !mark
            .greet("Hi", opt -> opt.idempotencyKey("abcde"));

    // ... do something else ...

    // Option 1: Attach later to retrieve the result
    // !mark
    String greeting =
        // !mark
        sendResponse.attach().response();

    // Option 2: Peek to see if the result is ready
    // !mark
    Output<String> output =
        // !mark
        sendResponse.getOutput().response();
    if (output.isReady()) {
      String result = output.getValue();
    }
    // <end_service_attach>
  }
}
