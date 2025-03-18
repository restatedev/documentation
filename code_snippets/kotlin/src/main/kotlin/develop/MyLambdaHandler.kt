package develop

// <start_here>
import dev.restate.sdk.endpoint.Endpoint
import dev.restate.sdk.lambda.BaseRestateLambdaHandler

class MyLambdaHandler : BaseRestateLambdaHandler() {
  override fun register(builder: Endpoint.Builder) {
    builder.bind(MyService()).bind(MyVirtualObject())
  }
}
// <end_here>
