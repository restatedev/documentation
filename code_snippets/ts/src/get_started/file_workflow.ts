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
      ctx
        .serviceSendClient(NotificationService)
        .sendNotification({
          employeeId: req.employeeId,
          message: "Please approve",
        });

      // Wait for approval or timeout. On timeout, send reminder.
      const approvalPromise = ctx.promise("approval");
      while (true) {
        const outcome = await CombineablePromise.any([
          approvalPromise.get(),
          ctx.sleep(24 * 60 * 60 * 1000),
        ]);

        if (await approvalPromise.peek() == undefined) {
          // Send a reminder
          ctx
            .serviceSendClient(NotificationService)
            .sendNotification({
              employeeId: req.employeeId,
              message: "Reminder: Please approve",
            });
        } else if (await approvalPromise.peek() == true) {
          processFile(req.fileUrl)
          return
        }
      }
    },

    evaluate: async (ctx: restate.WorkflowSharedContext, approved: boolean) => {
      await ctx.promise("approval").resolve(approved);
    },
  },
});

restate.endpoint().bind(fileWorkflow).listen();
// <end_here>

function processFile(task: any) {
  return [];
}

const NotificationService = restate.service({
  name: "NotificationService",
  handlers: {
    sendNotification: async (
      ctx: restate.Context,
      req: { employeeId: string; message: string }
    ) => {
      // Send a notification to the user
    },
  },
});
