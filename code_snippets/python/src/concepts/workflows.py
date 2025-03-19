from typing import TypedDict

import restate
from restate import Workflow, WorkflowContext, WorkflowSharedContext
from restate.exceptions import TerminalError

from src.concepts.utils import PaymentClient, EmailClient


class PaymentRequest(TypedDict):
    amount: int
    account: str
    email: str


class PaymentSuccess(TypedDict):
    account: str


payment_client = PaymentClient()
email_client = EmailClient()


# <start_here>
payment_workflow = Workflow("Payment")


# <mark_1>
@payment_workflow.main()
async def run(ctx: WorkflowContext, payment: PaymentRequest):
    # Validate payment. If not valid, end workflow right here without retries.
    if payment["amount"] < 0:
        raise TerminalError("Payment refused: negative amount")

    async def pay():
        return await payment_client.charge(
            ctx.key(), payment["account"], payment["amount"]
        )

    await ctx.run("make a payment", pay)

    # <mark_3>
    await ctx.promise("payment.success").value()
    # </mark_3>
    # <mark_2>
    ctx.set("status", "Payment succeeded")
    # </mark_2>

    async def email():
        return await email_client.send_success_notification(payment["email"])

    await ctx.run("notify the user", email)

    # <mark_2>
    ctx.set("status", "User notified of payment success")
    # </mark_2>

    return "success"


# </mark_1>


# <mark_3>
@payment_workflow.handler()
async def payment_webhook(ctx: WorkflowSharedContext, account: str):
    await ctx.promise("payment.success").resolve(account)


# </mark_3>


# <mark_2>
@payment_workflow.handler()
async def status(ctx: WorkflowSharedContext):
    await ctx.get("status")


# </mark_2>

app = restate.app([payment_workflow])
# <end_here>
