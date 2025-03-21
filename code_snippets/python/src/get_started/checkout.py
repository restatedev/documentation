import uuid

from restate import Service, ObjectContext

from src.get_started.auxiliary.email_client import EmailClient
from src.get_started.auxiliary.payment_client import PaymentClient
from src.get_started.tour import Order

payment_client = PaymentClient()
email_client = EmailClient()

checkout = Service("CheckoutService")


# <start_checkout>
@checkout.handler()
async def handle(ctx: ObjectContext, order: Order) -> bool:
    # !mark
    total_price = len(order["tickets"]) * 40

    idempotency_key = await ctx.run("idempotency_key", lambda: str(uuid.uuid4()))

    # !mark(1:3)
    async def pay():
        return await payment_client.call(idempotency_key, total_price)

    success = await ctx.run("payment", pay)

    return success


# <end_checkout>
