package usecases.asynctasks.parallelize;

import static usecases.asynctasks.parallelize.utils.Utils.*;

import dev.restate.sdk.Context;
import dev.restate.sdk.DurableFuture;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.http.vertx.RestateHttpServer;
import dev.restate.serde.TypeRef;
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
            new TypeRef<>() {},
            // break
            () -> split(task));

    List<DurableFuture<?>> resultFutures = new ArrayList<>();
    // <mark_1>
    for (SubTask subTask : subTasks) {
      resultFutures.add(FanOutWorkerClient.fromContext(ctx).runSubtask(subTask));
    }
    // </mark_1>

    // <mark_2>
    DurableFuture.all(resultFutures).await();

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
    RestateHttpServer.listen(Endpoint.bind(new FanOutWorker()));
  }
}
// <end_here>
