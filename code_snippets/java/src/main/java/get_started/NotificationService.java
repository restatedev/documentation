package get_started;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;

@Service
public class NotificationService {

    @Handler
    public void notify(Context ctx, Notification notification) {
        // Send a notification to the user
    }

    @Handler
    public void remind(Context ctx, String userId) {
        // Send a notification to the user
    }

}
