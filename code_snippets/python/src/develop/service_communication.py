import json
from datetime import timedelta

from restate import Service, Context, RestateDurableFuture
import src.develop.my_service as my_service
import src.develop.my_virtual_object as my_object
import src.develop.my_workflow as my_workflow

caller = Service("Caller")


@caller.handler()
async def calling_handler(ctx: Context, arg):
    # <start_request_response_service>
    response = await ctx.service_call(my_service.my_handler, arg="Hi")
    # <end_request_response_service>

    # <start_request_response_object>
    response = await ctx.object_call(my_object.my_handler, key="Mary", arg="Hi")
    # <end_request_response_object>

    # <start_one_way_service>
    ctx.service_send(my_service.my_handler, arg="Hi")
    # <end_one_way_service>

    # <start_one_way_object>
    ctx.object_send(my_object.my_handler, key="Mary", arg="Hi")
    # <end_one_way_object>

    # <start_delayed_service>
    ctx.service_send(my_service.my_handler, arg="Hi", send_delay=timedelta(seconds=5))
    # <end_delayed_service>

    # <start_delayed_object>
    ctx.object_send(my_object.my_handler, key="Mary", arg="Hi", send_delay=timedelta(seconds=5))
    # <end_delayed_object>

    # <start_request_response_generic>
    response = await ctx.generic_call("MyObject", "my_handler", key="Mary", arg=json.dumps("Hi").encode("utf-8"))
    # <end_request_response_generic>

    # <start_one_way_generic>
    ctx.generic_send("MyService", "my_handler", arg=json.dumps("Hi").encode("utf-8"))
    # <end_one_way_generic>

    # <start_delayed_generic>
    ctx.generic_send(
        "MyService",
        "my_handler",
        arg=json.dumps("Hi").encode("utf-8"),
        send_delay=timedelta(seconds=5),
    )
    # <end_delayed_generic>

    # <start_ordering>
    ctx.object_send(my_object.my_handler, key="Mary", arg="I'm call A")
    ctx.object_send(my_object.my_handler, key="Mary", arg="I'm call B")
    # <end_ordering>

    # <start_idempotency_key>
    await ctx.service_call(
        my_service.my_handler,
        arg="Hi",
        # !mark
        idempotency_key="my-idempotency-key",
    )
    # <end_idempotency_key>

    # <start_attach>
    # Send a request, get the invocation id
    handle = ctx.service_send(my_service.my_handler, arg="Hi", idempotency_key="my-idempotency-key")
    invocation_id = await handle.invocation_id()

    # Now re-attach
    # !mark
    result: RestateDurableFuture[str] = await ctx.attach_invocation(invocation_id)
    # <end_attach>

    # <start_cancel>
    ctx.cancel_invocation(invocation_id)
    # <end_cancel>


@caller.handler()
async def call_workflows(ctx: Context, arg):
    # <start_request_response_workflow>
    # Call the `run` handler of the workflow(only works once).
    response = await ctx.workflow_call(my_workflow.run, key="my_workflow_id", arg="Hi")
    # Call some other `interact_with_workflow` handler of the workflow.
    response = await ctx.workflow_call(my_workflow.interact_with_workflow, key="my_workflow_id", arg="Hi")
    # <end_request_response_workflow>

    # <start_one_way_workflow>
    # Call the `run` handler of the workflow (only works once).
    ctx.workflow_send(my_workflow.run, key="my_workflow_id", arg="Hi")
    # Call some other `interact_with_workflow` handler of the workflow.
    ctx.workflow_send(my_workflow.interact_with_workflow, key="my_workflow_id", arg="Hi")
    # <end_one_way_workflow>

    # <start_delayed_workflow>
    ctx.workflow_send(my_workflow.run, key="my_workflow_id", arg="Hi", send_delay=timedelta(seconds=5))
    # <end_delayed_workflow>
