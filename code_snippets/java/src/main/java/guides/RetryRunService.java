package guides;

import dev.restate.sdk.Context;
import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.annotation.Accept;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Raw;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.common.RetryPolicy;
import dev.restate.sdk.common.TerminalException;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;
import develop.MyServiceClient;
import java.time.Duration;
import java.util.concurrent.TimeoutException;

@Service
public class RetryRunService {

  @Handler
  public String myRunHandler(Context ctx, String greeting) {

    // <start_here>
    // <mark_1>
    RetryPolicy myRunRetryPolicy =
        RetryPolicy.defaultPolicy()
            .setInitialDelay(Duration.ofMillis(500))
            .setExponentiationFactor(2)
            .setMaxDelay(Duration.ofSeconds(10))
            .setMaxAttempts(10)
            .setMaxDuration(Duration.ofMinutes(5));
    // </mark_1>
    ctx.run(myRunRetryPolicy, () -> writeToOtherSystem());
    // <end_here>

    // <start_catch>
    try {
      // Fails with a terminal error after 3 attempts or if the function throws one
      ctx.run(RetryPolicy.defaultPolicy().setMaxAttempts(3), () -> writeToOtherSystem());
    } catch (TerminalException e) {
      // Handle the terminal error: undo previous actions and
      // propagate the error back to the caller
    }
    // <end_catch>

    return greeting + "!";
  }

  // <start_raw>
  @Handler
  public void myHandler(
      Context ctx,
      // !mark
      @Accept("*/*") @Raw byte[] request) {
    try {
      var decodedRequest = decodeRequest(request);

      // ... rest of your business logic ...

    } catch (TerminalException e) {
      // Propagate to DLQ/catch-all handler
    }
  }

  // <end_raw>

  @Handler
  public void timeoutHandler(Context ctx) {
    // <start_timeout>
    try {
      // If the timeout hits first, it throws a `TimeoutError`.
      // If you do not catch it, it will lead to a retry.
      MyServiceClient.fromContext(ctx)
          .myHandler("Hello")
          // !mark
          .await(Duration.ofSeconds(5));

      var awakeable = ctx.awakeable(JsonSerdes.BOOLEAN);
      // ...Do something that will trigger the awakeable
      // !mark
      awakeable.await(Duration.ofSeconds(5));

    } catch (TimeoutException e) {
      // Handle the timeout error
    }
    // <end_timeout>
  }

  public static void main(String[] args) {
    RestateHttpEndpointBuilder.builder()
            .bind(new RetryRunService())
            .buildAndListen();
  }

  private Object decodeRequest(byte[] request) {
    return new Object();
  }

  private void writeToOtherSystem() {}
}
