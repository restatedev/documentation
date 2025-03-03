package usecases.asynctasks.synctoasync;

import static usecases.utils.ExampleStubs.*;

import dev.restate.sdk.SharedWorkflowContext;
import dev.restate.sdk.WorkflowContext;
import dev.restate.sdk.annotation.Shared;
import dev.restate.sdk.annotation.Workflow;
import dev.restate.sdk.common.DurablePromiseKey;
import dev.restate.sdk.serde.jackson.JacksonSerdes;
import develop.workflows.Email;
import usecases.utils.URL;

// <start_here>
@Workflow
public class FileUploadWorkflow {

  private static final DurablePromiseKey<URL> URL_PROMISE =
      DurablePromiseKey.of("url", JacksonSerdes.of(URL.class));

  @Workflow
  public URL run(WorkflowContext ctx) {
    URL url = ctx.run(JacksonSerdes.of(URL.class), () -> createS3Bucket());
    ctx.run(() -> uploadData(url));

    // <mark_1>
    ctx.promiseHandle(URL_PROMISE).resolve(url);
    // </mark_1>
    return url;
  }

  @Shared
  public void getUrlViaEmail(SharedWorkflowContext ctx, Email email) {
    // <mark_1>
    URL url = ctx.promise(URL_PROMISE).awaitable().await();
    // </mark_1>
    ctx.run(() -> sendEmail(url, email));
  }
}
// <end_here>
