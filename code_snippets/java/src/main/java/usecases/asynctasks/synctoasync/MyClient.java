package usecases.asynctasks.synctoasync;

import dev.restate.sdk.client.Client;
import develop.workflows.Email;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import usecases.asynctasks.synctoasync.DataPreparationServiceClient.IngressClient;

public class MyClient {
  // <start_here>
  public void downloadData(String userId, Email email) {
    // <mark_1>
    Client rs = Client.connect("http://localhost:8080");
    IngressClient uploadClient = DataPreparationServiceClient.fromClient(rs, userId);
    // </mark_1>
    // <mark_2>
    uploadClient.submit();
    // </mark_2>

    try {
      // <mark_3>
      uploadClient.workflowHandle().attachAsync()
          .orTimeout(30, TimeUnit.SECONDS)
          .join();
      // </mark_3>
      // <mark_4>
    } catch (Exception e) {
      if (e.getCause() instanceof TimeoutException) {
        uploadClient.resultAsEmail(email);
        return;
      }
      throw e;
    }
    // </mark_4>
    // ... process directly ...
  }
  // <end_here>
}
