import random

from pydantic import BaseModel
from restate import VirtualObject
from restate.exceptions import TerminalError


class UserUpdateEvent(BaseModel):
    profile: str
    permissions: str
    resources: str


NOT_READY = "NOT_READY"


async def update_profile(profile: str, token: str = None) -> str:
    return profile + "-id" if random.random() >= 0.8 else NOT_READY


async def set_permissions(user_id: str, permissions: str, token: str = None) -> str:
    return permissions


async def provision_resources(user: str, role: str, resources: str):
    pass


def verify_event(request: UserUpdateEvent) -> UserUpdateEvent:
    if request.get("profile") and request.get("permissions") and request.get("resources"):
        return request
    else:
        raise TerminalError("Incomplete event")


# <start_here>
user_updates = VirtualObject("userUpdates")


# <mark_1>
@user_updates.handler()
async def update(ctx, event: UserUpdateEvent) -> None:
    # </mark_1>
    # <mark_3>
    user_id = await ctx.run("update profile",
                            lambda: update_profile(event.profile))
    # </mark_3>
    # <mark_4>
    while user_id == NOT_READY:
        # <mark_2>
        await ctx.sleep(5000)
        # </mark_2>
        # <mark_3>
        user_id = await ctx.run("update profile",
                                lambda: update_profile(event.profile))
        # </mark_3>

    # <mark_3>
    role_id = await ctx.run("set permissions",
                            lambda: set_permissions(user_id, event.permissions))
    await ctx.run("provision resources",
                  lambda: provision_resources(user_id, role_id, event.resources))
    # </mark_3>
    # </mark_4>
# <end_here>
