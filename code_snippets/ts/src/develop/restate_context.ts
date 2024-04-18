import * as restate from "@restatedev/restate-sdk";

// 1. For Service
// highlight-next-line
const greet = async (ctx: restate.Context, name: string) => {
    //...the rest of your code...
};

// 2. For Virtual Object
// highlight-next-line
const greetKeyed = async (ctx: restate.ObjectContext, name: string) => {
    //...the rest of your code...
};