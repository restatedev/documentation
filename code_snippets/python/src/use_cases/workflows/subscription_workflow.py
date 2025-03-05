import uuid

import restate
from pydantic import BaseModel
from restate import Workflow, WorkflowContext, WorkflowSharedContext
from restate.exceptions import TerminalError


class SubscriptionRequest(BaseModel):
    user_id: str
    credit_card: str
    subscriptions: list[str]


# <start_here>
subscription_workflow = Workflow("SubscriptionWorkflow")


@subscription_workflow.main()
async def run(ctx: WorkflowContext, req: SubscriptionRequest):
    # <mark_2> orange
    compensations = []
    # </mark_2>

    try:
        payment_id = await ctx.run("payment id", lambda: str(uuid.uuid4()))

        # <mark_2> orange
        compensations.append(lambda: remove_recurring_payment(payment_id))
        # </mark_2>
        # <mark_2> green
        await ctx.run("recurring payment",
                            lambda: create_recurring_payment(req.credit_card, payment_id))
        # </mark_2>
        # <mark_1>
        ctx.set("status", "payment_success");
        # </mark_1>

        for subscription in req.subscriptions:
            # <mark_2> orange
            compensations.append(lambda: remove_subscription(req.user_id, subscription))
            # </mark_2>
            # <mark_2> green
            await ctx.run("subscription",
                      lambda: create_subscription(req.user_id, subscription))
            # </mark_2>
        # <mark_1>
        ctx.set("status", "subscribed");
        # </mark_1>

        # <mark_2> orange
    except TerminalError as e:
        for compensation in reversed(compensations):
            await ctx.run("run compensation", compensation)
            # </mark_2>
        # <mark_1>
        ctx.set("status", "rolled_back");
        # </mark_1>
        raise e


# <mark_3>
aws_lambda_handler = restate.app([subscription_workflow])
# </mark_3>
# <end_here>

def create_recurring_payment(credit_card, payment_id):
    return None


def remove_recurring_payment(payment_id):
    pass


def create_subscription(user_id, subscription, pay_ref):
    return None

def remove_subscription(user_id, subscription):
    return None