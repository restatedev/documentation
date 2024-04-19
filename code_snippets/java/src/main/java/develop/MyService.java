package develop;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;

// <start_service>
@Service
public class MyService {

    @Handler
    String myHandler(Context ctx, String input) {
        return "my-output";
    }

}
// <end_service>