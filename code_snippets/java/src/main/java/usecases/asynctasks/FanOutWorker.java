package usecases.asynctasks;

import static usecases.utils.ExampleStubs.aggregate;
import static usecases.utils.ExampleStubs.split;

import com.fasterxml.jackson.core.type.TypeReference;
import dev.restate.sdk.Awaitable;
import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.sdk.serde.jackson.JacksonSerdes;
import java.util.ArrayList;
import java.util.List;
import usecases.utils.Result;
import usecases.utils.SubTask;
import usecases.utils.SubTaskResult;
import usecases.utils.Task;

// <start_here>
@Service
public class FanOutWorker {

  @Handler
  public Result run(Context ctx, Task task) {

    SubTask[] subTasks = ctx.run(JacksonSerdes.of(new TypeReference<>() {}), () -> split(task));

    List<Awaitable<?>> resultFutures = new ArrayList<>();
    // <mark_1>
    for (SubTask subTask : subTasks) {
      Awaitable<SubTaskResult> subResultFuture =
          FanOutWorkerClient.fromContext(ctx).runSubtask(subTask);
      // </mark_1>

      resultFutures.add(subResultFuture);
    }

    // <mark_1>
    Awaitable.all(resultFutures).await();

    SubTaskResult[] results =
        (SubTaskResult[]) resultFutures.stream().map(Awaitable::await).toArray();
    // </mark_1>

    return aggregate(results);
  }

  @Handler
  public SubTaskResult runSubtask(Context ctx, SubTask subTask) {
    // Processing logic goes here ...
    // Can be moved to a separate service to scale independently
    return new SubTaskResult();
  }
}
// <end_here>
