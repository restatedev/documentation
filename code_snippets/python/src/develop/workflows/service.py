from restate import VirtualObject, ObjectContext

from src.develop.workflows.signup import run, get_status

user_management_object = VirtualObject("UserManagementObject")


# <start_here>
@user_management_object.handler()
async def signup_user(ctx: ObjectContext, email: str):
    # !focus
    result = await ctx.workflow_call(run, key="someone", arg=email)


@user_management_object.handler()
async def query_status(ctx: ObjectContext):
    # !focus
    status: str = await ctx.workflow_call(get_status, key="someone", arg=None)


# <end_here>
