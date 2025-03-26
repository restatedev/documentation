package usecases.eventprocessing.eventenrichment;

import dev.restate.sdk.ObjectContext;
import dev.restate.sdk.SharedObjectContext;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Shared;
import dev.restate.sdk.annotation.VirtualObject;
import dev.restate.sdk.endpoint.Endpoint;
import dev.restate.sdk.http.vertx.RestateHttpServer;
import dev.restate.sdk.types.StateKey;
import dev.restate.sdk.types.TerminalException;
import usecases.eventprocessing.eventenrichment.types.LocationUpdate;
import usecases.eventprocessing.eventenrichment.types.PackageInfo;

// <start_here>
// <mark_2>
@VirtualObject
public class PackageTracker {
  // </mark_2>

  private static final StateKey<PackageInfo> PACKAGE_INFO =
      StateKey.of("package-info", PackageInfo.class);

  // <mark_3>
  // <mark_2>
  @Handler
  public void registerPackage(ObjectContext ctx, PackageInfo packageInfo) {
    // </mark_2>
    // </mark_3>
    // <mark_1>
    ctx.set(PACKAGE_INFO, packageInfo);
    // </mark_1>
  }

  // <mark_3>
  // <mark_2>
  @Handler
  public void updateLocation(ObjectContext ctx, LocationUpdate locationUpdate) {
    // </mark_2>
    // </mark_3>
    // <mark_1>
    var packageInfo =
        ctx.get(PACKAGE_INFO)
            // </mark_1>
            .orElseThrow(() -> new TerminalException("Package not found"));

    packageInfo.addLocation(locationUpdate);
    // <mark_1>
    ctx.set(PACKAGE_INFO, packageInfo);
    // </mark_1>
  }

  // <mark_3>
  // <mark_2>
  @Shared
  public PackageInfo getPackageInfo(SharedObjectContext ctx) {
    // </mark_2>
    // </mark_3>
    // <mark_1>
    return ctx.get(PACKAGE_INFO)
        // </mark_1>
        .orElseThrow(() -> new TerminalException("Package not found"));
  }

  public static void main(String[] args) {
    RestateHttpServer.listen(Endpoint.bind(new PackageTracker()));
  }
}
// <end_here>
