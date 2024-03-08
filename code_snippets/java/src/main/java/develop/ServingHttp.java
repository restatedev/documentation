package develop;

// <start_here>
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

class MyApp {
    public static void main(String[] args) {
        //highlight-start
        RestateHttpEndpointBuilder.builder()
                .withService(new Greeter())
                .buildAndListen();
        //highlight-end
    }
}
// <end_here>

