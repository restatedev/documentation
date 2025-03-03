from restate import WorkflowContext, WorkflowSharedContext, Workflow
from typing import TypedDict


class FileUploadWorkflow(TypedDict):
    name: str
    handlers: dict


def create_s3_bucket() -> str:
    return ""


def upload_file(target: str):
    pass


def send_email(url: str, email: str):
    print(f" >>> Sending email to '{email}' with URL {url}")


# <start_here>
file_upload_workflow = Workflow("FileUploadWorkflow")


@file_upload_workflow.main()
async def run(ctx: WorkflowContext) -> str:
    url = await ctx.run("bucket creation", lambda: create_s3_bucket())
    await ctx.run("upload", lambda: upload_file(url))

    # <mark_1>
    await ctx.promise("url").resolve(url)
    # </mark_1>

    return url


@file_upload_workflow.handler("getUrlViaEmail")
async def get_url_via_email(ctx: WorkflowSharedContext, email: str):
    # <mark_1>
    url = await ctx.promise("url").value()
    # </mark_1>
    await ctx.run("email", lambda: send_email(url, email))
# <end_here>
