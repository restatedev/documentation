import * as restate from "@restatedev/restate-sdk";
import {handlers, ObjectContext, ObjectSharedContext, TerminalError} from "@restatedev/restate-sdk";
import shared = handlers.object.shared;

// <start_here>
// <mark_2>
const packageTracker = restate.object({
    name: "package-tracker",
    // </mark_2>
    handlers: {
        // <mark_2>
        // <mark_3>
        registerPackage: async (ctx: ObjectContext, packageInfo: PackageInfo) => {
            // </mark_2>
            // </mark_3>
            // <mark_1>
            ctx.set("package-info", packageInfo);
            // </mark_1>
        },

        // <mark_3>
        // <mark_2>
        updateLocation: async (ctx: ObjectContext, locationUpdate: LocationUpdate) => {
            // </mark_2>
            // </mark_3>
            // <mark_1>
            const packageInfo = await ctx.get<PackageInfo>("package-info");
            // </mark_1>
            if (!packageInfo) {
                throw new TerminalError(`Package not found`);
            }

            (packageInfo.locations ??= []).push(locationUpdate);
            // <mark_1>
            ctx.set("package-info", packageInfo);
            // </mark_1>
        },

        // <mark_3>
        // <mark_2>
        getPackageInfo: shared((ctx: ObjectSharedContext) =>
            // </mark_2>
            // </mark_3>
            // <mark_1>
            ctx.get<PackageInfo>("package-info")),
            // </mark_1>
    },
});

restate.endpoint().bind(packageTracker).listen();
// <end_here>

type PackageInfo = {
    finalDestination: string;
    locations?: LocationUpdate[];
};

type LocationUpdate = {
    timestamp: string;
    location: string;
};