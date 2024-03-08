package develop;

import com.google.protobuf.Empty;
import dev.restate.sdk.Context;
import static example.generated.ExampleProto.*;

import dev.restate.sdk.ObjectContext;
import example.generated.*;
import io.grpc.stub.StreamObserver;

class ContextKeyedExample extends KeyedExampleRestate.KeyedExampleRestateImplBase {

    // <start_keyed>
    @Override
    public void greet(ObjectContext ctx, ExampleRequest request) {
        // ... Do something ... //
    }
    // <end_keyed>
}


class ContextUnkeyedExample extends UnkeyedExampleRestate.UnkeyedExampleRestateImplBase {

    // <start_unkeyed>
    @Override
    public void greet(Context ctx, Request request) {
        // ... Do something ... //
    }
    // <end_unkeyed>
}

class ContextVanillaGrpcKeyedExample extends KeyedExampleGrpc.KeyedExampleImplBase {

    // <start_grpc_keyed>
    @Override
    public void greet(ExampleProto.ExampleRequest request, StreamObserver<Empty> responseObserver) {
        // highlight-next-line
        ObjectContext ctx = ObjectContext.current();
        // ... Do something ... //
    }
    // <end_grpc_keyed>
}

class ContextVanillaGrpcUnkeyedExample extends UnkeyedExampleGrpc.UnkeyedExampleImplBase {

    // <start_grpc_unkeyed>
    @Override
    public void greet(ExampleProto.Request request, StreamObserver<Empty> responseObserver) {
        // highlight-next-line
        Context ctx = Context.current();
        // ... Do something ... //
    }
    // <end_grpc_unkeyed>
}