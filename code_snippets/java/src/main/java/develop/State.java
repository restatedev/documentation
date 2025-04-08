package develop;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.common.StateKey;
import java.util.Collection;

public class State {
  public void getState(ObjectContext ctx) {

    // <start_statekeys>
    Collection<String> keys = ctx.stateKeys();
    // <end_statekeys>

    // <start_get>
    // Getting String value
    StateKey<String> STRING_STATE_KEY = StateKey.of("my-key", String.class);
    String stringState = ctx.get(STRING_STATE_KEY).orElse("my-default");

    // Getting integer value
    StateKey<Integer> INT_STATE_KEY = StateKey.of("my-key", Integer.class);
    int intState = ctx.get(INT_STATE_KEY).orElse(0);
    // <end_get>
  }

  public void setState(ObjectContext ctx) {
    // <start_set>
    StateKey<String> STRING_STATE_KEY = StateKey.of("my-key", String.class);
    ctx.set(STRING_STATE_KEY, "my-new-value");
    // <end_set>

  }

  public void clearState(ObjectContext ctx) {
    // <start_clear>
    StateKey<String> STRING_STATE_KEY = StateKey.of("my-key", String.class);
    ctx.clear(STRING_STATE_KEY);
    // <end_clear>

    // <start_clear_all>
    ctx.clearAll();
    // <end_clear_all>
  }
}
