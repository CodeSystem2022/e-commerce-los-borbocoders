import os
from http.server import HTTPServer

from services.request_handler_service import RequestHandlerService
from utils.error_handler import ErrorHandler


class App:
    def __init__(self):
        host = os.getenv('DB_HOST')
        port = int(os.getenv('DB_PORT'))
        self._server_address = (host, port)
        self._httpd = HTTPServer(self._server_address, RequestHandlerService)

    def run(self):
        try:
            self.logger.log_info(f'Server is running on {self._server_address}')
            self._httpd.serve_forever()
        except Exception as e:
            ErrorHandler.handle_error(self._httpd, 500, "An error occurred: {}".format(str(e)))


if __name__ == '__main__':
    app = App()
    app.run()
