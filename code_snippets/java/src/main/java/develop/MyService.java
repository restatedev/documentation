package develop;

// <start_here>
import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.http.vertx.RestateHttpServer;

@Service
public class MyService {
  @Handler
  public String myHandler(Context ctx, String greeting) {
    return greeting + "!";
  }

  public static void main(String[] args) {
    RestateHttpServer.listen(Endpoint.bind(new MyService()));
  }
}
// <end_here>
