import { TerminalError } from "@restatedev/restate-sdk";
import * as restate from "@restatedev/restate-sdk";

const service = restate.service({
  name: "ErrorHandling",
  handlers: {
    greet: async (ctx: restate.Context, name: string) => {
      // <start_here>
      throw new TerminalError("Something went wrong.", { errorCode: 500 });
      // <end_here>
    },
  },
});
