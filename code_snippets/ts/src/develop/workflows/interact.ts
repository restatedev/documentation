import * as clients from "@restatedev/restate-sdk-clients";
import {SignUpWorkflow} from "./signup";



async function retrieveResult(){

    // <start_here>
    const signUpWorkflow: SignUpWorkflow = {name: "signup"};
    const rs = clients.connect({url: "http://localhost:8080"});
    // withClass(1:2) highlight-line
    await rs.workflowClient(signUpWorkflow, "someone")
        .workflowAttach();
    // <end_here>

}
