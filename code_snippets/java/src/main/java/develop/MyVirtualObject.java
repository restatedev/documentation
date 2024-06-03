package develop;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.SharedObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Shared;
import dev.restate.sdk.annotation.VirtualObject;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;

// <start_virtual_object>
@VirtualObject
public class MyVirtualObject {

    @Handler
    public String myHandler(ObjectContext ctx, String input) {
        return "my-output";
    }

    @Shared
    public String myConcurrentHandler(SharedObjectContext ctx, String input){
        return "my-output";
    }

    public static void main(String[] args) {
        RestateHttpEndpointBuilder.builder()
            .bind(new MyVirtualObject())
            .buildAndListen();
    }
}
// <end_virtual_object>