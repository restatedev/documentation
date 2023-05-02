---
sidebar_position: 3
description: "Generate Typescript code from your Protobuf definitions."
---

# Service contract
If you're developing a Restate service, the first step is to define the Protobuf schema.
This schema is used as the contract for all communication between the Restate runtime and the service.

To write the Protobuf files, you should follow the guidelines provided in the documentation.
// TODO add link
The guidelines will help you to write the schema in a way that is compatible with Restate.

Once you have written the proto files, you can use a build tool such as [buf](https://buf.build/) or [protoc](https://grpc.io/docs/protoc-installation/) to build the files.
If you are developing your service based on the Restate node template,
you can simply run the following command to generate the Typescript proto definitions:

```shell
npm run proto
```

This command will generate the Typescript definitions for your schema, which you can then use in your service code.
After running the command, you will see a folder named `generated/proto` in your `src` directory.
This folder will contain the generated Protobuf definitions for your service as well as for the Restate extensions
(e.g. to specify what your service key is).
These definitions are essential for communication between your service and other services within the Restate platform.

In addition to the Protobuf definitions, the folder will also contain the Google protobuf descriptors.
These descriptors are required for serializing and deserializing Protobuf messages.
By including them in your service code,
you can ensure that your service can properly communicate with other services on the Restate platform.

After setting up the Protobuf definitions, the next step is to write the actual service methods themselves.