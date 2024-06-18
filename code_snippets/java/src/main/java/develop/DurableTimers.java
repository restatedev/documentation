package develop;

import dev.restate.sdk.Context;
import java.time.Duration;

public class DurableTimers {

  public void timers(Context ctx) {
    // <start_sleep>
    ctx.sleep(Duration.ofSeconds(10));
    // <end_sleep>
  }
}
