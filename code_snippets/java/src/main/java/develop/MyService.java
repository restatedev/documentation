package develop;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;

// <start_service>
// highlight-start
@Service
// highlight-end
public class MyService {

    // highlight-start
    @Handler
    // highlight-end
    String myHandler(Context context, String input) {
        return "my-output";
    }

}
// <end_service>