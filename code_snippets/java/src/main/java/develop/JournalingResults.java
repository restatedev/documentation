package develop;

import dev.restate.sdk.Awakeable;
import dev.restate.sdk.Context;
import dev.restate.sdk.DurableFuture;
import dev.restate.sdk.Select;
import java.util.UUID;

class JournalingResults {

  void sideEffect(Context ctx) {

    // <start_side_effect>
    String output = ctx.run(String.class, () -> doDbRequest());
    // <end_side_effect>

    Awakeable<Boolean> a1 = ctx.awakeable(Boolean.class);
    Awakeable<Boolean> a2 = ctx.awakeable(Boolean.class);
    Awakeable<Boolean> a3 = ctx.awakeable(Boolean.class);

    // <start_combine_all>
    DurableFuture.all(a1, a2, a3).await();
    // <end_combine_all>

    // <start_combine_any>
    boolean res = Select.<Boolean>select().or(a1).or(a2).or(a3).await();
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
