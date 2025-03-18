package develop

import dev.restate.sdk.annotation.CustomSerdeFactory
import dev.restate.sdk.annotation.Service
import dev.restate.sdk.kotlin.serialization.KotlinSerializationSerdeFactory
import kotlinx.serialization.json.Json


// <start_custom>
class MyJsonSerdeFactory : KotlinSerializationSerdeFactory(
  json = Json {
    prettyPrint = true
  }
)
// <end_custom>

// <start_custom_service>
@CustomSerdeFactory(MyJsonSerdeFactory::class)
@Service
internal class ServiceWithCustomSerdeFactory
// <end_custom_service>