package develop;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.common.RetryPolicy;
import dev.restate.sdk.common.TerminalException;
import java.time.Duration;

@Service
public class RetryRunService {

  @Handler
  public String myHandler(Context ctx, String greeting) {

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
      ctx.run(
              RetryPolicy.defaultPolicy().setMaxAttempts(3),
              () -> writeToOtherSystem()
      );
    } catch (TerminalException e) {
      // Handle the terminal error after retries exhausted
      // For example, undo previous actions (see sagas guide) and
      // propagate the error back to the caller
    }
    // <end_catch>

    return greeting + "!";
  }

  private void writeToOtherSystem() {}
}
