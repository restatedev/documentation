import * as restate from "@restatedev/restate-sdk-clients";
import {SignUpWorkflow} from "./signup";
type User = {id: string, email: string};


async function signUpUser(user: User){
    // <start_submit>
    // import * as restate from "@restatedev/restate-sdk-clients";
    const rs = restate.connect({url: "http://localhost:8080"});
    await rs.workflowClient<SignUpWorkflow>({name: "signup"}, "someone")
        .workflowSubmit({email: user.email});
    // <end_submit>

    // <start_query>
    const status = await rs
        .workflowClient<SignUpWorkflow>({name: "signup"}, "someone")
        .getStatus();
    // <end_query>

    // <start_attach>
    const result = await rs
        .workflowClient<SignUpWorkflow>({name: "signup"}, "someone")
        .workflowAttach();
    // <end_attach>

}
