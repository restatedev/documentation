import * as clients from "@restatedev/restate-sdk-clients";
import {SignUpWorkflow} from "./signup";
type User = {id: string, email: string};


async function signUpUser(user: User){
    // <start_here>
    // focus(1:5)
    const rs = clients.connect({url: "http://localhost:8080"});
    const signUpWorkflow: SignUpWorkflow = {name: "signup"};

    await rs.workflowClient(signUpWorkflow, user.id)
        .workflowSubmit({email: user.email});
// <end_here>
}
