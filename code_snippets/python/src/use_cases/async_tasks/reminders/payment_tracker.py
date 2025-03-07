from datetime import timedelta
from typing import TypedDict

import restate
from restate import VirtualObject, ObjectContext


class StripeEvent(TypedDict):
    id: str


# <start_here>
payment_tracker = VirtualObject("PaymentTracker") # one instance per invoice ID


# Stripe sends us webhook events for invoice payment attempts
# <mark_1>
@payment_tracker.handler()
async def on_payment_success(ctx: ObjectContext, event: StripeEvent):
    # </mark_1>
    # <mark_3>
    ctx.set("paid", True)
    # </mark_3>


# <mark_1>
@payment_tracker.handler()
async def on_payment_failed(ctx: ObjectContext, event: StripeEvent):
    # </mark_1>
    # <mark_3>
    if await ctx.get("paid"):
        return
    # </mark_3>

    reminder_count = await ctx.get("reminder_count") or 0
    if reminder_count < 3:
        ctx.set("reminder_count", reminder_count + 1)
        await ctx.run("send_reminder", lambda: send_reminder_email(event))

        # Schedule next reminder via a delayed self call
        # <mark_2>
        ctx.object_send(
            on_payment_failed, # this handler
            ctx.key(), # this object invoice id
            event,
            send_delay=timedelta(days=1))
    # </mark_2>
    else:
        # <mark_2>
        await ctx.run("escalate", lambda: escalate_to_human(event))
        # </mark_2>
# <end_here>

app = restate.app([payment_tracker])


def send_reminder_email(event):
    pass


def escalate_to_human(event):
    pass
