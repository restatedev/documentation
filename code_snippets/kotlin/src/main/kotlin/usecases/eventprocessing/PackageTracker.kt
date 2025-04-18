package usecases.eventprocessing

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.Shared
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.common.TerminalException
import dev.restate.sdk.http.vertx.RestateHttpServer
import dev.restate.sdk.kotlin.*
import dev.restate.sdk.kotlin.endpoint.endpoint
import kotlinx.serialization.Serializable

// <start_here>
// <mark_2>
@VirtualObject
class PackageTracker {
  // </mark_2>

  companion object {
    private val PACKAGE_INFO = stateKey<PackageInfo>("package-info")
  }

  // <mark_3>
  // <mark_2>
  @Handler
  suspend fun registerPackage(ctx: ObjectContext, packageInfo: PackageInfo) {
    // </mark_2>
    // </mark_3>
    // <mark_1>
    ctx.set(PACKAGE_INFO, packageInfo)
    // </mark_1>
  }

  // <mark_3>
  // <mark_2>
  @Handler
  suspend fun updateLocation(ctx: ObjectContext, locationUpdate: LocationUpdate) {
    // </mark_2>
    // </mark_3>
    // <mark_1>
    val packageInfo =
        ctx.get(PACKAGE_INFO)
            // </mark_1>
            ?: throw TerminalException("Package not found")

    packageInfo.locations.add(locationUpdate)
    // <mark_1>
    ctx.set(PACKAGE_INFO, packageInfo)
    // </mark_1>
  }

  // <mark_3>
  // <mark_2>
  @Shared
  suspend fun getPackageInfo(ctx: SharedObjectContext): PackageInfo {
    // </mark_2>
    // </mark_3>
    // <mark_1>
    return ctx.get(PACKAGE_INFO)
        // </mark_1>
        ?: throw TerminalException("Package not found")
  }
}

fun main() {
  RestateHttpServer.listen(endpoint { bind(PackageTracker()) })
}
// <end_here>

@Serializable
data class PackageInfo(
    val finalDestination: String,
    val locations: MutableList<LocationUpdate> = mutableListOf()
)

@Serializable data class LocationUpdate(val timestamp: String, val location: String)
