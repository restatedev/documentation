from typing import List

import restate
from pydantic import BaseModel
from restate import VirtualObject, ObjectContext
from restate.exceptions import TerminalError


class LocationUpdate(BaseModel):
    location: str
    timestamp: str


class PackageInfo(BaseModel):
    final_destination: str
    locations: List[LocationUpdate] = []


# <start_here>
# <mark_2>
package_tracker = VirtualObject("package-tracker")
# </mark_2>


# <mark_3>
# <mark_2>
@package_tracker.handler()
async def register_package(ctx: ObjectContext, package_info: PackageInfo):
    # </mark_2>
    # </mark_3>
    # <mark_1>
    ctx.set("package-info", package_info.model_dump())
    # </mark_1>


# <mark_3>
# <mark_2>
@package_tracker.handler()
async def update_location(ctx: ObjectContext, location_update: LocationUpdate):
    # </mark_2>
    # </mark_3>
    # <mark_1>
    package_info = await ctx.get("package-info")
    # </mark_1>
    if package_info is None:
        raise TerminalError(f"Package {ctx.key()} not found")

    locations = package_info.get("locations", [])
    locations.append(location_update.model_dump())
    package_info["locations"] = locations

    # <mark_1>
    ctx.set("package-info", package_info)
    # </mark_1>


# <mark_3>
# <mark_2>
@package_tracker.handler()
async def get_package_info(ctx: ObjectContext):
    # </mark_2>
    # </mark_3>
    # <mark_1>
    return await ctx.get("package-info")
    # </mark_1>


app = restate.app(services=[package_tracker])
# <end_here>
