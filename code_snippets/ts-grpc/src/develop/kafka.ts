import * as restate from "@restatedev/restate-sdk";
import {MyEvent, MyService} from "../generated/proto/example-kafka";
import {Empty} from "../generated/proto/google/protobuf/empty";

export class MyServiceImpl implements MyService {
    //highlight-start
    async handleEvent(request: MyEvent): Promise<Empty> {
        const ctx = restate.useKeyedContext(this);
        const payload = request.payload;
        // ... Handle event ... //
        return {};
    }
    //highlight-end
}