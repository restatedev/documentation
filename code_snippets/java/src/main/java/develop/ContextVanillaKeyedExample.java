package develop;

import com.google.protobuf.Empty;
import dev.restate.sdk.ObjectContext;
import example.generated.ExampleGrpc;
import example.generated.ExampleProto;
import io.grpc.stub.StreamObserver;

public class ContextVanillaKeyedExample extends ExampleGrpc.ExampleImplBase {

    // <start_here>
    @Override
    public void greet(ExampleProto.ExampleRequest request, StreamObserver<Empty> responseObserver) {
        // highlight-next-line
        ObjectContext ctx = ObjectContext.current();
        // ... Do something ... //
    }
    // <end_here>
}
