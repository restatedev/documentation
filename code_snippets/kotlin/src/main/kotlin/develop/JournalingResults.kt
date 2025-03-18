package develop

import dev.restate.sdk.kotlin.*
import java.util.UUID

internal class SideEffects {
  suspend fun sideEffect(ctx: Context) {
    // <start_side_effect>
    val output: String = ctx.runBlock { doDbRequest() }
    // <end_side_effect>

    val paymentClient = PaymentClient()
    val txId = ""
    val amount = 1

    val a1 = ctx.awakeable<Boolean>()
    val a2 = ctx.awakeable<Boolean>()
    val a3 = ctx.awakeable<Boolean>()

    // <start_combine_all>
    listOf(a1, a2, a3).awaitAll()
    // <end_combine_all>

    // <start_combine_any>
    val resSelect =
        select {
              a1.onAwait { it }
              a2.onAwait { it }
              a3.onAwait { it }
            }
            .await()
    // <end_combine_any>

    // <start_uuid>
    val uuid: UUID = ctx.random().nextUUID()
    // <end_uuid>

    // <start_random_nb>
    val value: Int = ctx.random().nextInt()
    // <end_random_nb>
  }

  private fun doDbRequest(): String {
    return ""
  }
}

internal class PaymentClient {
  fun call(txId: String?, amount: Int): Boolean {
    return true
  }
}
