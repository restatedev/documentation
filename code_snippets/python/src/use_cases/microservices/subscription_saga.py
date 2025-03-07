import uuid

import restate
from pydantic import BaseModel
from restate import Service, Context
from restate.exceptions import TerminalError


class SubscriptionRequest(BaseModel):
    user_id: str
    credit_card: str
    subscriptions: list[str]


# <start_here>
subscription_saga = Service("SubscriptionSaga")


@subscription_saga.handler()
async def add(ctx: Context, req: SubscriptionRequest):
    # <mark_1>
    compensations = []
    # </mark_1>

    try:
        payment_id = await ctx.run("payment id", lambda: str(uuid.uuid4()))

        # <mark_1>
        compensations.append(lambda: remove_recurring_payment(payment_id))
        # </mark_1>
        # <mark_1> green
        await ctx.run("recurring payment",
                            lambda: create_recurring_payment(req.credit_card, payment_id))
        # </mark_1>

        for subscription in req.subscriptions:
            # <mark_1>
            compensations.append(lambda: remove_subscription(req.user_id, subscription))
            # </mark_1>
            # <mark_1> green
            await ctx.run("subscription",
                      lambda: create_subscription(req.user_id, subscription))
            # </mark_1>

    except TerminalError as e:
        # <mark_2>
        for compensation in reversed(compensations):
            await ctx.run("run compensation", compensation)
            # </mark_2>
        raise e

app = restate.app([subscription_saga])
# <end_here>

def create_recurring_payment(credit_card, payment_id):
    return None


def remove_recurring_payment(payment_id):
    pass


def create_subscription(user_id, subscription):
    return None

def remove_subscription(user_id, subscription):
    return None