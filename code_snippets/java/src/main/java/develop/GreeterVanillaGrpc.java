package develop;

// <start_here>
import dev.restate.sdk.Component;
import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.common.StateKey;
import dev.restate.sdk.common.CoreSerdes;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;
import greeter.generated.GreeterGrpc;
import static greeter.generated.GreeterProto.*;
import io.grpc.stub.StreamObserver;

public class GreeterVanillaGrpc extends GreeterGrpc.GreeterImplBase implements Component {

    private static final StateKey<Integer> COUNT = StateKey.of("count", CoreSerdes.JSON_INT);

    @Override
    public void greet(GreetRequest request, StreamObserver<GreetResponse> responseObserver) {
        ObjectContext ctx = ObjectContext.current();

        int count = ctx.get(COUNT).orElse(1);
        ctx.set(COUNT, count + 1);

        responseObserver.onNext(GreetResponse.newBuilder()
                .setMessage("Hello " + request.getName() + " for the " + count + " time!")
                .build());
        responseObserver.onCompleted();
    }

    public static void main(String[] args) {
        RestateHttpEndpointBuilder.builder().withService(new GreeterVanillaGrpc()).buildAndListen();
    }
}
// <end_here>