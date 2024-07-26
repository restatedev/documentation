package usecases.asynctasks.synctoasync

import dev.restate.sdk.annotation.Shared
import dev.restate.sdk.annotation.Workflow
import dev.restate.sdk.common.DurablePromiseKey
import dev.restate.sdk.kotlin.KtSerdes
import dev.restate.sdk.kotlin.SharedWorkflowContext
import dev.restate.sdk.kotlin.WorkflowContext
import develop.workflows.Email

// <start_here>
@Workflow
class DataPreparationService {

    companion object {
        private val URL_PROMISE = DurablePromiseKey.of("url", KtSerdes.json<URL>())
    }

    @Workflow
    suspend fun run(ctx: WorkflowContext, userId: String): URL {
        val url: URL = ctx.runBlock (KtSerdes.json<URL>()) { createS3Bucket() }
        ctx.run { uploadData(url) }

        ctx.promiseHandle(URL_PROMISE).resolve(url)
        return url
    }

    @Shared
    suspend fun resultAsEmail(ctx: SharedWorkflowContext, email: Email) {
        val url: URL = ctx.promise(URL_PROMISE).awaitable().await()
        ctx.run { sendEmail(url, email) }
    }
}
// <end_here>

class URL{}

fun createS3Bucket(): URL {
    return URL()
}

fun uploadData(url: URL){}

fun sendEmail(url: URL, email: Email) {}

