import typing
import uuid
from datetime import timedelta
from typing import TypedDict
from restate import VirtualObject, ObjectContext

from src.concepts.utils import PaymentClient, Restaurant


class Order(TypedDict):
    id: str
    total_cost: int
    delivery_delay: int


payment_client = PaymentClient()
restaurant = Restaurant()

order_workflow = VirtualObject("OrderWorkflow")


# <start_here>
# <mark_1>
@order_workflow.handler()
async def process(ctx: ObjectContext, order: Order):
    # </mark_1>
    # 1. Set status
    # <mark_4>
    ctx.set("status", "CREATED")
    # </mark_4>

    # 2. Handle payment
    # <mark_5>
    token = await ctx.run("token", lambda: str(uuid.uuid4()))

    async def pay():
        await payment_client.charge(order["id"], token, order["total_cost"])

    paid = await ctx.run("payment", pay)
    # </mark_5>

    if not paid:
        # <mark_4>
        ctx.set("status", "REJECTED")
        # </mark_4>
        return

    # 3. Wait until the requested preparation time
    # <mark_4>
    ctx.set("status", "SCHEDULED")
    # </mark_4>
    await ctx.sleep(timedelta(milliseconds=order["delivery_delay"]))

    # 4. Trigger preparation
    # <mark_3>
    preparation_id, preparation_promise = ctx.awakeable(type_hint=str)
    # <mark_5>
    await ctx.run("prepare", lambda: restaurant.prepare(order["id"], preparation_id))
    # </mark_5>
    # </mark_3>
    # <mark_4>
    ctx.set("status", "IN_PREPARATION")
    # </mark_4>
    # <mark_3>
    await preparation_promise
    # </mark_3>

    # <mark_4>
    ctx.set("status", "SCHEDULING_DELIVERY")
    # </mark_4>

    # 5. Find a driver and start delivery
    # <mark_2>
    await ctx.object_call(start_delivery, key=order["id"], arg=order)
    # </mark_2>
    # <mark_4>
    ctx.set("status", "DELIVERED")
    # </mark_4>


# <end_here>


delivery_manager = VirtualObject("DeliveryManager")


@delivery_manager.handler()
async def start_delivery(ctx: ObjectContext, order: Order):
    ctx.set("status", "SCHEDULED")
    await ctx.sleep(timedelta(minutes=5))
    ctx.set("status", "DELIVERED")
    return True
