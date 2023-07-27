---
sidebar_position: 10
description: "Let your service sleep for a specified time, guaranteed by Restate."
---

# Logging
The Restate SDK allows different log levels by setting the environment variable `RESTATE_DEBUG_LOGGING`.
- `OFF` no per-invocation logging. Only startup, discovery, shutdown, abnormal situations.
- `INVOKE`: Log for function invocation, suspension, and completion (success or error)
- `JOURNAL`: Log each journaled action
- `JOURNAL_VERBOSE`: Like JOURNAL, but add Json-ified message to the log.

Default behavior is (when `RESTATE_DEBUG_LOGGING` is not set)
- When `NODE_ENV=production`, the log setting is `OFF`
- Otherwise, the `INVOKE` setting is used.