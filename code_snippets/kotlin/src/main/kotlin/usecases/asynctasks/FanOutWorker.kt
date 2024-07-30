package usecases.asynctasks

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.kotlin.Awaitable
import dev.restate.sdk.kotlin.Context
import dev.restate.sdk.kotlin.awaitAll
import dev.restate.sdk.kotlin.runBlock
import develop.usecases.asynctasks.FanOutWorkerClient

// <start_here>
@Service
class FanOutWorker {
  @Handler
  suspend fun run(ctx: Context, task: Task): Result {
    val subTasks = ctx.runBlock { split(task) }

    val resultFutures: MutableList<Awaitable<SubTaskResult>> = mutableListOf()
    // <mark_1>
    for (subTask in subTasks) {
      val subResultFuture = FanOutWorkerClient.fromContext(ctx).runSubtask(subTask)

      // </mark_1>
      resultFutures.add(subResultFuture)
    }

    // <mark_2>
    val results = resultFutures.awaitAll()
    // </mark_2>
    return aggregate(results)
  }

  @Handler
  suspend fun runSubtask(ctx: Context?, subTask: SubTask?): SubTaskResult {
    // Processing logic goes here ...
    // Can be moved to a separate service to scale independently
    return SubTaskResult()
  }
}
// <end_here>

class Result

class SubTask

class Task

class SubTaskResult

fun split(task: Task): Array<SubTask> {
  return emptyArray()
}

fun aggregate(subResults: List<SubTaskResult>): Result {
  return Result()
}
