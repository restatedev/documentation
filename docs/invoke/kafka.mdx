---
sidebar_position: 3
description: "Invoke handlers via Kafka events."
---

import {SubtleStep} from "../../src/components/Stepper";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';

# Kafka

You can invoke handlers via Kafka events, by doing the following:

<Admonition type="info">
    Make sure to first [register the handler](/operate/registration) you want to invoke.
</Admonition>

<SubtleStep stepLabel="1" title="Develop an event handler">

    You can invoke any handler via Kafka events.
    The event payload will be (de)serialized as JSON.

    - When invoking **Virtual Object** or **Workflow** handlers via Kafka, the key of the Kafka record will be used to determine the Virtual Object/Workflow key.
    The key needs to be a valid UTF-8 string.
    The events are delivered to the subscribed handler in the order in which they arrived on the topic partition.
    - When invoking **Virtual Object** or **Workflow** _shared_ handlers via Kafka, the key of the Kafka record will be used to determine the Virtual Object/Workflow key.
    The key needs to be a valid UTF-8 string.
    The events are delivered to the subscribed handler in parallel without ordering guarantees.
    - When invoking **Service** handlers over Kafka, events are delivered in parallel without ordering guarantees.

    <Admonition type="tip" title="Combining RPC and Kafka within a service/handler">
        Since you can invoke any handler via Kafka events, a single handler can be invoked both by RPC and via Kafka.
    </Admonition>

</SubtleStep>

<SubtleStep stepLabel="2" title="Configure Restate to connect to a Kafka cluster">
    Define the Kafka cluster that Restate needs to connect to in the [Restate configuration file](/operate/configuration/server#configuration-file):

    ```toml restate.toml
    [[ingress.kafka-clusters]]
    name = "my-cluster"
    brokers = ["PLAINTEXT://broker:9092"]
    ```

    And make sure the Restate Server uses it via `restate-server --config-file restate.toml`.

    Check the [configuration docs](/operate/configuration/server) for more details.

    <details className={"grey-details"}>
        <summary>Configuring Kafka clusters via environment variables</summary>

        You can also configure the Kafka clusters via the `RESTATE_INGRESS__KAFKA_CLUSTERS` environment variable:

        ```bash
        RESTATE_INGRESS__KAFKA_CLUSTERS=[{name="my-cluster",brokers=["PLAINTEXT://broker:9092"]}]
        ```
    </details>
</SubtleStep>
<SubtleStep stepLabel="3" title={<span><a href={"/operate/registration"}>Register the service</a> you want to invoke.</span>}/>

<SubtleStep stepLabel="4" title="Subscribe the event handler to the Kafka topic">
    Let Restate forward events from the Kafka topic to the event handler by creating a subscription using the [Admin API](/category/admin-api):

    ```bash
    curl localhost:9070/subscriptions --json '{
            "source": "kafka://my-cluster/my-topic",
            "sink": "service://MyService/handle",
            "options": {"auto.offset.reset": "earliest"}
        }'
    ```

    Once you've created a subscription, Restate immediately starts consuming events from Kafka.
    The handler will be invoked for each event received from Kafka.

    The `options` field is optional and accepts any configuration parameter from [librdkafka configuration](https://github.com/confluentinc/librdkafka/blob/master/CONFIGURATION.md).

</SubtleStep>

<Admonition type="info" title="Managing subscriptions">
    Have a look at the [invocation docs](/operate/invocation#managing-kafka-subscriptions) for more commands to manage subscriptions.
</Admonition>

<details className="grey-details">
    <summary>Kafka connection configuration</summary>

    You can pass arbitrary Kafka cluster options in the `restate.toml`, and those options will be applied for all the subscriptions to that cluster, for example:

    ```toml restate.toml
    [[ingress.kafka-clusters]]
    name = "my-cluster"
    brokers = ["PLAINTEXT://broker:9092"]
    "sasl.username" = "me"
    "sasl.password" = "pass"
    ```

    For the full list of options, check [librdkafka configuration](https://github.com/confluentinc/librdkafka/blob/master/CONFIGURATION.md).
</details>

<details className="grey-details">
    <summary>Multiple Kafka clusters support</summary>

    You can configure multiple kafka clusters in the `restate.toml` file:

    ```toml restate.toml
    [[ingress.kafka-clusters]]
    name = "my-cluster-1"
    brokers = ["PLAINTEXT://localhost:9092"]

    [[ingress.kafka-clusters]]
    name = "my-cluster-2"
    brokers = ["PLAINTEXT://localhost:9093"]
    ```

    And then, when creating the subscriptions, you refer to the specific cluster by `name`:

    ```bash
    # Subscription to my-cluster-1
    curl localhost:9070/subscriptions --json '{
            "source": "kafka://my-cluster-1/topic-1",
            "sink": "service://MyService/handleCluster1"
        }'

    # Subscription to my-cluster-2
    curl localhost:9070/subscriptions --json '{
            "source": "kafka://my-cluster-2/topic-2",
            "sink": "service://MyService/handleCluster2"
        }'
    ```
</details>

<Tabs groupId="sdk" queryString>
    <TabItem value="ts" label="TypeScript">

<details className="grey-details">
    <summary>Raw event support</summary>

    By default handlers will deserialize the event payload as JSON.
    By using serdes `restate.serde.binary` you can override this behaviour. Check [Typescript SDK > Serialization](../develop/ts/serialization) for more details.
</details>

<details className="grey-details">
    <summary>Event metadata</summary>

    Each event carries within the `CODE_LOAD::ts/src/develop/kafka.ts#headers` map the following entries:

    * `restate.subscription.id`: The subscription identifier, as shown by the [Admin API](/category/admin-api).
    * `kafka.offset`: The record offset.
    * `kafka.partition`: The record partition.
    * `kafka.timestamp`: The record timestamp.

</details>

    </TabItem>
    <TabItem value="java" label="Java">


<details className="grey-details">
    <summary>Raw event support</summary>

    By default handlers will deserialize the event payload as JSON.
    By declaring the handler input parameter as `byte[]` and annotating it `@Raw` the JSON deserialization will be skipped, and the event payload will be passed as is.
</details>

<details className="grey-details">
    <summary>Event metadata</summary>

    Each event carries within the `CODE_LOAD::java/src/main/java/develop/MyKafkaVirtualObject.java#headers` map the following entries:

    * `restate.subscription.id`: The subscription identifier, as shown by the [Admin API](/category/admin-api).
    * `kafka.offset`: The record offset.
    * `kafka.partition`: The record partition.
    * `kafka.timestamp`: The record timestamp.

</details>

</TabItem>
<TabItem value="go" label="Go">

<details className="grey-details">
<summary>Event metadata</summary>

Each event carries within the `CODE_LOAD::go/develop/kafka.go#headers` map the following entries:

* `restate.subscription.id`: The subscription identifier, as shown by the [Admin API](/category/admin-api).
* `kafka.offset`: The record offset.
* `kafka.partition`: The record partition.
* `kafka.timestamp`: The record timestamp.

</details>

</TabItem>
    </Tabs>
