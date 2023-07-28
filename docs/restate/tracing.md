---
sidebar_position: 4
description: "Find out how to export traces of your invocations."
---

# Tracing

Restate supports the following tracing features:

* Runtime execution tracing per invocation
* Exporting traces to OTLP-compatible systems (e.g. Jaeger)
* Correlating parent traces of incoming gRPC/Connect HTTP requests, using the [W3C TraceContext](https://github.com/w3c/trace-context) specification.

## Setup OTLP exporter

To set up the OTLP exporter, you need to set the configuration entry `observability.tracing.endpoint` to point to your trace collector.
The exporter sends OTLP trace data via gRPC ([OTLP exporter](https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md)).


### Exporting OTLP traces to Jaeger

Jaeger accepts OTLP trace data via gRPC on port `4317`.

:::note
Start Jaeger with the environment variable `COLLECTOR_OTLP_ENABLED=true` to enable OTLP.
:::

Refer to the [Jaeger documentation](https://www.jaegertracing.io/docs/1.46/deployment/) for more details on how to deploy Jaeger.

:::note
Configure the tracing endpoint in Restate as a fully specified URL: `http://<jaeger-collector>:4317`.
:::

You can configure a span/event filter in a similar fashion to the [Log filter](#log-filter) setting the `observability.tracing.filter` configuration entry.

## Setup Jaeger file exporter

If you can't configure a Jaeger agent, you can still export traces writing them to files, using the Jaeger JSON format. In order to do so, setup the configuration entry `observability.tracing.json_file_export_path` pointing towards the path where trace files should be written.

You can import the trace files using the Jaeger UI:

![Jaeger UI File import](/img/jaeger-import-file.png)

## Understanding traces

Similarly to logs, traces export [attributes/tags](#components-and-log-event-context-fields) that correlates the trace with the service and/or invocation. For example, you can filter directly in the Jaeger UI all the traces belonging to the service `org.example.ExampleService` by setting the tag filter `rpc.service=org.example.ExampleService`.

Restate traces don't look like traditional HTTP server traces, because of the inner workings of Restate and OpenTelemetry/Jaeger. For each invocation, a span named `service_invocation` is created to mark the beginning of the invocation, and a child span `end_invocation` is created to mark the end of an invocation. You can easily check for every invocation if it ended or not by checking whether the span `service_invocation` has the `end_invocation` child or not.

The spans `ingress_service_invocation` informs when the gRPC/Connect HTTP request is received, and `invoker_invocation_task` informs when the runtime invokes the service endpoint to process the request.

![Jaeger trace](/img/jaeger-trace.png)

When a service invokes another service, the child invocation will be automatically linked to the span `service_invocation` of the parent invocation.

We recommend to set up either Jaeger or Jaeger File trace exporter with filter `info,restate_worker::partition::effects=debug`. With this filter, the traces will also contain all the steps executed by the Restate internal state machine to drive the invocation to completion.
