package develop

import dev.restate.sdk.annotation.CustomSerdeFactory
import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.kotlin.Context
import dev.restate.serde.kotlinx.KotlinSerializationSerdeFactory
import kotlinx.serialization.json.Json

// <start_custom>
class MyJsonSerdeFactory : KotlinSerializationSerdeFactory(json = Json { prettyPrint = true })
// <end_custom>

// <start_custom_service>
@CustomSerdeFactory(MyJsonSerdeFactory::class)
@Service
class ServiceWithCustomSerdeFactory {
  @Handler suspend fun greet(ctx: Context) = "Hello world!"
}
// <end_custom_service>
