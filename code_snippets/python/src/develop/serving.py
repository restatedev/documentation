from src.develop.my_service import my_service
from src.develop.my_virtual_object import my_virtual_object

# <start_endpoint>
import restate
app = restate.app(services=[my_service, my_virtual_object])
# <end_endpoint>

