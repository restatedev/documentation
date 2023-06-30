---
sidebar_position: 5
---

# Throubleshooting

This page describes some known throubleshooting scenarios when operating Restate. 

We suggest checking the [Observability documentation](./observability.md#troubleshooting) for a detailed guide about setting up observability.

## Sleep/Delayed call and other Timers operations are triggered too early/too late

Make sure the system clock of the runtime is synchronized with the clock of the service endpoint and they use the same time zone.

Due to implementation details, Restate uses the service endpoint system clock to choose the timer's wake up time, but the runtime registers the timer on its own system clock.
