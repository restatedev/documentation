package develop;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.common.TerminalException;
import greeter.generated.GreeterRestate;

import static greeter.generated.GreeterProto.*;

public class ErrorHandling extends GreeterRestate.GreeterRestateImplBase {

    @Override
    public GreetResponse greet(ObjectContext ctx, GreetRequest request) {

        // <start_here>
        // Inside your handler throw terminal errors with a code and message as follows:
        throw new TerminalException(TerminalException.Code.UNKNOWN, "Something went wrong");
        // <end_here>

    }
}
