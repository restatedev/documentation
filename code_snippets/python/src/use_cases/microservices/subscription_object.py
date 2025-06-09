import uuid

import restate
from pydantic import BaseModel
from restate import VirtualObject, ObjectContext


class SubscriptionRequest(BaseModel):
    user_id: str
    credit_card: str
    subscription: str


# <start_here>
subscription_object = VirtualObject("SubscriptionService")


# <mark_2>
@subscription_object.handler()
async def add(ctx: ObjectContext, req: SubscriptionRequest):
    # </mark_2>
    payment_id = await ctx.run("payment id", lambda: str(uuid.uuid4()))

    # <mark_1>
    ctx.set("subscription", "awaiting_payment")
    # </mark_1>
    success = await ctx.run(
        "recurring payment",
        lambda: create_recurring_payment(req.credit_card, payment_id),
    )
    if not success:
        # <mark_1>
        ctx.set("subscription", "payment_failed")
        # </mark_1>
        return

    # <mark_1>
    ctx.set("subscription", "creating_subscription")
    # </mark_1>
    await ctx.run("subscription", lambda: create_subscription(req.user_id, req.subscription))
    # <mark_1>
    ctx.set("subscription", "created")
    # </mark_1>


# <mark_3>
aws_lambda_handler = restate.app([subscription_object])
# </mark_3>
# <end_here>


def create_recurring_payment(credit_card, payment_id):
    return None


def create_subscription(user_id, subscription):
    return None
