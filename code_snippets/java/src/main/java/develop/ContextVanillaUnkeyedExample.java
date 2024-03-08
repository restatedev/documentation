package develop;

import com.google.protobuf.Empty;
import dev.restate.sdk.Context;
import example.generated.ExampleProto;
import example.generated.UnkeyedExampleGrpc;
import io.grpc.stub.StreamObserver;

public class ContextVanillaUnkeyedExample extends UnkeyedExampleGrpc.UnkeyedExampleImplBase {

    // <start_here>
    @Override
    public void greet(ExampleProto.Request request, StreamObserver<Empty> responseObserver) {
        // highlight-next-line
        Context ctx = Context.current();
        // ... Do something ... //
    }
    // <end_here>
}
