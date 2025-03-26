package develop;

// <start_here>
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.lambda.BaseRestateLambdaHandler;

class MyLambdaHandler extends BaseRestateLambdaHandler {
  @Override
  public void register(Endpoint.Builder builder) {
    builder.bind(new MyService()).bind(new MyVirtualObject());
  }
}
// <end_here>
