package develop

import dev.restate.sdk.testing.BindService
import dev.restate.sdk.testing.RestateTest
import develop.clients.GreeterService

// <start_extension>
@RestateTest
class GreeterTest {

  @BindService val service = GreeterService()

  // Your tests

}
// <end_extension>
