//package develop;
//
//// <start_here>
//import com.google.protobuf.ByteString;
//import dev.restate.sdk.ObjectContext;
//import static example.generated.KafkaExampleProto.*;
//import example.generated.MyServiceRestate;
//
//public class KafkaService extends MyServiceRestate.MyServiceRestateImplBase {
//
//    // highlight-start
//    @Override
//    public void handle(ObjectContext context, MyEvent request) {
//        ByteString payload = request.getPayload();
//        // ... Do something ...
//    }
//    // highlight-end
//}
//// <end_here>