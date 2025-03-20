use restate_sdk::prelude::*;

// <start_here>
// <mark_1>
#[restate_sdk::object]
pub trait GreeterObject {
    async fn greet(req: String) -> Result<String, HandlerError>;
    async fn ungreet() -> Result<String, HandlerError>;
    // <mark_4>
    #[shared]
    async fn get_greet_count() -> Result<u64, HandlerError>;
    // </mark_4>
}
// </mark_1>

pub struct GreeterObjectImpl;

impl GreeterObject for GreeterObjectImpl {
    // <mark_1>
    // <mark_3>
    async fn greet(
        &self,
        ctx: ObjectContext<'_>,
        greeting: String,
    ) -> Result<String, HandlerError> {
        // </mark_3>
        let name = ctx.key();
        // </mark_1>

        // <mark_2>
        let mut count = ctx.get::<u64>("count").await?.unwrap_or(0);
        // </mark_2>
        count += 1;
        // <mark_2>
        ctx.set("count", count);
        // </mark_2>

        Ok(format!("{} {} for the {}-th time.", greeting, name, count))
    }

    // <mark_1>
    // <mark_3>
    async fn ungreet(&self, ctx: ObjectContext<'_>) -> Result<String, HandlerError> {
        // </mark_3>
        let name = ctx.key();
        // </mark_1>

        // <mark_2>
        let mut count: u64 = ctx.get::<u64>("count").await?.unwrap_or(0);
        // </mark_2>
        if count > 0 {
            count -= 1;
        }
        // <mark_2>
        ctx.set("count", count);
        // </mark_2>

        Ok(format!(
            "Dear {}, taking one greeting back: {}.",
            name, count
        ))
    }

    // <mark_4>
    // <mark_1>
    async fn get_greet_count(&self, ctx: SharedObjectContext) -> Result<u64, HandlerError> {
        // </mark_1>
        // <mark_2>
        Ok(ctx.get::<u64>("count").await?.unwrap_or(0))
        // </mark_2>
    }
    // </mark_4>
}

#[tokio::main]
async fn main() {
    HttpServer::new(Endpoint::builder().bind(GreeterObjectImpl.serve()).build())
        .listen_and_serve("0.0.0.0:9080".parse().unwrap())
        .await;
}
// <end_here>
