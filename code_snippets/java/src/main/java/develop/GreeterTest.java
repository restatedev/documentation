package develop;

import dev.restate.sdk.testing.*;
import develop.clients.GreeterService;

// <start_extension>
@RestateTest
class GreeterTest {

  @BindService GreeterService service = new GreeterService();

  // Your tests

}
// <end_extension>
