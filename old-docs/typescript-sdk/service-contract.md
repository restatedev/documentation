---
sidebar_position: 3
description: "Generate Typescript code from your Protobuf definitions."
---

# Service contract
If you're developing a Restate service, the first step is to define the [Protobuf schema](https://protobuf.dev/).
This schema is used as the contract for all communication between the Restate runtime and the service.

:::note
To write the Protobuf files in a way that is compatible with Restate, you should follow the guidelines provided [here](./).
[//]: # (TODO add link)
:::

Once you have written the proto files,
you can use a tool such as [buf](https://buf.build/) or [protoc](https://grpc.io/docs/protoc-installation/)
to generate the Typescript files.
The Typescript SDK uses the [ts-proto](https://github.com/stephenh/ts-proto) library
to work with the Typescript code from the Protobuf definitions. 

If you are developing your service based on the Restate node template,
you can simply run the following command to generate the Typescript proto definitions:

```shell
npm run proto
```

This command generates the Typescript definitions for your schema, which you can then use in your service code.
After running the command, you will see a folder named `generated/proto` in your `src` directory.
This folder will contain the generated Protobuf definitions for your service as well as for the Restate extensions (e.g. to specify what your service key is).

After setting up the Protobuf definitions, the next step is to write the actual service methods themselves.