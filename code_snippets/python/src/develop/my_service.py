import restate
from restate import Context, Service

my_service = Service("MyService")


@my_service.handler("myHandler")
async def my_service_handler(ctx: Context, greeting: str) -> int:
    return f"${greeting}!"

app = restate.app(services=[my_service])