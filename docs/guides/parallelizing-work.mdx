---
title: "Parallelizing work"
description: "Execute a list of tasks in parallel and then gather their result."
pagination_next: null
pagination_prev: null
---

import Admonition from "@theme/Admonition";
import {CodeWithTabs} from "../../src/components/code/code";
import {Step} from "../../src/components/Stepper";

# Parallelizing work

This guide shows how to use the Restate to **execute a list of tasks in parallel and then gather their result**, also known as fan-out, fan-in.

<img src={"/img/guides/parallelizework.png"} width={"400px"}/>

## How does Restate help?
- Restate lets you schedule the tasks asynchronously and guarantees that all tasks will run, with **retries and recovery** on failures.
- Restate **turns Promises/Futures into durable, distributed constructs** that are persisted in Restate and can be recovered and awaited on another process.
- You can deploy the subtask executors on **serverless** infrastructure, like AWS Lambda, to let them scale automatically. The main task, that is idle while waiting on the subtasks, gets suspended until it can make progress.

**Fan out**: You can fan out tasks with Restate by creating a handler that processes a single subtask,
and then scheduling it repeatedly from another handler.

**Fan in**: You can fan in the results of the subtasks by using Restate's Promise Combinators to wait for all promises to resolve.

## Example

The example implements a worker service:
1. It splits a task into subtasks.
2. It schedules all the subtasks. Each subtask results in a promise that gets added to a list.
3. The result is gathered by waiting for all promises to resolve.

You can run this on FaaS infrastructure, like AWS Lambda, and it will scale automatically.
The `run` handler will then suspend while it waits for all subtasks to finish.
Restate will then resume the handler when all subtasks are done.

<CodeWithTabs groupId={"sdk"}>
    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/src/parallelizework/fan_out_worker.ts
    // collapse_prequel
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/typescript/patterns-use-cases/src/parallelizework/fan_out_worker.ts
    ```

    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/patterns-use-cases/src/main/java/my/example/parallelizework/FanOutWorker.java
    // collapse_prequel
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/java/patterns-use-cases/src/main/java/my/example/parallelizework/FanOutWorker.java
    ```

    ```kotlin !!tabs Kotlin https://github.com/restatedev/examples/blob/main/kotlin/patterns-use-cases/src/main/kotlin/my/example/parallelizework/FanOutWorker.kt
    // collapse_prequel
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/kotlin/patterns-use-cases/src/main/kotlin/my/example/parallelizework/FanOutWorker.kt
    ```

    ```python !!tabs Python https://github.com/restatedev/examples/blob/main/python/patterns-use-cases/parallelizework/app.py
    // collapse_prequel
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/python/patterns-use-cases/parallelizework/app.py
    ```

    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/patterns-use-cases/src/parallelizework/fanoutworker.go
    // collapse_prequel
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/go/patterns-use-cases/src/parallelizework/fanoutworker.go
    ```
</CodeWithTabs>

In this example, we parallelize RPC calls, but this can also be used to parallelize `ctx.run` actions.

<Admonition type={"note"} title={"Example not available in your language?"}>
    This pattern is implementable with any of our SDKs. We are still working on translating all patterns to all SDK languages.
    If you need help with a specific language, please reach out to us via [Discord](https://discord.com/invite/skW3AZ6uGd) or [Slack](https://join.slack.com/t/restatecommunity/shared_invite/zt-2v9gl005c-WBpr167o5XJZI1l7HWKImA).
</Admonition>


## Running the example

<Step stepLabel="1" title="Download the example">
    <CodeWithTabs groupId={"sdk"} className={"display-none"}>
        ```shell !!tabs ts
        restate example typescript-patterns-use-cases && cd typescript-patterns-use-cases
        ```
        ```shell !!tabs java
        restate example java-patterns-use-cases && cd java-patterns-use-cases
        ```
        ```shell !!tabs kotlin
        restate example kotlin-patterns-use-cases && cd kotlin-patterns-use-cases
        ```
        ```shell !!tabs python
        restate example python-patterns-use-cases && cd python-patterns-use-cases
        ```
        ```shell !!tabs go
        restate example go-patterns-use-cases && cd go-patterns-use-cases
        ```
    </CodeWithTabs>
</Step>
<Step stepLabel="2" title="Start the Restate Server">
    ```shell
    restate-server
    ```
</Step>
<Step stepLabel="3" title="Start the Service">
    <CodeWithTabs groupId={"sdk"} className={"display-none"}>
        ```shell !!tabs ts
        npx tsx watch ./src/parallelizework/fan_out_worker.ts
        ```
        ```shell !!tabs java
        ./gradlew -PmainClass=my.example.parallelizework.FanOutWorker run
        ```
        ```shell !!tabs kotlin
        ./gradlew -PmainClass=my.example.parallelizework.FanOutWorkerKt run
        ```
        ```shell !!tabs python
        python parallelizework/app.py
        ```
        ```shell !!tabs go
        go run ./src/parallelizework
        ```
    </CodeWithTabs>
</Step>
<Step stepLabel="4" title="Register the services">
    ```shell
    restate deployments register localhost:9080
    ```
</Step>
<Step stepLabel="5" title="Send a request">
    <CodeWithTabs groupId={"sdk"} className={"display-none"}>
        ```shell !!tabs ts
        curl localhost:8080/worker/run \
            --json '{"description": "get out of bed,shower,make coffee,have breakfast"}'
        ```
        ```shell !!tabs java
        curl localhost:8080/FanOutWorker/run \
            --json '{"description": "get out of bed,shower,make coffee,have breakfast"}'
        ```
        ```shell !!tabs kotlin
        curl localhost:8080/FanOutWorker/run \
        --json '{"description": "get out of bed,shower,make coffee,have breakfast"}'
        ```
        ```shell !!tabs python
        curl localhost:8080/FanOutWorker/run \
            --json '{"description": "get out of bed,shower,make coffee,have breakfast"}'
        ```
        ```shell !!tabs go
        curl localhost:8080/FanOutWorker/Run \
            --json '{"description": "get out of bed,shower,make coffee,have breakfast"}'
        ```
    </CodeWithTabs>

</Step>

<Step stepLabel="4" title="Check the service logs">
    See how all tasks get spawned in parallel, finish at different times, and then get aggregated.
    <CodeWithTabs groupId={"sdk"} className={"display-none"}>
        ```shell !!tabs ts
        # !mark gold
        [restate] [worker/runSubtask][inv_17jBqoqRG0TN3msVqHEpZn2aQMOX5kSKrf][2025-01-17T08:51:44.993Z] INFO:  Started executing subtask: get out of bed
        # !mark green
        [restate] [worker/runSubtask][inv_1f8R1NuF0LF27EdQ0R6s7PR8hld245OM8h][2025-01-17T08:51:44.995Z] INFO:  Started executing subtask: shower
        # !mark blue
        [restate] [worker/runSubtask][inv_101oPhGwxQqZ0sQebkQnpGyV9Rp3oj9CSJ][2025-01-17T08:51:44.997Z] INFO:  Started executing subtask: make coffee
        # !mark red
        [restate] [worker/runSubtask][inv_1eKDShaxMCEB6DXasrR5OtRXJEvA2je33X][2025-01-17T08:51:44.998Z] INFO:  Started executing subtask: have breakfast
        # !mark gold
        [restate] [worker/runSubtask][inv_17jBqoqRG0TN3msVqHEpZn2aQMOX5kSKrf][2025-01-17T08:51:47.003Z] INFO:  Execution subtask finished: get out of bed
        # !mark blue
        [restate] [worker/runSubtask][inv_101oPhGwxQqZ0sQebkQnpGyV9Rp3oj9CSJ][2025-01-17T08:51:48.007Z] INFO:  Execution subtask finished: make coffee
        # !mark green
        [restate] [worker/runSubtask][inv_1f8R1NuF0LF27EdQ0R6s7PR8hld245OM8h][2025-01-17T08:51:48.999Z] INFO:  Execution subtask finished: shower
        # !mark red
        [restate] [worker/runSubtask][inv_1eKDShaxMCEB6DXasrR5OtRXJEvA2je33X][2025-01-17T08:51:49.001Z] INFO:  Execution subtask finished: have breakfast
        [restate] [worker/run][inv_18QHSeAYfvim1oNXRl9I5105veQcTW3BEl][2025-01-17T08:51:49.007Z] INFO:  Aggregated result: get out of bed: DONE,shower: DONE,make coffee: DONE,have breakfast: DONE
        ```
        ```shell !!tabs java
        2025-01-17 10:00:58 INFO  [FanOutWorker/run][inv_1jNoSMJtWluo4Ir43OUyDAxD9weMAQ4OeR] dev.restate.sdk.core.InvocationStateMachine - Start invocation
        2025-01-17 10:00:58 INFO  [FanOutWorker/runSubtask][inv_1kdpBvVXdqyo3saU6KThul6Jgkfot6LcRP] dev.restate.sdk.core.InvocationStateMachine - Start invocation
        # !focus
        # !mark gold
        2025-01-17 10:00:58 INFO  [FanOutWorker/runSubtask][inv_1kdpBvVXdqyo3saU6KThul6Jgkfot6LcRP] my.example.parallelizework.utils.Utils - Started executing subtask: get out of bed
        2025-01-17 10:00:58 INFO  [FanOutWorker/runSubtask][inv_162MCD5ertQ65pdG0uDIYRMgLBFYZkNPnb] dev.restate.sdk.core.InvocationStateMachine - Start invocation
        # !focus
        # !mark green
        2025-01-17 10:00:58 INFO  [FanOutWorker/runSubtask][inv_162MCD5ertQ65pdG0uDIYRMgLBFYZkNPnb] my.example.parallelizework.utils.Utils - Started executing subtask: shower
        2025-01-17 10:00:58 INFO  [FanOutWorker/runSubtask][inv_10bPiFTjBUXX35qtzOTPNr0vfgoYYVehpf] dev.restate.sdk.core.InvocationStateMachine - Start invocation
        # !focus
        # !mark blue
        2025-01-17 10:00:58 INFO  [FanOutWorker/runSubtask][inv_10bPiFTjBUXX35qtzOTPNr0vfgoYYVehpf] my.example.parallelizework.utils.Utils - Started executing subtask: make coffee
        2025-01-17 10:00:58 INFO  [FanOutWorker/runSubtask][inv_1115lzidXq7M7CtLZn0aEyUvMC4zkXYLWF] dev.restate.sdk.core.InvocationStateMachine - Start invocation
        # !focus
        # !mark red
        2025-01-17 10:00:58 INFO  [FanOutWorker/runSubtask][inv_1115lzidXq7M7CtLZn0aEyUvMC4zkXYLWF] my.example.parallelizework.utils.Utils - Started executing subtask: have breakfast
        # !focus
        # !mark green
        2025-01-17 10:00:59 INFO  [FanOutWorker/runSubtask][inv_162MCD5ertQ65pdG0uDIYRMgLBFYZkNPnb] my.example.parallelizework.utils.Utils - Execution subtask finished: shower
        2025-01-17 10:00:59 INFO  [FanOutWorker/runSubtask][inv_162MCD5ertQ65pdG0uDIYRMgLBFYZkNPnb] dev.restate.sdk.core.InvocationStateMachine - End invocation
        # !focus
        # !mark gold
        2025-01-17 10:01:00 INFO  [FanOutWorker/runSubtask][inv_1kdpBvVXdqyo3saU6KThul6Jgkfot6LcRP] my.example.parallelizework.utils.Utils - Execution subtask finished: get out of bed
        2025-01-17 10:01:00 INFO  [FanOutWorker/runSubtask][inv_1kdpBvVXdqyo3saU6KThul6Jgkfot6LcRP] dev.restate.sdk.core.InvocationStateMachine - End invocation
        # !focus
        # !mark blue
        2025-01-17 10:01:04 INFO  [FanOutWorker/runSubtask][inv_10bPiFTjBUXX35qtzOTPNr0vfgoYYVehpf] my.example.parallelizework.utils.Utils - Execution subtask finished: make coffee
        2025-01-17 10:01:04 INFO  [FanOutWorker/runSubtask][inv_10bPiFTjBUXX35qtzOTPNr0vfgoYYVehpf] dev.restate.sdk.core.InvocationStateMachine - End invocation
        # !focus
        # !mark red
        2025-01-17 10:01:05 INFO  [FanOutWorker/runSubtask][inv_1115lzidXq7M7CtLZn0aEyUvMC4zkXYLWF] my.example.parallelizework.utils.Utils - Execution subtask finished: have breakfast
        2025-01-17 10:01:05 INFO  [FanOutWorker/runSubtask][inv_1115lzidXq7M7CtLZn0aEyUvMC4zkXYLWF] dev.restate.sdk.core.InvocationStateMachine - End invocation
        2025-01-17 10:01:05 INFO  [FanOutWorker/run][inv_1jNoSMJtWluo4Ir43OUyDAxD9weMAQ4OeR] my.example.parallelizework.utils.Utils - Aggregated result: get out of bed: DONE, shower: DONE, make coffee: DONE, have breakfast: DONE
        2025-01-17 10:01:05 INFO  [FanOutWorker/run][inv_1jNoSMJtWluo4Ir43OUyDAxD9weMAQ4OeR] dev.restate.sdk.core.InvocationStateMachine - End invocation
        ```
        ```shell !!tabs kotlin
        2025-03-06 12:20:18 INFO  [FanOutWorker/run][inv_1fGEUyfogPKK5cbSCSWzpCkcDpkQIKSzMB] dev.restate.sdk.core.InvocationStateMachine - Start invocation
        2025-03-06 12:20:18 INFO  [FanOutWorker/runSubtask][inv_146fBfVLISKb2sCWqesf6uMReXdRKvqmv7] dev.restate.sdk.core.InvocationStateMachine - Start invocation
        # !mark gold
        2025-03-06 12:20:18 INFO  [FanOutWorker/runSubtask][inv_146fBfVLISKb2sCWqesf6uMReXdRKvqmv7] FanOutWorker - Started executing subtask: get out of bed
        2025-03-06 12:20:18 INFO  [FanOutWorker/runSubtask][inv_18T9WW6paOhm6eciCeBt5iqHXRY4h2NRvP] dev.restate.sdk.core.InvocationStateMachine - Start invocation
        # !mark green
        2025-03-06 12:20:18 INFO  [FanOutWorker/runSubtask][inv_18T9WW6paOhm6eciCeBt5iqHXRY4h2NRvP] FanOutWorker - Started executing subtask: shower
        2025-03-06 12:20:18 INFO  [FanOutWorker/runSubtask][inv_10kE3b5UcL8L64ghFpHQjeeAEowKNis4dH] dev.restate.sdk.core.InvocationStateMachine - Start invocation
        # !mark blue
        2025-03-06 12:20:18 INFO  [FanOutWorker/runSubtask][inv_10kE3b5UcL8L64ghFpHQjeeAEowKNis4dH] FanOutWorker - Started executing subtask: make coffee
        2025-03-06 12:20:18 INFO  [FanOutWorker/runSubtask][inv_1fCFmQ9ulbxL2MBwYCDRgV8Was8PDBedW1] dev.restate.sdk.core.InvocationStateMachine - Start invocation
        # !mark red
        2025-03-06 12:20:18 INFO  [FanOutWorker/runSubtask][inv_1fCFmQ9ulbxL2MBwYCDRgV8Was8PDBedW1] FanOutWorker - Started executing subtask: have breakfast
        # !mark blue
        2025-03-06 12:20:21 INFO  [FanOutWorker/runSubtask][inv_10kE3b5UcL8L64ghFpHQjeeAEowKNis4dH] FanOutWorker - Execution subtask finished: make coffee
        2025-03-06 12:20:21 INFO  [FanOutWorker/runSubtask][inv_10kE3b5UcL8L64ghFpHQjeeAEowKNis4dH] dev.restate.sdk.core.InvocationStateMachine - End invocation
        # !mark gold
        2025-03-06 12:20:24 INFO  [FanOutWorker/runSubtask][inv_146fBfVLISKb2sCWqesf6uMReXdRKvqmv7] FanOutWorker - Execution subtask finished: get out of bed
        2025-03-06 12:20:24 INFO  [FanOutWorker/runSubtask][inv_146fBfVLISKb2sCWqesf6uMReXdRKvqmv7] dev.restate.sdk.core.InvocationStateMachine - End invocation
        # !mark red
        2025-03-06 12:20:25 INFO  [FanOutWorker/runSubtask][inv_1fCFmQ9ulbxL2MBwYCDRgV8Was8PDBedW1] FanOutWorker - Execution subtask finished: have breakfast
        2025-03-06 12:20:25 INFO  [FanOutWorker/runSubtask][inv_1fCFmQ9ulbxL2MBwYCDRgV8Was8PDBedW1] dev.restate.sdk.core.InvocationStateMachine - End invocation
        # !mark green
        2025-03-06 12:20:27 INFO  [FanOutWorker/runSubtask][inv_18T9WW6paOhm6eciCeBt5iqHXRY4h2NRvP] FanOutWorker - Execution subtask finished: shower
        2025-03-06 12:20:27 INFO  [FanOutWorker/runSubtask][inv_18T9WW6paOhm6eciCeBt5iqHXRY4h2NRvP] dev.restate.sdk.core.InvocationStateMachine - End invocation
        2025-03-06 12:20:27 INFO  [FanOutWorker/run][inv_1fGEUyfogPKK5cbSCSWzpCkcDpkQIKSzMB] FanOutWorker - Aggregated result: get out of bed: DONE, shower: DONE, make coffee: DONE, have breakfast: DONE
        2025-03-06 12:20:27 INFO  [FanOutWorker/run][inv_1fGEUyfogPKK5cbSCSWzpCkcDpkQIKSzMB] dev.restate.sdk.core.InvocationStateMachine - End invocation
        ```
        ```shell !!tabs python
        # !mark gold
        [2025-01-17 12:00:05,183] [12245] [INFO] - Started executing subtask: get out of bed
        # !mark green
        [2025-01-17 12:00:05,184] [12247] [INFO] - Started executing subtask: shower
        # !mark blue
        [2025-01-17 12:00:05,184] [12245] [INFO] - Started executing subtask: make coffee
        # !mark red
        [2025-01-17 12:00:05,185] [12245] [INFO] - Started executing subtask: have breakfast
        # !mark blue
        [2025-01-17 12:00:05,188] [12245] [INFO] - Execution subtask finished: make coffee
        # !mark gold
        [2025-01-17 12:00:08,193] [12245] [INFO] - Execution subtask finished: get out of bed
        # !mark green
        [2025-01-17 12:00:10,194] [12247] [INFO] - Execution subtask finished: shower
        # !mark red
        [2025-01-17 12:00:15,196] [12245] [INFO] - Execution subtask finished: have breakfast
        [2025-01-17 12:00:15,198] [12245] [INFO] - Aggregated result: get out of bed: DONE,shower: DONE,make coffee: DONE,have breakfast: DONE
        ```
        ```shell !!tabs go
        2025/01/16 16:41:22 INFO Handling invocation method=FanOutWorker/Run invocationID=inv_1lkcVTBmCorR3fSPhE0pNTiO8XFXoV34C5
        2025/01/16 16:41:22 INFO Handling invocation method=FanOutWorker/RunSubtask invocationID=inv_1jpZWOrDK45b2ZwWCapl68GgXzNfoOh0BP
        # !focus
        # !mark gold
        2025/01/16 16:41:22 Started executing subtask: get out of bed
        2025/01/16 16:41:22 INFO Handling invocation method=FanOutWorker/RunSubtask invocationID=inv_10eVGnmjP1ET4PgI3z82rvXcVlCnSOep3P
        # !focus
        # !mark green
        2025/01/16 16:41:22 Started executing subtask: shower
        2025/01/16 16:41:22 INFO Handling invocation method=FanOutWorker/RunSubtask invocationID=inv_1i3RduoDMNnb4ideAtWaWCLRDaIO62eghP
        # !focus
        # !mark blue
        2025/01/16 16:41:22 Started executing subtask: make coffee
        2025/01/16 16:41:22 INFO Handling invocation method=FanOutWorker/RunSubtask invocationID=inv_142WnXnWDxfy6k4JanZ7DQVqAL6zmktuxP
        # !focus
        # !mark red
        2025/01/16 16:41:22 Started executing subtask: have breakfast
        # !focus
        # !mark gold
        2025/01/16 16:41:24 Execution subtask finished: get out of bed
        2025/01/16 16:41:24 INFO Invocation completed successfully method=FanOutWorker/RunSubtask invocationID=inv_1jpZWOrDK45b2ZwWCapl68GgXzNfoOh0BP
        # !focus
        # !mark green
        2025/01/16 16:41:25 Execution subtask finished: shower
        2025/01/16 16:41:25 INFO Invocation completed successfully method=FanOutWorker/RunSubtask invocationID=inv_10eVGnmjP1ET4PgI3z82rvXcVlCnSOep3P
        # !focus
        # !mark red
        2025/01/16 16:41:25 Execution subtask finished: have breakfast
        2025/01/16 16:41:25 INFO Invocation completed successfully method=FanOutWorker/RunSubtask invocationID=inv_142WnXnWDxfy6k4JanZ7DQVqAL6zmktuxP
        # !focus
        # !mark blue
        2025/01/16 16:41:26 Execution subtask finished: make coffee
        2025/01/16 16:41:26 INFO Invocation completed successfully method=FanOutWorker/RunSubtask invocationID=inv_1i3RduoDMNnb4ideAtWaWCLRDaIO62eghP
        2025/01/16 16:41:26 Aggregated result: get out of bed: DONE,shower: DONE,have breakfast: DONE,make coffee: DONE
        2025/01/16 16:41:26 INFO Invocation completed successfully method=FanOutWorker/Run invocationID=inv_1lkcVTBmCorR3fSPhE0pNTiO8XFXoV34C5
        ```
    </CodeWithTabs>
</Step>

## Related resources

- Promise combinator docs: [TS](/develop/ts/journaling-results#combineable-promise-combinators) /
[Java/Kotlin](/develop/java/journaling-results#durable-future-combinators) /
[Python](/develop/python/journaling-results#waiting-multiple-futures) /
[Go](/develop/go/journaling-results#selectors) /
[Rust](https://docs.rs/restate-sdk/latest/restate_sdk/macro.select.html)
- [Async Tasks use case page](/use-cases/async-tasks)
- Concurrent async tasks with [Java](https://github.com/restatedev/examples/blob/main/java/patterns-use-cases/README.md#concurrent-async-tasks)