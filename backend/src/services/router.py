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

    # La clase Router se encarga de dirigir las solicitudes hacia el servicio apropiado.
    # It initializes with a dictionary of endpoints and their corresponding service instances.
    #
    def __init__(self):

        # Inicializa con un diccionario de 'endpoints' y sus instancias de servicios correspondientes

        self.routes = {
            PRODUCTS_ENDPOINT: ProductService(),
            SAVE_ORDER_ENDPOINT: OrderService(),
            UPDATE_ORDER_STATUS_ENDPOINT: OrderService(),
            CREATE_PREFERENCE_ENDPOINT: MercadopagoService(),
        }

    def get_service_instance(self, path): # Devuelve una instancia del servicio asociado con el 'endpoint' recibido
        return self.routes.get(path)
