import * as restate from "@restatedev/restate-sdk-clients";
import {FileUploadWorkflow} from "./file_upload_workflow";

const RESTATE_URL = process.env.RESTATE_URL ?? "http://localhost:8080";
// Client:
//
// The client calls the data preparation workflow and awaits the result for
// a while. If the workflow doesn't complete within that time, it signals the
// workflow to send an email instead.

// <start_here>
const restateClient = restate.connect({ url: RESTATE_URL });

async function uploadFile(user: { id: string, email: string }) {
  // <mark_1>
  const workflowClient = restateClient.workflowClient<FileUploadWorkflow>({ name: "FileUploadWorkflow" }, user.id);
  await workflowClient.workflowSubmit();
  // </mark_1>

  // <mark_1>
  const result = await withTimeout(workflowClient.workflowAttach(), 30_000);
  // </mark_1>

  // <mark_2>
  if (result === Timeout) {
    await workflowClient.resultAsEmail({ email: user.email });
    // </mark_2>
    return;
  }

  // ... process directly ...

}
// <end_here>

const Timeout = Symbol("Timeout");

function withTimeout<T>(
  promise: Promise<T>,
  millis: number
): Promise<T | typeof Timeout> {
  const timeoutPromise = new Promise<typeof Timeout>((resolve) =>
    setTimeout(resolve, millis, Timeout)
  );
  return Promise.race([promise, timeoutPromise]);
}
