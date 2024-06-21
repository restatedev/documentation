import * as restate from "@restatedev/restate-sdk-clients";
import { SignUpWorkflow } from "./signup";
type User = { id: string; email: string };

async function signUpUser(user: User) {
  // <start_submit>
  // import * as restate from "@restatedev/restate-sdk-clients";
  const rs = restate.connect({ url: "http://localhost:8080" });
  const handle = await rs
    .workflowClient<SignUpWorkflow>({ name: "signup" }, "someone")
    .workflowSubmit({ email: user.email });
  // <end_submit>

  // <start_query>
  const status = await rs
    .workflowClient<SignUpWorkflow>({ name: "signup" }, "someone")
    .getStatus();
  // <end_query>

  // <start_attach>
  // Option 1: attach and wait for result with handle
  const result1 = await rs.result(handle);

  // Option 2: attach and wait for result with workflow ID
  const result2 = await rs
    .workflowClient<SignUpWorkflow>({ name: "signup" }, "someone")
    .workflowAttach();

  // Option 3: peek to check if ready with workflow ID
  const peekOutput = await rs
    .workflowClient<SignUpWorkflow>({ name: "signup" }, "someone")
    .workflowOutput();
  if (peekOutput.ready) {
    const result3 = peekOutput.result;
  }
  // <end_attach>
}
