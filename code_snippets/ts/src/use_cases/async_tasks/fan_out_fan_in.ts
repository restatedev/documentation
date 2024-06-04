import * as restate from "@restatedev/restate-sdk";
import { Context, CombineablePromise } from "@restatedev/restate-sdk";

// <start_here>
const workerService = restate.service({
    name: "worker",
    handlers: {
        run: async (ctx: Context, task: Task) => {
            // run the first step of the work, creating a set of subtasks
            const subtasks: SubTask[] = await ctx.run("first step",
                () => process(task));

            const subtaskResults: CombineablePromise<SubTaskResult>[] = [];
            for (const subtask of subtasks) {
                const subResult = ctx.serviceClient(workerService).runSubtask(subtask);
                subtaskResults.push(subResult);
            }

            const results: SubTaskResult[] = await CombineablePromise
                .all(subtaskResults);
            return aggregate(results);
        },

        runSubtask: async (ctx: Context, subtask: SubTask) => {
            // Processing logic goes here ...
            // Can be moved to a separate service to scale independently
        }
    }
});

export const handler = restate.endpoint().bind(workerService).lambdaHandler();

// <end_here>

// ----------------------- Stubs to please the compiler -----------------------

type Task = {}
type Result = {}

type SubTask = { }
type SubTaskResult = void

async function process(task: Task): Promise<SubTask[]> {
    return [];
}

async function aggregate(packages: SubTaskResult[]): Promise<Result> {
    return {};
}