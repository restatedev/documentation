package develop;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

// <start_here>
@Service
public class MyService {

    @Handler
    public String myHandler(Context ctx, String input) {
        return "my-output";
    }

    public static void main(String[] args) {
        RestateHttpEndpointBuilder.builder()
            .bind(new MyService())
            .buildAndListen();
    }
}
// <end_here>