import os
from dotenv import load_dotenv
from http.server import BaseHTTPRequestHandler
from services.order_service import OrderService
from services.product_service import ProductService
from services.mercadopago_service import MercadopagoService
import json

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

    def handle_error(self, status_code, message, details=None):
     # Método para manejar errores y enviar una respuesta de error al cliente.  Args: status_code (int): Código de estado HTTP. message (str): Mensaje de error. details (str): Detalles adicionales del error (opcional).
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()

        response = {
            'error': message,
            'details': details
        }

        self.wfile.write(json.dumps(response).encode())
    
    #  do_GET(): Se encarga de procesar las solicitudes HTTP GET derivandolas a la instancia de servicio que corresponda.
    def do_GET(self):
        path = self.path

        if path in services:
            try:
                service_instance = services[path]
                service_instance.do_GET(self)
            except Exception as e:
                self.handle_error(500, 'Error interno del servidor', str(e))
        else:
            self.handle_error(404, 'Recurso inexistente')


    # do_POST(): Se encarga de procesar las solicitudes HTTP POST derivandolas a la instancia de servicio que corresponda.        
    def do_POST(self):
        path = self.path

        if path in services:
            try:
                service_instance = services[path]
                service_instance.do_POST(self)
            except Exception as e:
                self.handle_error(500, 'Error interno del servidor', str(e))
        else:
            self.handle_error(404, 'Endpoint no encontrado')
    
    #El método do_OPTIONS se utiliza para manejar las solicitudes OPTIONS, que son parte del protocolo CORS (Cross-Origin Resource Sharing). CORS es un mecanismo de seguridad que permite o restringe el acceso a recursos en una página web desde un dominio diferente al de la propia página.
    # do_OPTIONS(): Se encarga de manejar las solicitudes OPTIONS.
    def do_OPTIONS(self):
        # Se envía una respuesta exitosa (código de estado 200).
        self.send_response(200)        
        # Se establecen los encabezados necesarios para permitir solicitudes CORS.
        self.send_header('Access-Control-Allow-Origin', '*')  # Permitir a cualquier origen acceder.
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')  # Métodos permitidos.
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')  # Tipos de encabezados permitidos.
        self.end_headers()

