/*
 * Copyright (c) 2024 - Restate Software, Inc., Restate GmbH
 *
 * This file is part of the Restate examples,
 * which is released under the MIT license.
 *
 * You can find a copy of the license in the file LICENSE
 * in the root directory of this repository or package or at
 * https://github.com/restatedev/examples/
 */

import * as restate from "@restatedev/restate-sdk";

// <start_here>
const myWorkflow = restate.workflow({
    name: "MyWorkflow",
    handlers: {
        run: async (ctx: restate.WorkflowContext, req: string) => {

            // do some steps...

            // withClass highlight-line
            // Creation of the Durable Promise
            // withClass highlight-line
            const myBooleanSignal = await ctx.promise<boolean>("my_boolean_signal")

            // do some steps...

            return "success";
        },

        interactWithWorkflow: async (ctx: restate.WorkflowSharedContext, signal: boolean) => {
            // withClass highlight-line
            // Resolution of the Durable Promise
            // withClass highlight-line
            ctx.promise<boolean>("my_boolean_signal").resolve(signal);
        },
    },
});
// <end_here>