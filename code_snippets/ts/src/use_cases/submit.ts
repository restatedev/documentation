import * as clients from "@restatedev/restate-sdk-clients";
import {SignUpWorkflow, User} from "./signup_workflow";

const rs = clients.connect({url: "http://localhost:8080"});
const signUpWorkflow: SignUpWorkflow = {name: "sign-up-workflow"};

async function submit(user: User){
    // withClass(1:2) highlight-line
    await rs.workflowClient(signUpWorkflow, user.id)
        .workflowSubmit(user);

    // do something else, with workflow running in the background

    // attach back to the workflow
    // withClass(1:2) highlight-line
    const success = await rs.workflowClient(signUpWorkflow, user.id)
        .workflowAttach();
}
