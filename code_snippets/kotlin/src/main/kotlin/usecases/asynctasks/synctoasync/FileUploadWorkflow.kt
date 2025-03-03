package usecases.asynctasks.synctoasync

import dev.restate.sdk.annotation.Shared
import dev.restate.sdk.annotation.Workflow
import dev.restate.sdk.common.DurablePromiseKey
import dev.restate.sdk.kotlin.KtSerdes
import dev.restate.sdk.kotlin.SharedWorkflowContext
import dev.restate.sdk.kotlin.WorkflowContext
import dev.restate.sdk.kotlin.runBlock
import develop.workflows.Email

// <start_here>
@Workflow
class FileUploadWorkflow {

  companion object {
    private val URL_PROMISE = DurablePromiseKey.of("url", KtSerdes.json<URL>())
  }

  @Workflow
  suspend fun run(ctx: WorkflowContext): URL {
    // <mark_1>
    val url: URL = ctx.runBlock { createS3Bucket() }
    ctx.runBlock { uploadData(url) }

    // <mark_2>
    ctx.promiseHandle(URL_PROMISE).resolve(url)
    // </mark_2>
    return url
    // </mark_1>
  }

  @Shared
  suspend fun getUrlViaEmail(ctx: SharedWorkflowContext, email: Email) {
    // <mark_2>
    val url: URL = ctx.promise(URL_PROMISE).awaitable().await()
    // </mark_2>
    ctx.runBlock { sendEmail(url, email) }
  }
}
// <end_here>

class URL

fun createS3Bucket(): URL {
  return URL()
}

fun uploadData(url: URL) {}

fun sendEmail(url: URL, email: Email) {}
