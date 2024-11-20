// <start_here>
import * as restate from "@restatedev/restate-sdk";
import {Context, service} from "@restatedev/restate-sdk";

const greeter = service({
    name: "greeter",
    handlers: {
        greet: async (ctx: Context, greeting: string) => {
            const message = `${greeting}!`;

            await ctx.run(() => sendNotification(message));
            await ctx.sleep(1000)
            await ctx.run(() => sendReminder(message))

            return message;
        },
    },
});
// <end_here>

restate.endpoint().bind(greeter).listen();

// Simulated notification sending operation
const sendNotification = async (message: string) => {
    if (Math.random() < 0.3) { // 30% chance of failure
        throw new Error("Failed to send notification");
    }
    console.log(`Notification sent: ${message}`);
};


// Simulated reminder sending operation
const sendReminder = async (message: string) => {
    if (Math.random() < 0.3) { // 30% chance of failure
        throw new Error("Failed to send notification");
    }
    console.log(`Reminder sent: ${message}`);
};

