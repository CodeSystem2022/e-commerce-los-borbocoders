import os
from dotenv import load_dotenv
from http.server import BaseHTTPRequestHandler
from services.order_service import OrderService
from services.product_service import ProductService
from services.mercadopago_service import MercadopagoService

load_dotenv()

PRODUCTS_ENDPOINT = os.getenv('PRODUCTS_ENDPOINT')
SAVE_ORDER_ENDPOINT = os.getenv('SAVE_ORDER_ENDPOINT')
UPDATE_ORDER_STATUS_ENDPOINT = os.getenv('UPDATE_ORDER_STATUS_ENDPOINT')
CREATE_PREFERENCE_ENDPOINT = os.getenv('CREATE_PREFERENCE_ENDPOINT')

# Diccionario de Servicios

services = {
    PRODUCTS_ENDPOINT: ProductService(),
    SAVE_ORDER_ENDPOINT: OrderService(),
    UPDATE_ORDER_STATUS_ENDPOINT: OrderService(),
    CREATE_PREFERENCE_ENDPOINT: MercadopagoService(),
}


class RequestHandlerService(BaseHTTPRequestHandler):

    
    # La clase RequestHandlerService es una clase que aplica herencia de la clase BaseHTTPRequestHandler con el objetivo de procesar las solicitudes http.

    #  do_GET(): Se encarga de procesar las solicitudes HTTP GET derivandolas a la instancia de servicio que corresponda.
    def do_GET(self):
        path = self.path

        if path in services:
            service_instance = services[path]
            service_instance.do_GET(self)

        else:
            # handle error
            pass


    # do_POST(): Se encarga de procesar las solicitudes HTTP POST derivandolas a la instancia de servicio que corresponda.        
    def do_POST(self):
        path = self.path

        if path in services:
            service_instance = services[path]
            service_instance.do_POST(self)
        else:
            # handle error
            pass

