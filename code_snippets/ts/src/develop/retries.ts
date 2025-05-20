import * as restate from "@restatedev/restate-sdk";
import { RestatePromise } from "@restatedev/restate-sdk";
import { MyService } from "./my_service";
import { RunOptions } from "@restatedev/restate-sdk/dist/esm/src/context";

function writeToOtherSystem() {
  return undefined;
}

const service = restate.service({
  name: "MyService",
  handlers: {
    greet: async (ctx: restate.Context, name: string) => {
      // <start_here>
      try {
        // <mark_1>
        const myRunRetryPolicy = {
          initialRetryIntervalMillis: 500,
          retryIntervalFactor: 2,
          maxRetryIntervalMillis: 1000,
          maxRetryAttempts: 5,
          maxRetryDurationMillis: 1000,
        };
        // </mark_1>
        await ctx.run("write", () => writeToOtherSystem(), myRunRetryPolicy);
      } catch (e) {
        if (e instanceof restate.TerminalError) {
          // Handle the terminal error after retries exhausted
          // For example, undo previous actions (see sagas guide) and
          // propagate the error back to the caller
        }
        throw e;
      }
      // <end_here>
    },
  },
});

const paymentClient = {
  call: (txId: string, amt: number) => {
    return { error: "", isSuccess: false };
  },
};
