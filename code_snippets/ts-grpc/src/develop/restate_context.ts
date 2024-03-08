import * as restate from "@restatedev/restate-sdk";
import {Example} from "../generated/proto/example";
import {Empty} from "../generated/proto/google/protobuf/empty";
import {GreetRequest} from "../generated/proto/greeter";

export class UnkeyedGreeter implements Example {
    // <start_unkeyed>
    async greet(request: GreetRequest): Promise<Empty> {
        //highlight-next-line
        const ctx = restate.useContext(this);
        // ... Do something ...
        return {};
    }
    // <end_unkeyed>
}

export class KeyedGreeter implements Example {
    // <start_keyed>
    async greet(request: GreetRequest): Promise<Empty> {
        //highlight-next-line
        const ctx = restate.useKeyedContext(this);
        // ... Do something ...
        return {};
    }
    // <end_keyed>
}
