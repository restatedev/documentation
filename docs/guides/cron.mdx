---
title: "Cron Jobs"
description: "Schedule tasks periodically with Restate."
pagination_next: null
pagination_prev: null
---

import Admonition from "@theme/Admonition";
import {CodeWithTabs} from "../../src/components/code/code";
import {Step} from "../../src/components/Stepper";

# Cron Jobs


This guide shows how to use the Restate to **schedule cron jobs**.

<Admonition type={"tip"} title={"What is a cron job?"}>
    A cron job is a scheduled task that runs periodically at a specified time or interval. It is often used for background tasks like cleanup or sending notifications.
</Admonition>

Restate has no built-in functionality for cron jobs.
But Restate's durable building blocks make it easy to implement a service that does this for us, and uses the guarantees Restate gives to make sure tasks get executed reliably.

Restate has many features that make it a good fit for implementing cron jobs:
- **Durable timers**: Schedule tasks to run at a specific time in the future. Restate ensures execution.
- **Task resiliency**: Restate ensures that tasks are retried until they succeed.
- **Task control**: Cancel and inspect running jobs.
- **K/V state**: We store the details of the cron jobs in Restate, so we can retrieve them later and query them from the outside.
- **FaaS support**: Run your services on FaaS infrastructure, like AWS Lambda. Restate will scale your scheduler and tasks to zero while they sleep.
- **Scalability**: Restate can handle many cron jobs running in parallel, and can scale horizontally to handle more load.
- **Observability**: See the execution history of the cron jobs, and their status in the Restate UI.

<img src={"/img/guides/cron/cron_state_ui.png"}/>


## Example

The example implements a **cron service that you can copy over to your own project**.

Usage:
1. Send requests to `CronJobInitiator.create()` to start new jobs with standard [cron expressions](https://www.baeldung.com/cron-expressions):
    ```shell
    {
        "cronExpression": "0 0 * * *", # E.g. run every day at midnight
        "service": "TaskService", # Schedule any Restate handler
        "method": "executeTask",
        "key": "taskId", # Optional, Virtual Object key
        "payload": "Hello midnight!"
    }
    ```
2. Each job gets a unique ID and runs as a CronJob virtual object
3. Jobs automatically reschedule themselves after each execution


<img src={"/img/guides/cron/cron-jobs-diagram.png"} width={"600px"}/>

<CodeWithTabs groupId={"sdk"}>
    ```ts !!tabs TypeScript https://github.com/restatedev/examples/blob/main/typescript/patterns-use-cases/src/cron/cron_service.ts
    // collapse_prequel
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/typescript/patterns-use-cases/src/cron/cron_service.ts
    ```

    ```java !!tabs Java https://github.com/restatedev/examples/blob/main/java/patterns-use-cases/src/main/java/my/example/cron/Cron.java
    // collapse_prequel
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/java/patterns-use-cases/src/main/java/my/example/cron/Cron.java
    ```
    ```go !!tabs Go https://github.com/restatedev/examples/blob/main/go/patterns-use-cases/src/cron/cron.go
    // collapse_prequel
    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/go/patterns-use-cases/src/cron/cron.go
    ```
</CodeWithTabs>

<Admonition type={"note"} title={"Example not available in your language?"}>
    This pattern is implementable with any of our SDKs. We are still working on translating all patterns to all SDK languages.
    If you need help with a specific language, please reach out to us via [Discord](https://discord.com/invite/skW3AZ6uGd) or [Slack](https://join.slack.com/t/restatecommunity/shared_invite/zt-2v9gl005c-WBpr167o5XJZI1l7HWKImA).
</Admonition>

## Adapt to your use case

Note that this implementation is fully resilient, but you might need to make some adjustments to make this fit your use case:
- Take into account time zones.
- Adjust how you want to handle tasks that fail until the next task gets scheduled. With the current implementation, you would have concurrent executions of the same cron job (one retrying and the other starting up).
  If you want to cancel the failing task when a new one needs to start, you can do the following: at the beginning of the `execute` call, retrieve the `next_execution_id` from the job state and check if it is completed by [attaching to it](/develop/ts/service-communication#re-attach-to-an-invocation) with [a timeout set to 0](/develop/ts/journaling-results#combineable-promise-combinators). If it is not completed, [cancel it](/develop/ts/service-communication#cancel-an-invocation) and start the new iteration.

## Running the example

<Step stepLabel="1" title="Download the example">
    <CodeWithTabs groupId={"sdk"} className={"display-none"}>
        ```shell !!tabs ts
        restate example typescript-patterns-use-cases && cd typescript-patterns-use-cases
        ```
        ```shell !!tabs java
        restate example java-patterns-use-cases && cd java-patterns-use-cases
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
        npx tsx watch ./src/cron/task_service.ts
        ```
        ```shell !!tabs java
        ./gradlew -PmainClass=my.example.cron.TaskService run
        ```
        ```shell !!tabs go
        go run ./src/cron
        ```
    </CodeWithTabs>
</Step>
<Step stepLabel="4" title="Register the services">
    ```shell
    restate deployments register localhost:9080
    ```
</Step>
<Step stepLabel="5" title="Send a request">

    For example, run `executeTask` every minute:
    <CodeWithTabs groupId={"sdk"} className={"display-none"}>
        ```shell !!tabs ts
        curl localhost:8080/CronJobInitiator/create --json '{
            "cronExpression": "* * * * *",
            "service": "TaskService",
            "method": "executeTask",
            "payload": "Hello new minute!"
        }'
        ```

        ```shell !!tabs java
        curl localhost:8080/CronJobInitiator/create --json '{
            "cronExpression": "* * * * *",
            "service": "TaskService",
            "method": "executeTask",
            "payload": "Hello new minute!"
        }'
        ```
        ```shell !!tabs go
        curl localhost:8080/CronJobInitiator/Create --json '{
            "cronExpression": "* * * * *",
            "service": "TaskService",
            "method": "executeTask",
            "payload": "Hello new minute!"
        }'
        ```
    </CodeWithTabs>

    For example, or run `executeTask` at midnight:
    <CodeWithTabs groupId={"sdk"} className={"display-none"}>
        ```shell !!tabs ts
        curl localhost:8080/CronJobInitiator/create --json '{
            "cronExpression": "0 0 * * *",
            "service": "TaskService",
            "method": "executeTask",
            "payload": "Hello midnight!"
        }'
        ```

        ```shell !!tabs java
        curl localhost:8080/CronJobInitiator/create --json '{
            "cronExpression": "0 0 * * *",
            "service": "TaskService",
            "method": "executeTask",
            "payload": "Hello midnight!"
        }'
        ```

        ```shell !!tabs go
        curl localhost:8080/CronJobInitiator/Create --json '{
            "cronExpression": "0 0 * * *",
            "service": "TaskService",
            "method": "executeTask",
            "payload": "Hello midnight!"
        }'
        ```
    </CodeWithTabs>

    You can also use the cron service to execute handlers on Virtual Objects, by specifying the Virtual Object key in the request.

    You will get back a response with the job ID.

    Using the job ID, you can then get information about the job:
    <CodeWithTabs groupId={"sdk"} className={"display-none"}>
        ```shell !!tabs ts
        curl localhost:8080/CronJob/myJobId/getInfo
        ```
        ```shell !!tabs java
        curl localhost:8080/CronJob/myJobId/getInfo
        ```
        ```shell !!tabs go
        curl localhost:8080/CronJob/myJobId/GetInfo
        ```
    </CodeWithTabs>

    Or cancel the job later:
    <CodeWithTabs groupId={"sdk"} className={"display-none"}>
        ```shell !!tabs ts
        curl localhost:8080/CronJob/myJobId/cancel
        ```
        ```shell !!tabs java
        curl localhost:8080/CronJob/myJobId/cancel
        ```
        ```shell !!tabs go
        curl localhost:8080/CronJob/myJobId/Cancel
        ```
    </CodeWithTabs>
</Step>

<Step stepLabel="4" title="Check the scheduled tasks and state">
    In the UI, you can see how the tasks are scheduled, and how the state of the cron jobs is stored in Restate.

    <img src={"/img/guides/cron/cron_service_schedule.png"}/>
    <img src={"/img/guides/cron/cron_state_ui.png"}/>

    You can kill and restart any of the services or the Restate Server, and the scheduled tasks will still be there.
</Step>
