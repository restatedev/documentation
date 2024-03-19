package develop;

import static counter.CounterOuterClass.*;
import counter.CounterRestate;
import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.common.TerminalException;
import greeter.generated.GreeterProto;
import greeter.generated.GreeterProto.GreetResponse;
import greeter.generated.GreeterRestate;

public class ServiceTypes extends GreeterRestate.GreeterRestateImplBase {

    @Override
    public GreetResponse greet(ObjectContext ctx, GreeterProto.GreetRequest request) throws TerminalException {

        // <start_ordering>
        CounterRestate.CounterRestateClient client = CounterRestate.newClient(ctx);
        client.oneWay().add(
            AddRequest.newBuilder().setName("Restate").setNumber(1).build()
        );
        client.oneWay().add(
            AddRequest.newBuilder().setName("Restate").setNumber(2).build()
        );
        // <end_ordering>

        return GreetResponse.getDefaultInstance();
    }

    private String doDbRequest(){ return ""; }
}