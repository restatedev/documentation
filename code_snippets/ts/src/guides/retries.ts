import * as restate from "@restatedev/restate-sdk";

function writeToOtherSystem() {
    return undefined;
}

const service = restate.service({
    name: "MyService",
    handlers: {
        greet: async (ctx: restate.Context, name: string) => {
            // <start_here>
            // <mark_1>
            const myRunRetryPolicy = {
                initialRetryIntervalMillis: 500,
                retryIntervalFactor: 2,
                maxRetryIntervalMillis: 1000,
                maxRetryAttempts: 5,
                maxRetryDurationMillis: 1000,
            }
            // </mark_1>
            await ctx.run(
                "write",
                () => writeToOtherSystem(),
                myRunRetryPolicy
            );
            // <end_here>

            // <start_catch>
            try {
                await ctx.run(
                    "write",
                    () => writeToOtherSystem(),
                    { maxRetryAttempts: 3 }
                );
            } catch (e) {
                if (e instanceof restate.TerminalError) {
                    // Handle the terminal error after retries exhausted
                    // For example, undo previous actions (see sagas guide) and
                    // propagate the error back to the caller
                }
                throw e;
            }
            // <end_catch>
        },
    },
});