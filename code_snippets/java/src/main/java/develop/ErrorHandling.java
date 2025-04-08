package develop;

import dev.restate.sdk.Context;
import dev.restate.sdk.common.TerminalException;

public class ErrorHandling {

  public void errorHandling(Context ctx) {

    // <start_here>
    throw new TerminalException(500, "Something went wrong");
    // <end_here>

  }
}
