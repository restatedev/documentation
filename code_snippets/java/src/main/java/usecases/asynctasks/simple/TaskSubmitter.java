package usecases.asynctasks.simple;

import dev.restate.client.Client;
import dev.restate.client.SendResponse;
import java.time.Duration;
import usecases.utils.TaskOpts;

public class TaskSubmitter {

  String RESTATE_URL = "http://localhost:8080";

  public void scheduleTask(TaskOpts taskOpts) {
    // <start_here>
    // The Java SDK generates clients for each service
    Client restateClient = Client.connect(RESTATE_URL);
    SendResponse<String> sendResponse =
        // <mark_1>
        AsyncTaskServiceClient.fromClient(restateClient)
            .send()
            .runTask(
                taskOpts,
                Duration.ofDays(5),
                // <mark_2>
                opt -> opt.idempotencyKey("dQw4w9WgXcQ")
                // </mark_2>
                );
    // </mark_1>

    // Attach to the async task to get the result
    // <mark_3>
    String result =
        sendResponse
            // break
            .invocationHandle()
            // break
            .attach()
            .response();
    // </mark_3>
    // <end_here>
  }
}
