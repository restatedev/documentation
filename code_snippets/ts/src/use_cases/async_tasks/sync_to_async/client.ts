import * as restate from "@restatedev/restate-sdk";
import * as clients from "@restatedev/restate-sdk-clients";
import * as readline from "readline";
import {DataPreparationService} from "./data_preparation_service";

const RESTATE_URL = process.env.RESTATE_URL ?? "http://localhost:8080";
// Client:
//
// The client calls the data preparation workflow and awaits the result for
// a while. If the workflow doesn't complete within that time, it signals the
// workflow to send an email instead.

// <start_here>
async function downloadData(userId: string) {
    const workflowId = userId;

    // connect to the Restate server and create a client for the data preparation workflow
    const dataPrep = clients.connect({ url: RESTATE_URL })
        .workflowClient<DataPreparationService>({ name: "dataPreparation" }, workflowId);

    // kick off a new data preparation workflow. this is idempotent per workflow-id
    await dataPrep.workflowSubmit({ userId });

    // wait for the result for 30 secs
    const result = await withTimeout(dataPrep.workflowAttach(), 30_000);

    // if it takes longer, rewire the workflow to send an email instead
    if (result === Timeout) {
        const email = await readLine("This takes longer, give us an email, we'll mail you the link: ");
        await dataPrep.resultAsEmail({ email });
        return;
    }

    // if returns within 30 secs, process directly
}
// <end_here>

const Timeout = Symbol("Timeout")

function withTimeout<T>(promise: Promise<T>, millis: number): Promise<T | typeof Timeout> {
    const timeoutPromise = new Promise<typeof Timeout>((resolve) => setTimeout(resolve, millis, Timeout));
    return Promise.race([promise, timeoutPromise]);
}

async function readLine(prompt: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise<string>(resolve => rl.question(prompt, resolve)).finally(() => rl.close());
}

