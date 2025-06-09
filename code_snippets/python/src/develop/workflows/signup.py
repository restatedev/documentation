import uuid

import restate
from restate import Workflow, WorkflowContext, WorkflowSharedContext
from src.develop.workflows.email_client import EmailClient


# <start_here>
signup_workflow = Workflow("SignupWorkflow")
email_client = EmailClient()


# <mark_1>
@signup_workflow.main()
async def run(ctx: WorkflowContext, email: str):
    secret = await ctx.run("secret", lambda: str(uuid.uuid4()))
    ctx.set("onboarding_status", "Generated secret")

    await ctx.run("send email", lambda: email_client.send_email_with_link(email, secret))
    ctx.set("onboarding_status", "Sent email")

    # <mark_3>
    click_secret = await ctx.promise("email.clicked").value()
    # </mark_3>
    ctx.set("onboarding_status", "Clicked email")

    return click_secret == secret


# </mark_1>


@signup_workflow.handler()
async def click(ctx: WorkflowSharedContext, secret: str):
    # <mark_3>
    await ctx.promise("email.clicked").resolve(secret)
    # </mark_3>


# <mark_2>
@signup_workflow.handler()
async def get_status(ctx: WorkflowSharedContext):
    return await ctx.get("onboarding_status")


# </mark_2>

# <mark_4>
app = restate.app([signup_workflow])
# </mark_4>
# <end_here>
