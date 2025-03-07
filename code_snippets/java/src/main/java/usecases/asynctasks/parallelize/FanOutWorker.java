package usecases.asynctasks.parallelize;

import static usecases.asynctasks.parallelize.utils.Utils.*;

import com.fasterxml.jackson.core.type.TypeReference;
import dev.restate.sdk.Awaitable;
import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;
import dev.restate.sdk.serde.jackson.JacksonSerdes;
import java.util.ArrayList;
import java.util.List;
import usecases.asynctasks.parallelize.utils.*;

// <start_here>
@Service
public class FanOutWorker {

  @Handler
  public Result run(Context ctx, Task task) {

    // Split the task in subtasks
    List<SubTask> subTasks =
        ctx.run(
            JacksonSerdes.of(new TypeReference<>() {}),
            // break
            () -> split(task));

    List<Awaitable<?>> resultFutures = new ArrayList<>();
    // <mark_1>
    for (SubTask subTask : subTasks) {
      resultFutures.add(FanOutWorkerClient.fromContext(ctx).runSubtask(subTask));
    }
    // </mark_1>

    // <mark_2>
    Awaitable.all(resultFutures).await();

    var results = resultFutures.stream().map(future -> (SubTaskResult) future.await()).toList();
    // </mark_2>

    return aggregate(results);
  }

  @Handler
  public SubTaskResult runSubtask(Context ctx, SubTask subTask) {
    // Processing logic goes here ...
    // Can be moved to a separate service to scale independently
    return executeSubtask(ctx, subTask);
  }

  public static void main(String[] args) {
    RestateHttpEndpointBuilder.builder().bind(new FanOutWorker()).buildAndListen();
  }
}
// <end_here>
