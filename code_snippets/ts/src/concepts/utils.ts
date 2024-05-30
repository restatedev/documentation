import * as restate from "@restatedev/restate-sdk";
import {ObjectContext} from "@restatedev/restate-sdk";

export enum Status {
    NEW = "NEW",
    CREATED = "CREATED",
    SCHEDULED = "SCHEDULED",
    IN_PREPARATION = "IN_PREPARATION",
    SCHEDULING_DELIVERY = "SCHEDULING_DELIVERY",
    WAITING_FOR_DRIVER = "WAITING_FOR_DRIVER",
    IN_DELIVERY = "IN_DELIVERY",
    DELIVERED = "DELIVERED",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED",
    UNKNOWN = "UNKNOWN"
}

export type Order = {
    id: string;
    totalCost: number;
    deliveryDelay: number;
}

export const deliveryManager = restate.object({
    name: "delivery_manager",
    handlers: {
        startDelivery: async(ctx: ObjectContext, order: Order) => {},
    }
});



export class RestaurantClientImpl {
    async prepare(id: string, order: Order) {
    }
}

export const restaurant = new RestaurantClientImpl();

export class PaymentClient {
    async charge(id: string, token: string, amount: number): Promise<boolean> {
        return true;
    }
}

export const paymentClnt= new PaymentClient();

export class EmailClient {
    async sendSuccessNotification(emailAddress: string): Promise<boolean> {
        return true;
    }
}

export const emailClnt = new EmailClient();