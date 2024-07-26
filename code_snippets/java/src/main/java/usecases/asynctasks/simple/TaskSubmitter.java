package usecases.asynctasks.simple;

import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.client.CallRequestOptions;
import dev.restate.sdk.client.Client;
import dev.restate.sdk.client.SendResponse;
import usecases.utils.TaskOpts;

// <start_here>
public class TaskSubmitter {

  private static final Client rs = Client.connect("http://localhost:8080");

  public void submitAndAwaitTasks(TaskOpts taskOpts) {
    // <mark_1>
    SendResponse handle =
        AsyncTaskServiceClient.fromClient(rs)
            .send()
            .runTask(
                taskOpts,
                // <mark_2>
                CallRequestOptions.DEFAULT.withIdempotency("dQw4w9WgXcQ")
                // </mark_2>
                );
    // </mark_1>

    // await the handler's result
    // <mark_3>
    String result = rs.invocationHandle(handle.getInvocationId(), JsonSerdes.STRING).attach();
    // </mark_3>
  }
}
// <end_here>
