from typing import TypedDict

import restate
from restate import Service, Context

from typing import TypedDict, List
import random
import logging


class UserRole(TypedDict):
    roleKey: str
    roleDescription: str


class Permission(TypedDict):
    permissionKey: str
    setting: str


class UpdateRequest(TypedDict):
    userId: str
    role: UserRole
    permissions: List[Permission]


def apply_user_role(user_id: str, user_role: UserRole) -> bool:
    maybe_crash(0.3)
    logging.info(f'>>> Applied role {user_role["roleKey"]} for user {user_id}')
    return True


def apply_permission(user_id: str, permission: Permission) -> None:
    maybe_crash(0.2)
    logging.info(
        f'>>> Applied permission {permission["permissionKey"]}:{permission["setting"]} for user {user_id}'
    )


def maybe_crash(probability: float) -> None:
    if random.random() < probability:
        raise Exception("Simulated crash")


# <start_here>
role_update_service = Service("RoleUpdateService")


# <mark_2>
@role_update_service.handler()
async def apply_role_update(ctx: Context, update: UpdateRequest):
    # </mark_2>

    # <mark_1>
    success = await ctx.run(
        "role", lambda: apply_user_role(update["userId"], update["role"])
    )
    # </mark_1>
    # <mark_3>
    if not success:
        return
    # </mark_3>

    # <mark_3>
    for permission in update["permissions"]:
        # </mark_3>
        # <mark_1>
        await ctx.run(
            "permission", lambda: apply_permission(update["userId"], permission)
        )
        # </mark_1>


app = restate.app([role_update_service])
# <end_here>
