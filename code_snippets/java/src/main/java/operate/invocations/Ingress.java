package operate.invocations;

import dev.restate.sdk.Context;

import java.time.Duration;

public class Ingress {

    public void myJavaHandler(Context ctx){
        // <start_rpc_java>
        String greet = GreeterServiceClient
            .fromIngress("http://localhost:8080")
            .greet("Hi");

        int count = GreetCounterObjectClient
            .fromIngress("http://localhost:8080", "Mary")
            .greet("Hi");
        // <end_rpc_java>

        // <start_one_way_call_java>
        String invocationId = GreeterServiceClient
            .fromIngress("http://localhost:8080")
            .send()
            .greet("Hi");

        GreetCounterObjectClient
            .fromIngress("http://localhost:8080", "Mary")
            .send()
            .greet("Hi");
        // <end_one_way_call_java>

        // <start_delayed_call_java>
        GreeterServiceClient
                .fromIngress("http://localhost:8080")
                .send(Duration.ofMillis(1000))
                .greet("Hi");

        String invocationIdCount = GreetCounterObjectClient
                .fromIngress("http://localhost:8080", "Mary")
                .send(Duration.ofMillis(1000))
                .greet("Hi");
        // <end_delayed_call_java>

    }
}
