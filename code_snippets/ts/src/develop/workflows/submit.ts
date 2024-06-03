import * as clients from "@restatedev/restate-sdk-clients";
import {SignUpWorkflow} from "./signup";
type User = {id: string, email: string};

const rs = clients.connect({url: "http://localhost:8080"});
const signUpWorkflow: SignUpWorkflow = {name: "signup"};

async function signUpUser(user: User){
    await rs.workflowClient(signUpWorkflow, user.id)
        .workflowSubmit({email: user.email});
}
