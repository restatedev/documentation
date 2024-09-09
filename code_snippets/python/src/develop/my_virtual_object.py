import restate
from restate import VirtualObject, ObjectContext, ObjectSharedContext

my_virtual_object = VirtualObject("MyVirtualObject")


@my_virtual_object.handler("myHandler")
async def my_object_handler(ctx: ObjectContext, greeting: str) -> str:
    return f"${greeting} ${ctx.key()}!"


@my_virtual_object.handler(kind="shared")
async def my_concurrent_handler(ctx: ObjectSharedContext, greeting: str) -> str:
    return f"${greeting} ${ctx.key()}!"

app = restate.app([my_virtual_object])
