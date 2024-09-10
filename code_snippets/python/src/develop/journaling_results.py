from restate import Service, Context

my_service = Service("MyService")


@my_service.handler()
async def my_handler(ctx: Context, arg):
    # <start_side_effect>
    async def do_db_request():
        # ... implement ...
        return "my_result"

    # withClass highlight-line
    result = await ctx.run("database request", do_db_request)
    # <end_side_effect>
