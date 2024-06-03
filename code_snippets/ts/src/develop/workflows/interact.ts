import * as clients from "@restatedev/restate-sdk-clients";
import {SignUpWorkflow} from "./signup";

const rs = clients.connect({url: "http://localhost:8080"});
const signUpWorkflow: SignUpWorkflow = {name: "signup"};

async function waitForResult(userId: string){
    // withClass highlight-line
    await rs.workflowClient(signUpWorkflow, userId).workflowAttach();
}

async function getResult(userId: string){
    // withClass highlight-line
    const output = await rs.workflowClient(signUpWorkflow, userId).workflowOutput();

    if(output.ready) {
        return {status: "DONE", result: output.result};
    }
    return {status: "IN_PROGRESS"};
}
