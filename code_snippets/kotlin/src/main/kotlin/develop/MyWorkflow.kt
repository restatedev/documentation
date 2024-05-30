package develop

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Workflow
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder
import dev.restate.sdk.kotlin.SharedWorkflowContext
import dev.restate.sdk.kotlin.WorkflowContext

// <start_here>
@Workflow
class MyWorkflow {

    @Workflow
    suspend fun run(ctx: WorkflowContext, input: String): String {

        // implement workflow logic here

        return "success"
    }

    @Handler
    suspend fun interactWithWorkflow(ctx: SharedWorkflowContext, input: String) {
        // implement interaction logic here
    }

}

fun main() {
    RestateHttpEndpointBuilder
        .builder()
        .bind(MyWorkflow())
        .buildAndListen()
}
// <end_here>
