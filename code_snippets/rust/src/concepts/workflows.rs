use crate::concepts::stubs::{create_user_entry, send_email_with_link, User};
use restate_sdk::prelude::*;

// <start_here>
#[restate_sdk::workflow]
trait SignupWorkflow {
    async fn run(user: Json<User>) -> Result<bool, HandlerError>;
    #[shared]
    async fn click(secret: String) -> Result<(), HandlerError>;
}

struct SignupWorkflowImpl;

impl SignupWorkflow for SignupWorkflowImpl {
    // <mark_1>
    async fn run(
        &self,
        mut ctx: WorkflowContext<'_>,
        Json(user): Json<User>,
    ) -> Result<bool, HandlerError> {
        // workflow ID = user ID; workflow runs once per user
        let user_id = ctx.key();

        // <mark_2>
        ctx.run(|| create_user_entry(&user)).await?;
        // </mark_2>

        // <mark_2>
        let secret = ctx.rand_uuid().to_string();
        ctx.run(|| send_email_with_link(user_id, &user, &secret))
            .await?;
        // </mark_2>

        // <mark_3>
        let click_secret = ctx.promise::<String>("email-link").await?;
        // </mark_3>
        Ok(click_secret == secret)
    }
    // </mark_1>

    // <mark_3>
    async fn click(
        &self,
        ctx: SharedWorkflowContext<'_>,
        secret: String,
    ) -> Result<(), HandlerError> {
        ctx.resolve_promise::<String>("email-link", secret);
        Ok(())
    }
    // </mark_3>
}

#[tokio::main]
async fn main() {
    HttpServer::new(Endpoint::builder().bind(SignupWorkflowImpl.serve()).build())
        .listen_and_serve("0.0.0.0:9080".parse().unwrap())
        .await;
}
// <end_here>
