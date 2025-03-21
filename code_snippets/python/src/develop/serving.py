from src.develop.my_service import my_service
from src.develop.my_virtual_object import my_object

# <start_endpoint>
import restate

app = restate.app(services=[my_service, my_object])
# <end_endpoint>


# <start_identity>
app = restate.app(
    services=[my_service],
    # !mark
    identity_keys=["publickeyv1_w7YHemBctH5Ck2nQRQ47iBBqhNHy4FV7t2Usbye2A6f"],
)
# <end_identity>
