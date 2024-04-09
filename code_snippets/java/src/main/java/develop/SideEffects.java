//package develop;
//
//import dev.restate.sdk.Awaitable;
//import dev.restate.sdk.Awakeable;
//import dev.restate.sdk.ObjectContext;
//import dev.restate.sdk.common.CoreSerdes;
//import static greeter.generated.GreeterProto.*;
//
//import dev.restate.sdk.common.TerminalException;
//import greeter.generated.GreeterRestate;
//import org.apache.logging.log4j.core.Core;
//
//import java.time.Duration;
//import java.util.UUID;
//
//public class SideEffects extends GreeterRestate.GreeterRestateImplBase {
//
//    @Override
//    public GreetResponse greet(ObjectContext ctx, GreetRequest request) {
//
//        // <start_side_effect>
//        String output = ctx.sideEffect(CoreSerdes.JSON_STRING, () -> doDbRequest());
//        // <end_side_effect>
//
//
//        var paymentClient = new PaymentClient();
//        String txId = "";
//        int amount = 1;
//        // <start_retry_settings>
//        ctx.sideEffect(CoreSerdes.JSON_BOOLEAN, () -> {
//            boolean result = paymentClient.call(txId, amount);
//            if(result){
//                // highlight-next-line
//                throw new IllegalStateException("Payment failed");
//            } else {
//                return result;
//            }
//        });
//        // <end_retry_settings>
//
//
//        // <start_terminal>
//        try {
//            ctx.sideEffect(CoreSerdes.JSON_BOOLEAN, () -> {
//                boolean result = paymentClient.call(txId, amount);
//                if(result){
//                    //highlight-next-line
//                    throw new TerminalException(TerminalException.Code.UNKNOWN, "Payment failed");
//                } else {
//                    return result;
//                }
//            });
//        } catch (TerminalException e) {
//            // handle terminal error
//        }
//        // <end_terminal>
//
//
//        Awakeable<Boolean> a1 = ctx.awakeable(CoreSerdes.JSON_BOOLEAN);
//        Awakeable<Boolean> a2 = ctx.awakeable(CoreSerdes.JSON_BOOLEAN);
//        Awakeable<Boolean> a3 = ctx.awakeable(CoreSerdes.JSON_BOOLEAN);
//
//        // <start_combine_all>
//        Awaitable.all(a1, a2, a3).await();
//        // <end_combine_all>
//
//        // <start_combine_any>
//        boolean res = (boolean) Awaitable.any(a1, a2, a3).await();
//        // <end_combine_any>
//
//        // <start_uuid>
//        UUID uuid = ctx.random().nextUUID();
//        // <end_uuid>
//
//        // <start_random_nb>
//        int value = ctx.random().nextInt();
//        // <end_random_nb>
//
//
//
//        return GreetResponse.newBuilder()
//                .setMessage("Hello")
//                .build();
//    }
//
//    private String doDbRequest(){ return ""; }
//}
//
//class PaymentClient {
//    public boolean call(String txId, int amount) {
//        return true;
//    }
//}