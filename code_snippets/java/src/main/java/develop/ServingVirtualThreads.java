package develop;

import dev.restate.sdk.HandlerRunner;
import dev.restate.sdk.http.vertx.RestateHttpEndpointBuilder;
import java.util.concurrent.Executors;

class ServingVirtualThreads {
  public void virtualThreads(RestateHttpEndpointBuilder builder) {
    // <start_here>
    builder.bind(
        // This is the class generated by the annotation processor
        new GreeterServiceDefinitionFactory().create(new Greeter()),
        new HandlerRunner.Options(Executors.newVirtualThreadPerTaskExecutor()));
    // <end_here>
  }
}
