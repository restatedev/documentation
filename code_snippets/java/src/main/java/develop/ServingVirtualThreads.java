package develop;

import dev.restate.sdk.HandlerRunner;
import dev.restate.sdk.endpoint.Endpoint;
import java.util.concurrent.Executors;

class ServingVirtualThreads {
  public void virtualThreads(Endpoint.Builder builder) {
    // <start_here>
    builder.bind(
        new Greeter(),
        HandlerRunner.Options.withExecutor(Executors.newVirtualThreadPerTaskExecutor()));
    // <end_here>
  }
}
