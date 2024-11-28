from datetime import timedelta

import restate
from pydantic import BaseModel
from restate import ObjectContext, VirtualObject
from typing import Optional, List

from restate.exceptions import TerminalError


class UserProfile(BaseModel):
    id: str
    name: str
    email: str
    features: Optional[List[str]]


def send(key: str, user: Optional[UserProfile]):
    pass


# <start_here>
event_enricher = VirtualObject("profile")


# <mark_2>
@event_enricher.handler()
async def process_name(ctx: ObjectContext, name: str):
    # </mark_2>
    # <mark_1>
    ctx.set("user", {"name": name})
    # </mark_1>
    # Schedule a delayed RPC call to emit the event
    # <mark_3>
    ctx.object_send(emit, ctx.key(), arg=None, send_delay=timedelta(seconds=60))
    # </mark_3>


# <mark_2>
@event_enricher.handler()
async def process_email(ctx: ObjectContext, email: str):
    # </mark_2>
    # <mark_1>
    user_event = await ctx.get("user")
    # </mark_1>
    if user_event is None:
        raise TerminalError("No user found")

    user_event["email"] = email
    # <mark_1>
    ctx.set("user", user_event)
    # </mark_1>


# <mark_2>
@event_enricher.handler()
async def emit(ctx: ObjectContext):
    # </mark_2>
    # <mark_1>
    user = await ctx.get("user")
    # </mark_1>
    send(ctx.key(), user)
    # <mark_1>
    ctx.clear_all()
    # </mark_1>
# <end_here>

app = restate.app([event_enricher])