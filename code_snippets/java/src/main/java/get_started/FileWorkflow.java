package get_started;

import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.WorkflowContext;
import dev.restate.sdk.annotation.Workflow;
import dev.restate.sdk.common.DurablePromiseKey;

import java.time.Duration;
import java.util.concurrent.TimeoutException;

@Workflow
public class FileWorkflow {

    DurablePromiseKey<Boolean> APPROVAL =
            DurablePromiseKey.of("approval", JsonSerdes.BOOLEAN);

    @Workflow
    public void run(WorkflowContext ctx, FileUpload file) {

        NotificationServiceClient.fromContext(ctx)
                .send()
                .notify(new Notification(file.getUserId(), "Please review file"));

        while(approval) {
            try {
                clickSecret = ctx.promise(APPROVAL).awaitable().await(Duration.ofSeconds(10));
            } catch (TimeoutException e) {
                ctx.run("reminder sent",
                        () -> sendReminder(req.getEmail(), secret));
            }
        }



    }
}
