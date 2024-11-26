from restate import WorkflowContext, WorkflowSharedContext, Workflow
from typing import TypedDict


class DataPrepService(TypedDict):
    name: str
    handlers: dict


def create_s3_bucket() -> str:
    pass


def upload_data(target: str):
    pass


def send_email(url: str, email: str):
    print(f" >>> Sending email to '{email}' with URL {url}")


# <start_here>
data_preparation = Workflow("dataPrep")


@data_preparation.main()
async def run(ctx: WorkflowContext) -> str:
    # <mark_1>
    url = await ctx.run("bucket creation", lambda: create_s3_bucket())
    await ctx.run("upload", lambda: upload_data(url))

    # <mark_2>
    await ctx.promise("url").resolve(url)
    # </mark_2>

    return url
    # </mark_1>


@data_preparation.handler()
async def result_as_email(ctx: WorkflowSharedContext, email: str):
    # <mark_2>
    url = await ctx.promise("url").value()
    # </mark_2>
    await ctx.run("email", lambda: send_email(url, email))
# <end_here>
