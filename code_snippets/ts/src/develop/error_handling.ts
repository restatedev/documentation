import { TerminalError, ErrorCodes } from "@restatedev/restate-sdk";
import * as restate from "@restatedev/restate-sdk";

const router = restate.router({
    greet: async (ctx: restate.Context, name: string) => {
        // <start_here>
        // Inside your handler throw terminal errors via:
        throw new TerminalError("Something went wrong.", { errorCode: ErrorCodes.INTERNAL })
        // <end_here>
    },
})
