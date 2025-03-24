use crate::concepts::stubs::{create_recurring_payment, create_subscription, SubscriptionRequest};
use restate_sdk::prelude::*;

// <start_here>
#[restate_sdk::service]
pub trait SubscriptionService {
    // <mark_2>
    async fn add(req: Json<SubscriptionRequest>) -> Result<(), HandlerError>;
    // </mark_2>
}

struct SubscriptionServiceImpl;

impl SubscriptionService for SubscriptionServiceImpl {
    // <mark_2>
    async fn add(
        &self,
        mut ctx: Context<'_>,
        Json(req): Json<SubscriptionRequest>,
    ) -> Result<(), HandlerError> {
        // </mark_2>
        // <mark_3>
        // <mark_1>
        let payment_id = ctx.rand_uuid().to_string();
        // </mark_1>

        // <mark_1>
        let pay_ref = ctx
            .run(|| create_recurring_payment(&req.credit_card, &payment_id))
            .await?;
        // </mark_1>

        for subscription in req.subscriptions {
            // <mark_1>
            ctx.run(|| create_subscription(&req.user_id, &subscription, &pay_ref))
                .await?;
            // </mark_1>
        }

        Ok(())
        // </mark_3>
    }
}

#[tokio::main]
async fn main() {
    // <mark_4>
    HttpServer::new(
        Endpoint::builder()
            .bind(SubscriptionServiceImpl.serve())
            .build(),
    )
    .listen_and_serve("0.0.0.0:9080".parse().unwrap())
    .await;
    // </mark_4>
}
// <end_here>
