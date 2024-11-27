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
public class DataPreparationService {

  private static final DurablePromiseKey<URL> URL_PROMISE =
      DurablePromiseKey.of("url", JacksonSerdes.of(URL.class));

  @Workflow
  public URL run(WorkflowContext ctx) {
    // <mark_1>
    URL url = ctx.run(JacksonSerdes.of(URL.class), () -> createS3Bucket());
    ctx.run(() -> uploadData(url));

    // <mark_2>
    ctx.promiseHandle(URL_PROMISE).resolve(url);
    // </mark_2>
    return url;
    // </mark_1>
  }

  @Shared
  public void resultAsEmail(SharedWorkflowContext ctx, Email email) {
    // <mark_2>
    URL url = ctx.promise(URL_PROMISE).awaitable().await();
    // </mark_2>
    ctx.run(() -> sendEmail(url, email));
  }
}
// <end_here>
