---
sidebar_position: 9
description: "Customize serialization for SDK actions."
---

# Serialization

Restate sends data over the network for storing state, journaling actions, awakeables, etc.
Therefore, Restate needs to serialize and deserialize the journal entries.

## Default serialization

By default, Typescript SDK uses the built-in [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) support to perform (de)serialization.

## Zod schemas

You can use [Zod](https://zod.dev/) to define the schema of your handler input/output.

Make sure to install the extra dependency for zod integration: `@restatedev/restate-sdk-zod`.

Then do the following:

```typescript
CODE_LOAD::ts/src/develop/serialization.ts#zod
```

## Custom serialization

It is possible to implement customized serialization using the `Serde` interface.

For example, to implement custom serializers for the handler input and output:

```typescript
CODE_LOAD::ts/src/develop/serialization.ts#service_definition
```

When sending a request to a handler configured with custom serde(s) you always need to manually specify them, because the client does not automatically infer what serde(s) should be used.
To customize the serde to use on requests:

```typescript
CODE_LOAD::ts/src/develop/serialization.ts#client
```

To customize the serde for other actions on the context:

```typescript
CODE_LOAD::ts/src/develop/serialization.ts#actions
```
