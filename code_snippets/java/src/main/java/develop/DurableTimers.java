//package develop;
//
//import dev.restate.sdk.ObjectContext;
//import static greeter.generated.GreeterProto.*;
//import greeter.generated.GreeterRestate;
//
//import java.time.Duration;
//
//public class DurableTimers extends GreeterRestate.GreeterRestateImplBase {
//
//    @Override
//    public GreetResponse greet(ObjectContext ctx, GreetRequest request) {
//
//        // <start_here>
//        ctx.sleep(Duration.ofSeconds(10));
//        // <end_here>
//
//        return GreetResponse.newBuilder()
//                .setMessage("Hello")
//                .build();
//    }
//}