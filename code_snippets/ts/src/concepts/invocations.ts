import * as restate from "@restatedev/restate-sdk";
import {roleUpdateService} from "./services";
import {greeterObject} from "./virtual_objects";

const oneWayCallHandler = async (ctx: restate.ObjectContext) => {
    const updateRequest = {
        userId: "Sam Beckett",
        role: {roleKey: "content-manager", roleDescription: "Add/remove documents"},
        permissions: [{permissionKey: "add", setting: "allow"}]
    };
    // <start_one_way_call>
    // Send a message to a service
    ctx.serviceSendClient(roleUpdateService)
        .applyRoleUpdate(updateRequest);

    // Send a message to a virtual object
    ctx.objectSendClient(greeterObject, "Mary")
        .greet({ greeting: "Hi" });
    // <end_one_way_call>
}

const rpcHandler = async (ctx: restate.ObjectContext) => {
    const updateRequest = {
        userId: "Sam Beckett",
        role: { roleKey: "content-manager", roleDescription: "Add/remove documents" },
        permissions : [{ permissionKey: "add", setting: "allow" }]
    };
    // <start_rpc>
    // RPC call to a service
    const success = await ctx.serviceClient(roleUpdateService)
        .applyRoleUpdate(updateRequest);

    // RPC call to a virtual object
    const response = await ctx.objectClient(greeterObject, "Mary")
        .greet({ greeting: "Hi" });
    // <end_rpc>
}

const delayedCallHandler = async (ctx: restate.ObjectContext) => {
    const updateRequest = {
        userId: "Sam Beckett",
        role: { roleKey: "content-manager", roleDescription: "Add/remove documents" },
        permissions : [{ permissionKey: "add", setting: "allow" }]
    };
    // <start_delayed_call>
    // Send a message to a service after a delay
    ctx.serviceSendDelayedClient(roleUpdateService, 1000)
        .applyRoleUpdate(updateRequest);

    // Send a message to a virtual object after a delay
    ctx.objectSendDelayedClient(greeterObject, 5000, "Mary")
        .greet({ greeting: "Hi" });
    // <end_delayed_call>
}
