package develop;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.VirtualObject;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

// <start_virtual_object>
@VirtualObject
public class MyVirtualObject {

    @Handler
    String myHandler(ObjectContext ctx, String input) {
        return "my-output";
    }

    public static void main(String[] args) {
        RestateHttpEndpointBuilder.builder()
            .bind(new MyVirtualObject())
            .buildAndListen();
    }
}
// <end_virtual_object>