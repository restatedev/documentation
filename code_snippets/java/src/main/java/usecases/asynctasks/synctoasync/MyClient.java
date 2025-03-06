package usecases.asynctasks.synctoasync;

import dev.restate.sdk.client.Client;
import develop.workflows.Email;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import usecases.asynctasks.synctoasync.FileUploadWorkflowClient.IngressClient;
import usecases.utils.URL;

public class MyClient {
  // <start_here>
  public void uploadFile(String userId, Email email) {

    // <mark_1>
    Client restateClient = Client.connect("http://localhost:8080");
    IngressClient fileUploadClient = FileUploadWorkflowClient.fromClient(restateClient, userId);
    fileUploadClient.submit();
    // </mark_1>

    try {
      // <mark_1>
      URL fileUploadUrl =
            fileUploadClient
              .workflowHandle()
              .attachAsync()
              // break
              .orTimeout(30, TimeUnit.SECONDS)
              .join();
      // </mark_1>

      // ... process directly ...

    } catch (Exception e) {
      // <mark_2>
      if (e.getCause() instanceof TimeoutException) {
        fileUploadClient.getUrlViaEmail(email);
        // </mark_2>
        return;
      }
      throw e;
    }
  }
  // <end_here>
}
