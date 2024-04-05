package concepts.components;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;

import java.time.Duration;

@Service
public class Invocations {

    @Handler
    public void rpcCall(Context ctx){
        UpdateRequest update = new UpdateRequest("user123", "admin", new String[]{"read", "write"});

        // <start_rpc>
        // RPC call to a service
        RoleUpdateServiceClient.fromContext(ctx)
                .applyRoleUpdate(update)
                .await();

        // RPC call to a virtual object
        String response = GreeterClient.fromContext(ctx, "Mary")
                .greet("Hi")
                .await();
        // <end_rpc>co
    }

    @Handler
    public void oneWayCall(Context ctx){
        UpdateRequest update = new UpdateRequest("user123", "admin", new String[]{"read", "write"});

        // <start_one_way_call>
        // Send a message to a service
        RoleUpdateServiceClient.fromContext(ctx).send()
                .applyRoleUpdate(update);

        // Send a message to a virtual object
        GreeterClient.fromContext(ctx, "Mary").send()
                .greet("Hi");
        // <end_one_way_call>
    }

    @Handler
    public void delayedCall(Context ctx){
        UpdateRequest update = new UpdateRequest("user123", "admin", new String[]{"read", "write"});

        // <start_delayed_call>
        // Send a message to a service after a delay
        RoleUpdateServiceClient.fromContext(ctx).send(Duration.ofMillis(1000))
                .applyRoleUpdate(update);

        // Send a message to a virtual object after a delay
        GreeterClient.fromContext(ctx, "Mary").send(Duration.ofMillis(1000))
                .greet("Hi");
        // <end_delayed_call>
    }
}
