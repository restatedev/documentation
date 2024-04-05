//package develop;
//
//import dev.restate.sdk.Context;
//import greeter.generated.GreeterGrpc;
//import greeter.generated.GreeterRestate;
//import java.time.Duration;
//import static greeter.generated.GreeterProto.*;
//
//public class ServiceCommunication {
//
//    private void requestResponse() {
//        Context ctx = Context.current();
//
//        // <start_request_response>
//        GreetRequest request = GreetRequest.newBuilder().setName("Restate").build();
//        //highlight-start
//        GreeterRestate.GreeterRestateClient client = GreeterRestate.newClient(ctx);
//        GreetResponse response = client.greet(request).await();
//        //highlight-end
//        // <end_request_response>
//    }
//
//    private void vanillaGrpcRequestResponse() {
//        Context ctx = Context.current();
//
//        // <start_grpc_request_response>
//        GreetRequest request = GreetRequest.newBuilder().setName("Restate").build();
//        //highlight-next-line
//        GreetResponse response = ctx.call(GreeterGrpc.getGreetMethod(), request).await();
//        // <end_grpc_request_response>
//    }
//
//    private void oneWay() {
//        Context ctx = Context.current();
//
//        // <start_one_way>
//        GreetRequest request = GreetRequest.newBuilder().setName("Restate").build();
//        //highlight-start
//        GreeterRestate.GreeterRestateClient client = GreeterRestate.newClient(ctx);
//        client.oneWay().greet(request);
//        //highlight-end
//        // <end_one_way>
//    }
//
//    private void vanillaGrpcOneWay() {
//        Context ctx = Context.current();
//
//        // <start_grpc_one_way>
//        GreetRequest request = GreetRequest.newBuilder().setName("Restate").build();
//        //highlight-next-line
//        ctx.oneWayCall(GreeterGrpc.getGreetMethod(), request);
//        // <end_grpc_one_way>
//    }
//
//    private void delayedCall() {
//        Context ctx = Context.current();
//
//        // <start_delayed>
//        GreetRequest request = GreetRequest.newBuilder().setName("Restate").build();
//        //highlight-start
//        GreeterRestate.GreeterRestateClient client = GreeterRestate.newClient(ctx);
//        client.delayed(Duration.ofSeconds(1)).greet(request);
//        //highlight-end
//        // <end_delayed>
//    }
//
//    private void vanillaGrpcDelayedCall() {
//        Context ctx = Context.current();
//
//        // <start_grpc_delayed>
//        GreetRequest request = GreetRequest.newBuilder().setName("Restate").build();
//        //highlight-next-line
//        ctx.delayedCall(GreeterGrpc.getGreetMethod(), request, Duration.ofMinutes(15));
//        // <end_grpc_delayed>
//    }
//}
