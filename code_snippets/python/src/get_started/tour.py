# Copyright (c) 2024 - Restate Software, Inc., Restate GmbH
#
# This file is part of the Restate examples,
# which is released under the MIT license.
#
# You can find a copy of the license in the file LICENSE
# in the root directory of this repository or package or at
# https://github.com/restatedev/examples/
import uuid
from datetime import timedelta
from typing import TypedDict, List

from restate import VirtualObject
from restate.context import ObjectContext, Serde
from restate.service import Service

from src.get_started.auxiliary.email_client import EmailClient
from src.get_started.auxiliary.payment_client import PaymentClient

cart = VirtualObject("CartObject")


@cart.handler()
async def handle(ctx: ObjectContext, order: str) -> bool:
    ticket_id = ""

    # <start_sleep>
    await ctx.sleep(delta=timedelta(minutes=15))
    # <end_sleep>

    # <start_sleep_and_send>
    await ctx.sleep(delta=timedelta(minutes=15))
    ctx.object_send(unreserve, key=ticket_id, arg=None)
    # <end_sleep_and_send>

    return True


ticket = VirtualObject("TicketObject")


@ticket.handler()
async def unreserve(ctx: ObjectContext) -> bool:
    return True


class Order(TypedDict):
    user_id: str
    tickets: List[str]


checkout = Service("CheckoutService")


# <start_uuid>
@checkout.handler()
async def handle(ctx: ObjectContext, order: Order) -> bool:
    # withClass(1:3) highlight-line
    idempotency_key = await ctx.run("idempotency_key", lambda: str(uuid.uuid4()))
    print("My idempotency key is: ", idempotency_key)
    raise Exception("Something happened!")

    return True
# <end_uuid>


payment_client = PaymentClient()
email_client = EmailClient()


# <start_checkout>
@checkout.handler()
async def handle(ctx: ObjectContext, order: Order) -> bool:
    # withClass highlight-line
    total_price = len(order['tickets']) * 40

    idempotency_key = await ctx.run("idempotency_key", lambda: str(uuid.uuid4()))

    # withClass(1:3) highlight-line
    async def pay():
        return await payment_client.call(idempotency_key, total_price)
    success = await ctx.run("payment", pay)

    return success
# <end_checkout>
