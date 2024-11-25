from typing import List

import restate
from pydantic import BaseModel
from restate import VirtualObject, ObjectContext
from restate.exceptions import TerminalError


class Permission(BaseModel):
    role: str


class Update(BaseModel):
    user_id: str
    role: str
    permissions: List[Permission]


def get_current_role(user_id):
    pass


def apply_user_role(user_id, role):
    pass


def apply_permission(user_id, permission):
    pass


async def rollback(ctx, user_id, previous_role, previous_permissions):
    pass


# <start_here>
# <mark_1>
role_updater = VirtualObject("roleUpdater")
# </mark_1>


# <mark_1>
# <mark_2>
@role_updater.handler()
async def update(ctx: ObjectContext, req: Update) -> bool:

    # Persist current role, then apply new role
    # </mark_2>
    # </mark_1>
    # <mark_3>
    previous_role = await ctx.run("current role",
                                  lambda: get_current_role(req.user_id))
    await ctx.run("apply role",
                  lambda: apply_user_role(req.user_id, req.role))
    # </mark_3>

    # Apply permissions sequentially. Rollback if any fails
    previous_permissions: List[Permission] = []
    for permission in req.permissions:
        # <mark_4>
        try:
            # <mark_3>
            previous = await ctx.run("apply permissions",
                                     lambda: apply_permission(req.user_id, permission))
            # </mark_3>
            previous_permissions.append(previous)
        except TerminalError as err:
            await rollback(ctx, req.user_id, previous_role, previous_permissions)
            raise err
        # </mark_4>

    return True
# <end_here>

app = restate.app([role_updater])