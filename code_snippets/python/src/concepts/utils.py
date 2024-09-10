
class PaymentClient:
    async def charge(self, id: str, token: str, amount: int) -> bool:
        return True


class EmailClient:
    async def send_success_notification(self, mail: str) -> bool:
        return True


class Restaurant:
    def prepare(self, order_id: str, preparation_id: str):
        return True
