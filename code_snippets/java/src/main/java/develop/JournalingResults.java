package develop;

import dev.restate.sdk.Awaitable;
import dev.restate.sdk.Awakeable;
import dev.restate.sdk.Context;
import dev.restate.sdk.JsonSerdes;
import dev.restate.sdk.common.TerminalException;
import java.util.UUID;

class JournalingResults {

  void sideEffect(Context ctx) {

    // <start_side_effect>
    String output = ctx.run(JsonSerdes.STRING, () -> doDbRequest());
    // <end_side_effect>

    var paymentClient = new PaymentClient();
    String txId = "";
    int amount = 1;

    // <start_retry_settings>
    ctx.run(
        JsonSerdes.BOOLEAN,
        () -> {
          boolean result = paymentClient.call(txId, amount);
          if (result) {
            // withClass highlight-line
            throw new IllegalStateException("Payment failed");
          } else {
            return result;
          }
        });
    // <end_retry_settings>

    // <start_terminal>
    try {
      ctx.run(
          JsonSerdes.BOOLEAN,
          () -> {
            boolean result = paymentClient.call(txId, amount);
            if (result) {
              // withClass highlight-line
              throw new TerminalException(
                  TerminalException.INTERNAL_SERVER_ERROR_CODE, "Payment failed");
            } else {
              return result;
            }
          });
    } catch (TerminalException e) {
      // handle terminal error
    }
    // <end_terminal>

    Awakeable<Boolean> a1 = ctx.awakeable(JsonSerdes.BOOLEAN);
    Awakeable<Boolean> a2 = ctx.awakeable(JsonSerdes.BOOLEAN);
    Awakeable<Boolean> a3 = ctx.awakeable(JsonSerdes.BOOLEAN);

    // <start_combine_all>
    Awaitable.all(a1, a2, a3).await();
    // <end_combine_all>

    // <start_combine_any>
    boolean res = (boolean) Awaitable.any(a1, a2, a3).await();
    // <end_combine_any>

    // <start_uuid>
    UUID uuid = ctx.random().nextUUID();
    // <end_uuid>

    // <start_random_nb>
    int value = ctx.random().nextInt();
    // <end_random_nb>
  }

  private String doDbRequest() {
    return "";
  }
}

class PaymentClient {
  public boolean call(String txId, int amount) {
    return true;
  }
}
