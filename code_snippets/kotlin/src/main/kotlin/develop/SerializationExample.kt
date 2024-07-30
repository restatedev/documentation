package develop

import dev.restate.sdk.kotlin.KtSerdes

class SerializationExample {
  data class MyDataClass(val a: Int)

  // <end_statekey>
  private fun someFn() {
    // <start_here>
    KtSerdes.json<MyDataClass>()
    // <end_here>
  }
}
