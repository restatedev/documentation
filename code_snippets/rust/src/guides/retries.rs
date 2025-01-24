use std::time::Duration;
use restate_sdk::prelude::*;


#[restate_sdk::service]
trait MyService {
    async fn handle() -> Result<(), HandlerError>;
    async fn my_handler(request: Vec<u8>) -> Result<(), HandlerError>;
}

struct MyServiceImpl;
impl MyService for MyServiceImpl {

    async fn handle(&self, ctx: Context<'_>) -> Result<(), HandlerError> {
        // <start_here>
        // <mark_1>
        let my_run_retry_policy = RunRetryPolicy::default()
            .initial_delay(Duration::from_millis(100))
            .exponentiation_factor(2.0)
            .max_delay(Duration::from_millis(1000))
            .max_attempts(10)
            .max_duration(Duration::from_secs(10));
        // </mark_1>
        ctx.run(|| write_to_other_system())
            .retry_policy(my_run_retry_policy)
            .await?;
        // <end_here>

        // <start_catch>
        // Fails with a terminal error after 3 attempts or if the function throws one
        ctx.run(|| write_to_other_system())
            .retry_policy(RunRetryPolicy::default().max_attempts(3))
            .await
            .map_err(|e| {
                // Handle the terminal error: undo previous actions and
                // propagate the error back to the caller
                e
            })?;
        // <end_catch>

        // <start_terminal_error>
        Err(TerminalError::new("This is a terminal error").into());
        // <end_terminal_error>

        Ok(())
    }

    // <start_raw>
    // Use Vec<u8> to represent a binary request
    // !mark[/request: Vec<u8>/] blue
    async fn my_handler(&self, ctx: Context<'_>, request: Vec<u8>) -> Result<(), HandlerError> {
        let decoded_request = decode_request(&request)
            .map_err(|e| {
                // Propagate to DLQ/catch-all handler
                e
            })?;

        // ... rest of you business logic ...

        Ok(())
    }
    // <end_raw>

}

fn decode_request(p0: &Vec<u8>) -> Result<String, HandlerError> {
    Ok(String::from("Hello"))
}

fn write_to_other_system() -> Result<String, HandlerError>{
    Ok("Hello".to_string())
}