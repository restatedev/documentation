---
sidebar_position: 6
description: "Explore interacting with Restate's state store."
---

# Managing state
Restate offers durable storage of application state, with support for key-value state that can be retrieved, set, and cleared via its key. Enabling this feature requires no additional setup.

## Retrieving state
To retrieve state in Restate, you can call the following method on the Restate context object from within your service method:

```typescript
const myValue: string | null = await restateContext.get<string>("my-key");
```

Replace "my-key" with the key you want to retrieve. This will either return the value that was stored or it will return null if no value was stored. In the example above, the value stored is a string, but you can store any type that can be serialized as a buffer. For example, to retrieve a number type, you could use the following code:

```typescript
const myValue = (await restateContext.get<number>("my-key")) || 0;
```

This would retrieve the value of the `my-key` key. If the value is null, then it will return 0.

## Setting state
To set state in Restate,
you can call the following method on the Restate context object from within your service method:

```typescript
restateContext.set("my-key", "my-value");
```

Replace `my-key` with the key that you are setting.
And replace `my-value` with the value that you want to set.
The value can be of any type that can be serialized as a Buffer.

## Clearing state
To delete the value of a key in Restate,
you can call the following method on the Restate context object from within your service method:

```typescript
restateContext.clear("my-key");
```

Replace `my-key` with the key that you are setting.