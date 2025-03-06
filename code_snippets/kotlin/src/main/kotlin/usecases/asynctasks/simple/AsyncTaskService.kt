package usecases.asynctasks.simple

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.kotlin.Context

// <start_here>
@Service
class AsyncTaskService {
  // <mark_1>
  @Handler
  suspend fun runTask(ctx: Context, params: TaskOpts): String {
    return params.someHeavyWork()
  }
  // </mark_1>
}
// <end_here>

class TaskOpts

fun TaskOpts.someHeavyWork(): String {
  return ""
}
