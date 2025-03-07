import uuid
import restate
from pydantic import BaseModel
from restate import Workflow, WorkflowContext, WorkflowSharedContext
from src.use_cases.workflows.utils import create_user_entry, send_email_with_link

class User(BaseModel):
    name: str
    email: str


# <start_here>
user_signup = Workflow("user-signup")

# <mark_1>
@user_signup.main()
async def run(ctx: WorkflowContext, user: User) -> bool:
    # </mark_1>
    user_id = ctx.key()

    # <mark_2>
    await ctx.run("create_user", lambda: create_user_entry(user))
    # </mark_2>

    # <mark_2>
    secret = await ctx.run("secret", lambda: str(uuid.uuid4()))
    await ctx.run("send_email", lambda: send_email_with_link(user_id, user.email, secret))
    # </mark_2>

    # <mark_2>
    # <mark_3>
    click_secret = await ctx.promise("link_clicked").value()
    # </mark_3>
    # </mark_2>
    return click_secret == secret


@user_signup.handler()
async def click(ctx: WorkflowSharedContext, secret: str):
    # <mark_3>
    await ctx.promise("link_clicked").resolve(secret)
    # </mark_3>

app = restate.app(services=[user_signup])
# <end_here>