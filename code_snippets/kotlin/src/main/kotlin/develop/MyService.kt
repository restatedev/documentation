package develop

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.kotlin.Context

// <start_service>
// highlight-start
@Service
// highlight-end
class MyService {

    // highlight-start
    @Handler
    // highlight-end
    suspend fun myHandler(context: Context, input: String): String {
        return "my-output"
    }

}
// <end_service>
