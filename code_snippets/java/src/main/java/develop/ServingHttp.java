package develop;

// <start_here>
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.http.vertx.RestateHttpServer;

class MyApp {
  public static void main(String[] args) {
    RestateHttpServer.listen(
        Endpoint.builder()
            .bind(new MyService())
            .bind(new MyVirtualObject())
            .bind(new MyWorkflow())
            .build());
  }
}
// <end_here>
