package develop;

// <start_here>
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

class MyApp {
    public static void main(String[] args) {
        RestateHttpEndpointBuilder.builder()
            .bind(new MyService())
            .bind(new MyVirtualObject())
            .buildAndListen();
    }
}
// <end_here>

