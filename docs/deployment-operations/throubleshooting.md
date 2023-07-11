---
sidebar_position: 6
---

# Throubleshooting

This page describes some known throubleshooting scenarios when operating Restate. 

## Sleep/Delayed call and other Timers operations are triggered too early/too late

Make sure the system clock of the runtime is synchronized with the clock of the service endpoint and they use the same time zone.

When you do timer-based actions with the SDK (e.g. sleep, delayed calls), their execution time gets calculated based on the system clock of the service endpoint. But subsequently, the runtime registers these timer on its own system clock. So if these two clocks are out-of-sync, you get unwanted behavior.
