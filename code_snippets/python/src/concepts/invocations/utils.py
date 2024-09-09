from restate import Context, Service, VirtualObject, ObjectContext, Workflow, WorkflowContext, WorkflowSharedContext

greeter = Service("Greeter")


@greeter.handler()
async def greet(ctx: Context, greeting: str) -> str:
    return f"{greeting}"


greet_counter = VirtualObject("GreetCounter")


@greet_counter.handler()
async def count_greet(ctx: ObjectContext, count: int) -> int:
    return 1


my_workflow = Workflow("MyWorkflow")


@my_workflow.main()
async def run(ctx: WorkflowContext, greeting: str):
    return


@my_workflow.handler()
async def my_other_handler(ctx: WorkflowSharedContext, req: str) -> str:
    return ""
