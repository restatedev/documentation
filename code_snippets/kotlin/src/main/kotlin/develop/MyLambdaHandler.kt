package develop

// <start_here>
import dev.restate.sdk.lambda.BaseRestateLambdaHandler
import dev.restate.sdk.lambda.RestateLambdaEndpointBuilder

class MyLambdaHandler : BaseRestateLambdaHandler() {
  override fun register(builder: RestateLambdaEndpointBuilder) {
    builder.bind(MyService()).bind(MyVirtualObject())
  }
}
// <end_here>
