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
    return someHeavyWork(params)
  }
  // </mark_1>
}
// <end_here>

class TaskOpts

fun someHeavyWork(task: TaskOpts): String {
  return ""
}
