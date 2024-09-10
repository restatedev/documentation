from datetime import timedelta

from restate import Service, Context, VirtualObject, ObjectContext
# <start_import>
from src.develop.my_service import my_service_handler
# <end_import>
from src.develop.my_virtual_object import my_object_handler
from src.develop.my_workflow import run, interact_with_workflow

caller = Service("Caller")


@caller.handler()
async def calling_handler(ctx: Context, arg):
    # <start_request_response_service>
    response = await ctx.service_call(my_service_handler, arg="Hi")
    # <end_request_response_service>

    # <start_request_response_object>
    response = await ctx.object_call(my_object_handler, key="Mary", arg="Hi")
    # <end_request_response_object>

    # <start_one_way_service>
    ctx.service_send(my_service_handler, arg="Hi")
    # <end_one_way_service>

    # <start_one_way_object>
    ctx.object_send(my_object_handler, key="Mary", arg="Hi")
    # <end_one_way_object>

    # <start_delayed_service>
    ctx.service_send(my_service_handler, arg="Hi", send_delay=timedelta(seconds=5))
    # <end_delayed_service>

    # <start_delayed_object>
    ctx.object_send(my_object_handler, key="Mary", arg="Hi", send_delay=timedelta(seconds=5))
    # <end_delayed_object>

    # <start_ordering>
    ctx.object_send(my_object_handler, key="Mary", arg="I'm call A")
    ctx.object_send(my_object_handler, key="Mary", arg="I'm call B")
    # <end_ordering>


@caller.handler()
async def call_workflows(ctx: Context, arg):
    # <start_request_response_workflow>
    # Call the `run` handler of the workflow(only works once).
    await ctx.workflow_call(run, key="my_workflow_id", arg="Hi")
    # Call some other `interact_with_workflow` handler of the workflow.
    await ctx.workflow_call(interact_with_workflow, key="my_workflow_id", arg=None)
    # <end_request_response_workflow>

    # <start_one_way_workflow>
    # Call the `run` handler of the workflow (only works once).
    ctx.workflow_send(run, key="my_workflow_id", arg="Hi")
    # Call some other `interact_with_workflow` handler of the workflow.
    ctx.workflow_send(interact_with_workflow, key="my_workflow_id", arg=None)
    # <end_one_way_workflow>
