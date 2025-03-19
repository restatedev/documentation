from datetime import timedelta

import restate
from restate import VirtualObject, ObjectContext

from src.use_cases.event_processing.utils import (
    create_post,
    get_post_status,
    update_user_feed,
    SocialMediaPost,
    Status,
)

# <start_here>
user_feed = VirtualObject("UserFeed")


# <mark_1>
@user_feed.handler()
async def process_post(ctx: ObjectContext, post: SocialMediaPost):
    # </mark_1>
    # <mark_5>
    user_id = ctx.key()
    # </mark_5>

    # <mark_3>
    post_id = await ctx.run("profile update", lambda: create_post(user_id, post))
    # </mark_3>

    # <mark_4>
    # <mark_3>
    current_status = await ctx.run("post status", lambda: get_post_status(post_id))
    while current_status == Status.PENDING:
        # </mark_3>
        # <mark_2>
        await ctx.sleep(timedelta(seconds=5))
        # </mark_2>
    # </mark_4>

    # <mark_3>
    await ctx.run("update feed", lambda: update_user_feed(user_id, post_id))
    # </mark_3>


# <mark_6>
aws_lambda_handler = restate.app([user_feed])
# </mark_6>
# <end_here>
