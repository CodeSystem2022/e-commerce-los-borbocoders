import os
from http.server import HTTPServer

from services.request_handler_service import RequestHandlerService
from utils.error_handler import ErrorHandler
from utils.logger import Logger


class App:
    logger = Logger() # Instancia de Logger

    def __init__(self):

        # Inicializa el servidor con el host y el puerto desde las variables de entorno.

        host = os.getenv('DB_HOST')
        port = int(os.getenv('DB_PORT'))
        self._server_address = (host, port)
        self._httpd = HTTPServer(self._server_address, RequestHandlerService)  # Inicializa una instancia HTTPServer.

    def run(self):

        # Inicializa el servidor y maneja excepciones.

        try:
            self.logger.log_info(f'Server is running on {self._server_address}')
            self._httpd.serve_forever()  # Inicia el servidor y hace que esté en funcionamiento de manera continuada.
        except Exception as e:
            self.logger.log_error(f"An error occurred while starting the server: {e}")
            ErrorHandler.handle_error(self._httpd, 500, "An error occurred: {}".format(str(e)))


if __name__ == '__main__':
    app = App()
    app.run()
