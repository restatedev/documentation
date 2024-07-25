import * as clients from "@restatedev/restate-sdk-clients";
import { SignUpWorkflow, User } from "./signup_workflow";

async function submit(user: User) {
  // <start_here>
  // import * as clients from "@restatedev/restate-sdk-clients";
  const rs = clients.connect({ url: "http://localhost:8080" });
  // mark
  await rs
    // mark
    .workflowClient<SignUpWorkflow>({ name: "sign-up-workflow" }, user.id)
    // mark
    .workflowSubmit(user);

  // do something else, with workflow running in the background

  // attach back to the workflow
  // mark
  const result = await rs
    // mark
    .workflowClient<SignUpWorkflow>({ name: "sign-up-workflow" }, user.id)
    // mark
    .workflowAttach();
  // <end_here>
}
