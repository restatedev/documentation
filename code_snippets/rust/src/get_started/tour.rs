fn add_ticket(
    ctx: ObjectContext<'_>,
) -> Result<(), HandlerError> {

    // <start_sleep>
    ctx.sleep(Duration::from_millis(15 * 60 * 1000)).await?;
    // <end_sleep>

    // <start_sleep_and_send>
    ctx.sleep(Duration::from_millis(15 * 60 * 1000)).await?;
    ctx.object_client::<TicketObjectClient>(ctx.key())
        .unreserve()
        .send();
    // <end_sleep_and_send>
}

use std::collections::HashSet;
use restate_sdk::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct CheckoutRequest {
    pub(crate) user_id: String,
    pub(crate) tickets: HashSet<String>,
}

#[restate_sdk::service]
pub(crate) trait CheckoutService {
    async fn handle(request: Json<CheckoutRequest>) -> Result<bool, HandlerError>;
}

pub struct CheckoutServiceImpl;

impl CheckoutService for CheckoutServiceImpl {
    // <start_uuid>
    async fn handle(
        &self,
        mut ctx: Context<'_>,
        Json(CheckoutRequest { user_id, tickets }): Json<CheckoutRequest>,
    ) -> Result<bool, HandlerError> {

        let idempotency_key = ctx.rand_uuid().to_string();
        info!("idempotent key: {}", idempotency_key);

        Err(HandlerError::from("Something happened!"))
    }
    // <end_uuid>
}

impl OtherCheckoutService for CheckoutServiceImpl {
    // <start_checkout>
    async fn handle(
        &self,
        mut ctx: Context<'_>,
        Json(CheckoutRequest { user_id, tickets }): Json<CheckoutRequest>,
    ) -> Result<bool, HandlerError> {
        // !mark
        let total_price = tickets.len() as f64 * 40.0;

        let idempotency_key = ctx.rand_uuid().to_string();

        // !mark(1:4)
        let pay_client = PaymentClient::new();
        let success = ctx
            .run(|| pay_client.call(&idempotency_key, total_price))
            .await?;

        Ok(success)
    }
    // <end_checkout>
}

pub struct PaymentClient {}

impl PaymentClient {
    pub fn new() -> Self {
        PaymentClient {}
    }

    pub async fn call(&self, idempotency_key: &str, amount: f64) -> Result<bool, HandlerError> {
        Ok(true)
    }
}