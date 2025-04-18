package usecases.eventprocessing

import dev.restate.sdk.annotation.Handler
import dev.restate.sdk.annotation.VirtualObject
import dev.restate.sdk.endpoint.Endpoint
import dev.restate.sdk.kotlin.*
import dev.restate.sdk.lambda.BaseRestateLambdaHandler
import kotlin.time.Duration.Companion.seconds
import kotlinx.serialization.Serializable
import usecases.microservices.vo.SubscriptionObject

// <start_here>
@VirtualObject
class UserFeed {

  @Serializable data class SocialMediaPost(val content: String, val metadata: String)

  // <mark_1>
  @Handler
  suspend fun processPost(ctx: ObjectContext, post: SocialMediaPost) {
    // </mark_1>
    // <mark_5>
    val userId = ctx.key()
    // </mark_5>

    // <mark_3>
    val postId = ctx.runBlock { createPost(userId, post) }
    // </mark_3>

    // <mark_4>
    // <mark_3>
    while (ctx.runBlock { getPostStatus(postId) } == "PENDING") {
      // </mark_3>
      // <mark_2>
      ctx.sleep(5.seconds)
      // </mark_2>
    }
    // </mark_4>

    // <mark_3>
    ctx.runBlock { updateUserFeed(userId, postId) }
    // </mark_3>
  }
}

// <mark_6>
class MyLambdaHandler : BaseRestateLambdaHandler() {
  override fun register(builder: Endpoint.Builder) {
    builder.bind(SubscriptionObject())
  }
}
// </mark_6>
// <end_here>

fun createPost(userId: String, post: UserFeed.SocialMediaPost): String {
  // Implementation here
  return "postId"
}

fun getPostStatus(postId: String): String {
  // Implementation here
  return "status"
}

fun updateUserFeed(userId: String, postId: String) {
  // Implementation here
}
