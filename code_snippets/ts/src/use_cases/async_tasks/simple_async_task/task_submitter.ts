import * as restate from "@restatedev/restate-sdk-clients";
import { SendOpts } from "@restatedev/restate-sdk-clients";
import { AsyncTaskService, TaskOpts } from "./async_task_service";

/*
 * Restate is as a sophisticated task queue, with extra features like
 * stateful tasks, queues per key, or workflows-as-code within tasks,
 * and reliable timers.
 *
 * Every handler in Restate is executed asynchronously and can be treated
 * as a reliable asynchronous task. Restate persists invocations, restarts
 * upon failures, reliably queues them under backpressure.
 */

// ------------------- submit and await tasks like RPC calls ------------------

const RESTATE_URL = process.env.RESTATE_URL ?? "http://localhost:8080";

// <start_here>
async function scheduleTask(task: TaskOpts) {
  const restateClient = restate.connect({ url: RESTATE_URL });

  // <mark_1>
  const taskHandle = await restateClient
    .serviceSendClient<AsyncTaskService>({ name: "taskWorker" })
    .runTask(
      task,
      // <mark_2>
      SendOpts.from({ idempotencyKey: "dQw4w9WgXcQ", delay: 1000 })
      // </mark_2>
    );
  // </mark_1>

  // await the handler's result
  // <mark_3>
  const result = await restateClient.result(taskHandle);
  // </mark_3>
}

// <mark_4>
async function attachToTask(taskHandle: string) {
  const rs = restate.connect({ url: RESTATE_URL });
  const result = await rs.result<string>(JSON.parse(taskHandle));
}
// </mark_4>
// <end_here>
