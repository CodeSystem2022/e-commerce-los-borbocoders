import os

from dotenv import load_dotenv

from services.mercadopago_service import MercadopagoService
from services.order_service import OrderService
from services.product_service import ProductService

load_dotenv()

PRODUCTS_ENDPOINT = os.getenv('PRODUCTS_ENDPOINT')
SAVE_ORDER_ENDPOINT = os.getenv('SAVE_ORDER_ENDPOINT')
UPDATE_ORDER_STATUS_ENDPOINT = os.getenv('UPDATE_ORDER_STATUS_ENDPOINT')
CREATE_PREFERENCE_ENDPOINT = os.getenv('CREATE_PREFERENCE_ENDPOINT')


class Router:
    def __init__(self):
        self.routes = {
            PRODUCTS_ENDPOINT: ProductService(),
            SAVE_ORDER_ENDPOINT: OrderService(),
            UPDATE_ORDER_STATUS_ENDPOINT: OrderService(),
            CREATE_PREFERENCE_ENDPOINT: MercadopagoService(),
        }

    def get_service_instance(self, path):
        return self.routes.get(path)
