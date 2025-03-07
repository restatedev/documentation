package usecases.asynctasks

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.kotlin.Awaitable
import dev.restate.sdk.kotlin.Context
import dev.restate.sdk.kotlin.awaitAll
import dev.restate.sdk.kotlin.runBlock
import kotlinx.serialization.Serializable
import org.apache.logging.log4j.LogManager
import kotlin.time.Duration.Companion.seconds

// <start_here>
@Service
class FanOutWorker {
  @Handler
  suspend fun run(ctx: Context, task: Task): TaskResult {
    val subTasks = ctx.runBlock { task.split() }

    // <mark_1>
    val results = subTasks.map {
      FanOutWorkerClient.fromContext(ctx).runSubtask(it)
      // </mark_1>
      // <mark_2>
    }.awaitAll()
    // </mark_2>
    return results.aggregate()
  }

  @Handler
  suspend fun runSubtask(ctx: Context, subTask: SubTask): SubTaskResult {
    // Processing logic goes here ...
    // Can be moved to a separate service to scale independently
    return subTask.execute(ctx)
  }
}
// <end_here>

@Serializable
data class TaskResult(val description: String)

@Serializable
data class SubTask(val description: String)

@Serializable
data class Task(val description: String)

@Serializable
data class SubTaskResult(val description: String)

private val logger = LogManager.getLogger("FanOutWorker")

fun Task.split(): List<SubTask> {
  // Split the task into subTasks
  return this.description.split(",").map { SubTask(it) }
}

suspend fun SubTask.execute(ctx: Context): SubTaskResult {
  // Execute subtask
  logger.info("Started executing subtask: {}", this.description)
  // Sleep for a random amount between 0 and 10 seconds
  ctx.sleep(ctx.random().nextInt(0, 10).toLong().seconds)
  logger.info("Execution subtask finished: {}", this.description)
  return SubTaskResult("${this.description}: DONE")
}

fun List<SubTaskResult>.aggregate(): TaskResult {
  // Aggregate the results
  val resultDescription = this.joinToString(", ") { it.description }
  logger.info("Aggregated result: {}", resultDescription)
  return TaskResult(resultDescription)
}