// --------------- define async task logic as a service handler ---------------

import * as restate from "@restatedev/restate-sdk";
import {Context} from "@restatedev/restate-sdk";

// <start_here>
const asyncTaskService = restate.service({
    name: "taskWorker",
    handlers: {
        // <mark_1>
        runTask: async (ctx: Context, params: TaskOpts) => {
            return someHeavyWork(params);
        }
        // </mark_1>
    }
});

export type AsyncTaskService = typeof asyncTaskService;

const endpoint = restate.endpoint().bind(asyncTaskService).listen(9080);
// <end_here>

// ----------------------- Stubs to please the compiler -----------------------

export type TaskOpts = {}

function someHeavyWork(work: TaskOpts) { return "Work!"}