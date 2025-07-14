import json
import typing
from datetime import datetime

from restate.serde import Serde, PydanticJsonSerde
from restate import ObjectContext, VirtualObject
from pydantic import BaseModel


# <start_custom>
class MyData(typing.TypedDict):
    """Represents a response from the GPT model."""

    some_value: str
    my_number: int


class MySerde(Serde[MyData]):
    def deserialize(self, buf: bytes) -> typing.Optional[MyData]:
        if not buf:
            return None
        data = json.loads(buf)
        return MyData(some_value=data["some_value"], my_number=data["some_number"])

    def serialize(self, obj: typing.Optional[MyData]) -> bytes:
        if obj is None:
            return bytes()
        data = {"some_value": obj["some_value"], "some_number": obj["my_number"]}
        return bytes(json.dumps(data), "utf-8")


# <end_custom>


my_object = VirtualObject("MyService")


# <start_using_custom_serde>
# For the input/output serialization of your handlers
@my_object.handler(input_serde=MySerde(), output_serde=MySerde())
async def my_handler(ctx: ObjectContext, greeting: str) -> str:

    # To serialize state
    await ctx.get("my_state", serde=MySerde())
    ctx.set("my_state", MyData(some_value="Hi", my_number=15), serde=MySerde())

    # To serialize awakeable payloads
    ctx.awakeable(serde=MySerde())

    # To serialize the results of actions
    await ctx.run("some-task", some_task, serde=MySerde())

    # etc.

    return "some-output"


# <end_using_custom_serde>


def some_task() -> MyData:
    return MyData(some_value="value", my_number=123)

# <start_using_pydantic>
class Delivery(BaseModel):
    timestamp: datetime
    dimensions: tuple[int, int]


class CompletedDelivery(BaseModel):
    status: str
    timestamp: datetime


# For the input/output serialization of your handlers
@my_object.handler()
async def deliver(ctx: ObjectContext, delivery: Delivery) -> CompletedDelivery:

    # To get state
    await ctx.get("delivery", type_hint=Delivery)

    # To serialize awakeable payloads
    ctx.awakeable(type_hint=Delivery)

    # To serialize the results of actions
    await ctx.run("some-task", do_something, type_hint=Delivery)

    return CompletedDelivery(status="delivered", timestamp=datetime.now())


# <end_using_pydantic>


def do_something() -> Delivery:
    return Delivery(timestamp=datetime.now(), dimensions=(10, 20))