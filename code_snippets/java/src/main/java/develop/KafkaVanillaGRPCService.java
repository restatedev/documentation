package develop;

// <start_here>
import com.google.protobuf.Empty;
import static dev.restate.sdk.examples.generated.KafkaExampleProto.*;
import dev.restate.sdk.examples.generated.MyServiceGrpc;
import io.grpc.stub.StreamObserver;

public class KafkaVanillaGRPCService extends MyServiceGrpc.MyServiceImplBase {

    // highlight-start
    @Override
    public void handle(MyEvent event, StreamObserver<Empty> responseObserver) {

        // ... Handle event ...

        responseObserver.onNext(Empty.getDefaultInstance());
        responseObserver.onCompleted();
    }
    // highlight-end
}
// <end_here>