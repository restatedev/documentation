import uuid

from restate import Service, ObjectContext

from auxiliary.email_client import EmailClient
from auxiliary.payment_client import PaymentClient
from tour import Order

payment_client = PaymentClient()
email_client = EmailClient()

checkout = Service("CheckoutService")


# <start_checkout>
@checkout.handler()
async def handle(ctx: ObjectContext, order: Order) -> bool:
    # withClass highlight-line
    total_price = len(order['tickets']) * 40

    idempotency_key: str = await ctx.run("idempotency_key", lambda: str(uuid.uuid4()))

    # withClass(1:3) highlight-line
    async def pay():
        return await payment_client.call(idempotency_key, total_price)
    success = await ctx.run("payment", pay)

    return success
# <end_checkout>
