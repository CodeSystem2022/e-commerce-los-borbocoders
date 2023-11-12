import os
from http.server import BaseHTTPRequestHandler

from dotenv import load_dotenv

from services.router import Router
from utils.error_handler import ErrorHandler

load_dotenv()

PRODUCTS_ENDPOINT = os.getenv('PRODUCTS_ENDPOINT')
SAVE_ORDER_ENDPOINT = os.getenv('SAVE_ORDER_ENDPOINT')
UPDATE_ORDER_STATUS_ENDPOINT = os.getenv('UPDATE_ORDER_STATUS_ENDPOINT')
CREATE_PREFERENCE_ENDPOINT = os.getenv('CREATE_PREFERENCE_ENDPOINT')


class RequestHandlerService(BaseHTTPRequestHandler):
    router = Router()

    # La clase RequestHandlerService es una clase que aplica herencia de la clase BaseHTTPRequestHandler con el objetivo de procesar las solicitudes http.

    #  do_GET(): Se encarga de procesar las solicitudes HTTP GET derivandolas a la instancia de servicio que corresponda.
    def do_GET(self):

        path = self.path

        service_instance = self.router.get_service_instance(path)

        try:
            if service_instance:
                service_instance.do_GET(self)
            else:
                ErrorHandler.handle_error(self, 404, f"Resource not found: {path}")
        except Exception as e:
            ErrorHandler.handle_error(self, 500, "An error occurred: {}".format(str(e)))

    # do_POST(): Se encarga de procesar las solicitudes HTTP POST derivandolas a la instancia de servicio que corresponda.
    def do_POST(self):

        path = self.path

        service_instance = self.router.get_service_instance(path)

        try:
            if service_instance:
                service_instance.do_GET(self)
            else:
                ErrorHandler.handle_error(self, 404, f"Resource not found: {path}")
        except Exception as e:
            ErrorHandler.handle_error(self, 500, "An error occurred: {}".format(str(e)))
