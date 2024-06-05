import * as restate from "@restatedev/restate-sdk-clients";
import { SendOpts } from "@restatedev/restate-sdk-clients";
import {AsyncTaskService, TaskOpts} from "./async_task_service";

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
async function submitAndAwaitTask(task: TaskOpts) {
    const rs = restate.connect({ url: RESTATE_URL });

    const taskHandle = await rs
        .serviceSendClient<AsyncTaskService>({ name: "taskWorker" })
        .runTask(
            task,
            SendOpts.from({ idempotencyKey: "dQw4w9WgXcQ" })
        );

    // await the handler's result
    const result = await rs.result(taskHandle);
}

async function attachToTask(taskHandle: string) {
    const rs = restate.connect({ url: RESTATE_URL });
    const result2 = await rs.result<string>(JSON.parse(taskHandle));
}

// <end_here>