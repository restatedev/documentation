// <start_full>
import * as restate from "@restatedev/restate-sdk";
import { randomUUID } from "node:crypto";
import { CombineablePromise } from "@restatedev/restate-sdk";

// <start_here>
const fileWorkflow = restate.workflow({
  name: "FileWorkflow",
  handlers: {
    run: async (
      ctx: restate.WorkflowContext,
      req: { employeeId: string; fileUrl: string }
    ) => {
      // Let the notification service request a file review
      // <mark_1>
      ctx.serviceSendClient(NotificationService).notify({
          employeeId: req.employeeId,
          message: "Please approve",
        });
      // </mark_1>

      // Wait for approval or timeout. On timeout, send reminder.
      // <mark_2>
      const approvalPromise = ctx.promise("approval").get();
      // </mark_2>
      let approval = undefined;
      while (true) {
        // <mark_2>
        approval = await CombineablePromise.any([
          approvalPromise,
          // <mark_3>
          ctx.sleep(10 * 1000),
          // </mark_3>
        ]);
        // </mark_2>

        if ( approval == undefined) {
          ctx.serviceSendClient(NotificationService).remind({
            employeeId: req.employeeId,
          });
        } else {
          return (approval == true) ? processFile(req.fileUrl) : "Rejected";
        }
      }
    },

    evaluate: async (ctx: restate.WorkflowSharedContext, approved: boolean) => {
      // <mark_2>
      await ctx.promise("approval").resolve(approved);
      // </mark_2>
    },
  },
});
// <end_here>

function processFile(task: any) {
  // Do the processing
}

const notificationService = restate.service({
  name: "NotificationService",
  handlers: {
    notify: async (
      ctx: restate.Context,
      req: { employeeId: string; message: string }
    ) => {
      // Send a notification to the user
    },
    remind: async (
      ctx: restate.Context,
      req: { employeeId: string;}
    ) => {
      // Send a notification to the user
    },
  },
});

export const NotificationService: typeof notificationService = { name: "NotificationService" };

restate.endpoint().bind(fileWorkflow).bind(notificationService).listen();
// <end_full>
