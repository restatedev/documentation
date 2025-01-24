use std::time::Duration;
use restate_sdk::prelude::*;


async fn handle(ctx: Context<'_>) -> Result<(), HandlerError> {

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
    ctx.run(|| write_to_other_system())
        .retry_policy(RunRetryPolicy::default().max_attempts(3))
        .await
        .map_err(|e| {
            // Handle the terminal error after retries exhausted
            // For example, undo previous actions (see sagas guide) and
            // propagate the error back to the caller
            e
        })?;
    // <end_catch>

    // <start_terminal_error>
    Err(TerminalError::new("This is a terminal error").into());
    // <end_terminal_error>

    Ok(())
}

async fn write_to_other_system() -> Result<String, HandlerError>{
    Ok("Hello".to_string())
}