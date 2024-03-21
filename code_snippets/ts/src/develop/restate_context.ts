import * as restate from "@restatedev/restate-sdk";

// 1. For unkeyed router
// highlight-next-line
const greet = async (ctx: restate.Context, name: string) => {
    //...the rest of your code...
};

// 2. For keyed router
// highlight-next-line
const greetKeyed = async (ctx: restate.KeyedContext, name: string) => {
    //...the rest of your code...
};