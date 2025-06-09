import logging

from pydantic import BaseModel

logger = logging.getLogger(__name__)


class FlightRequest(BaseModel):
    flight_id: str
    passenger_name: str


async def reserve(customer_id: str, request: FlightRequest):
    # this should implement the communication with the flight
    # provider's APIs
    logging.info(f"Flight reservation cancelled for customer: {customer_id}")
    return "my id"


async def cancel(booking_id: str):
    # this should implement the communication with the flight
    # provider's APIs
    logging.info(f"Flight reservation cancelled for customer: {booking_id}")


async def confirm(booking_id: str):
    # this should implement the communication with the flight
    # provider's APIs
    logging.info(f"Flight reservation cancelled for customer: {booking_id}")
