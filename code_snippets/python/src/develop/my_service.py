import restate
from restate import Context, Service

my_service = Service("MyService")


@my_service.handler("myHandler")
async def my_handler(ctx: Context, greeting: str) -> str:
    return f"${greeting}!"


app = restate.app([my_service])
