package usecases.asynctasks.simple;

import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.client.CallRequestOptions;
import dev.restate.sdk.client.Client;
import dev.restate.sdk.client.SendResponse;
import java.time.Duration;
import usecases.utils.TaskOpts;

public class TaskSubmitter {

  String RESTATE_URL = "http://localhost:8080";

  public void scheduleTask(TaskOpts taskOpts) {
    // <start_here>
    // The Java SDK generates clients for each service
    Client restateClient = Client.connect(RESTATE_URL);
    SendResponse handle =
        // <mark_1>
        AsyncTaskServiceClient.fromClient(restateClient)
            .send(Duration.ofDays(5))
            .runTask(
                taskOpts,
                // <mark_2>
                CallRequestOptions.DEFAULT.withIdempotency("dQw4w9WgXcQ")
                // </mark_2>
                );
    // </mark_1>

    // Attach to the async task to get the result
    // <mark_3>
    String result =
        restateClient
            // break
            .invocationHandle(handle.getInvocationId(), JsonSerdes.STRING)
            // break
            .attach();
    // </mark_3>
    // <end_here>
  }
}
