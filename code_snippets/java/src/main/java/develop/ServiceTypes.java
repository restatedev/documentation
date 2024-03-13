package develop;

import static counter.CounterOuterClass.*;
import counter.CounterRestate;
import dev.restate.sdk.ObjectContext;

public class ServiceTypes extends CounterRestate.CounterRestateImplBase {

    @Override
    public Response count(ObjectContext ctx, AddRequest request) {

        // <start_ordering>
        CounterRestate.CounterRestateClient client = CounterRestate.newClient(ctx);
        client.oneWay().add(
            AddRequest.newBuilder().setName("Restate").setNumber(1).build()
        );
        client.oneWay().add(
            AddRequest.newBuilder().setName("Restate").setNumber(2).build()
        );
        // <end_ordering>

        return Response.newBuilder()
                .setMessage("Hello")
                .build();
    }

    private String doDbRequest(){ return ""; }
}