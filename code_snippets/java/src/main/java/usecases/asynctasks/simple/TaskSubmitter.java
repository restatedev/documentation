package usecases.asynctasks.simple;

import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.client.CallRequestOptions;
import dev.restate.sdk.client.Client;
import dev.restate.sdk.client.SendResponse;
import usecases.utils.TaskOpts;

import java.time.Duration;

// <start_here>
public class TaskSubmitter {

  private static final Client restateClient = Client.connect("http://localhost:8080");

  public void scheduleTask(TaskOpts taskOpts) {
    // <mark_1>
    // The Java SDK generates clients for each service
    SendResponse handle =
        AsyncTaskServiceClient.fromClient(restateClient)
            .send(Duration.ofDays(5))
            .runTask(
                taskOpts,
                // <mark_2>
                CallRequestOptions.DEFAULT.withIdempotency("dQw4w9WgXcQ")
                // </mark_2>
                );
    // </mark_1>

    // await the handler's result
    // <mark_3>
    String result = restateClient.invocationHandle(handle.getInvocationId(), JsonSerdes.STRING).attach();

    // </mark_3>
  }
}
// <end_here>
