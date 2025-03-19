import restate
from restate import Workflow, WorkflowSharedContext, WorkflowContext
from restate.serde import Serde

my_workflow = Workflow("MyWorkflow")


@my_workflow.main()
async def run(ctx: WorkflowContext, req: str) -> str:
    # ... implement workflow logic here ---
    return "success"


@my_workflow.handler()
async def interact_with_workflow(ctx: WorkflowSharedContext, req: str):
    # ... implement interaction logic here ...
    return


app = restate.app([my_workflow])
