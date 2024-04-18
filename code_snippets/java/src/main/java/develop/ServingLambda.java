package develop;

// <start_here>
import dev.restate.sdk.lambda.BaseRestateLambdaHandler;
import dev.restate.sdk.lambda.RestateLambdaEndpointBuilder;

class MyLambdaHandler extends BaseRestateLambdaHandler {
    @Override
    public void register(RestateLambdaEndpointBuilder builder) {
        builder.bind(new Greeter());
    }
}
// <end_here>