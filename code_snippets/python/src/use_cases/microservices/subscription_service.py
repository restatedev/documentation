import uuid

import restate
from pydantic import BaseModel
from restate import Service, Context


class SubscriptionRequest(BaseModel):
    user_id: str
    credit_card: str
    subscriptions: list[str]


# <start_here>
# <mark_1>
subscription_service = Service("SubscriptionService")
# </mark_1>


# <mark_1>
@subscription_service.handler()
async def add(ctx: Context, req: SubscriptionRequest):
    # </mark_1>
    payment_id = await ctx.run("payment id", lambda: str(uuid.uuid4()))

    # <mark_2>
    pay_ref = await ctx.run(
        "recurring payment",
        lambda: create_recurring_payment(req.credit_card, payment_id),
    )
    # </mark_2>

    for subscription in req.subscriptions:
        # <mark_2>
        await ctx.run(
            "subscription",
            lambda: create_subscription(req.user_id, subscription, pay_ref),
        )
        # </mark_2>


app = restate.app([subscription_service])
# <end_here>


def create_recurring_payment(credit_card, payment_id):
    return None


def create_subscription(user_id, subscription, pay_ref):
    return None
