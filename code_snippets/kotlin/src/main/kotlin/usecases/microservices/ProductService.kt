@file:Suppress("ktlint:standard:filename")

package usecases.microservices

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.kotlin.ObjectContext

@VirtualObject
public class ProductService {

  @Handler
  suspend fun reserve(ctx: ObjectContext): Boolean {
    return true
  }
}
