import * as restate from "@restatedev/restate-sdk-clients";
import * as readline from "readline";
import { DataPrepService } from "./data_preparation_service";

const RESTATE_URL = process.env.RESTATE_URL ?? "http://localhost:8080";
// Client:
//
// The client calls the data preparation workflow and awaits the result for
// a while. If the workflow doesn't complete within that time, it signals the
// workflow to send an email instead.

// <start_here>
const rs = restate.connect({ url: RESTATE_URL });
const dataPrepService: DataPrepService = { name: "dataPrep" };

async function downloadData(user: { id: string, email: string }) {
  // <mark_1>
  const dataPrep = rs.workflowClient(dataPrepService, user.id);
  // </mark_1>

  // <mark_2>
  await dataPrep.workflowSubmit();
  // </mark_2>

  // <mark_3>
  const result = await withTimeout(dataPrep.workflowAttach(), 30_000);
  // </mark_3>

  // <mark_4>
  if (result === Timeout) {
    // Hit timeout... Mail us the link later
    await dataPrep.resultAsEmail({ email: user.email });
    return;
  }
  // </mark_4>
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
