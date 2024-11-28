import uuid
from typing import TypedDict

from pydantic import BaseModel
from restate import Workflow, WorkflowContext, WorkflowSharedContext
import restate
from restate.exceptions import TerminalError


class User(BaseModel):
    email: str
    name: str


def create_user_entry(user):
    pass


def send_email_with_link(email, secret):
    pass


# <start_here>
# <mark_1>
signup_workflow = Workflow("signupWorkflow")
# </mark_1>


# <mark_1>
@signup_workflow.main()
async def run(ctx: WorkflowContext, user: User) -> bool:
    # </mark_1>
    # <mark_3>
    ctx.set("stage", "Creating user")
    # </mark_3>
    # <mark_2>
    await ctx.run("create user", lambda: create_user_entry(user))
    # </mark_2>

    # <mark_3>
    ctx.set("stage", "Email verification")
    # </mark_3>
    # <mark_2>
    secret = await ctx.run("generate secret", lambda: str(uuid.uuid4()))
    await ctx.run("send email", lambda: send_email_with_link(user.email, secret))
    # </mark_2>

    # <mark_5>
    click_secret = await ctx.promise("email_link_clicked").value()
    # </mark_5>
    # <mark_7>
    if click_secret != secret:
        # <mark_3>
        ctx.set("stage", "Email verification failed")
        # </mark_3>
        raise TerminalError("Wrong secret from email link")

    # <mark_3>
    ctx.set("stage", "Email verified")
    # </mark_3>
    return True
    # </mark_7>


# <mark_4>
@signup_workflow.handler("getStage")
async def get_stage(ctx: WorkflowSharedContext) -> str:
    return await ctx.get("stage") or "unknown"
    # </mark_4>


# <mark_6>
@signup_workflow.handler("approveEmail")
async def approve_email(ctx: WorkflowSharedContext, secret: str):
    await ctx.promise("email_link_clicked").resolve(secret)
    # </mark_6>
    # <end_here>

app = restate.app([signup_workflow])