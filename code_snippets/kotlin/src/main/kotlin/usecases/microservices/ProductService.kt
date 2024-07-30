package usecases.microservices

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.kotlin.ObjectContext

@VirtualObject
class ProductService {

    @Handler
    suspend fun reserve(ctx: ObjectContext): Boolean {
        return true;
    }
}