package usecases.asynctasks.simple;

import static usecases.utils.ExampleStubs.someHeavyWork;

import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import usecases.utils.TaskOpts;

// <start_here>
@Service
public class AsyncTaskService {

  // <mark_1>
  @Handler
  public String runTask(Context ctx, TaskOpts params) {
    return someHeavyWork(params);
  }
  // </mark_1>
}
// <end_here>
