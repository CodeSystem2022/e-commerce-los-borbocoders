import os
from http.server import HTTPServer

from services.request_handler_service import RequestHandlerService


class App:
    def __init__(self):
        host = os.getenv('DB_HOST')
        port = int(os.getenv('DB_PORT'))
        self._server_address = (host, port)
        self._httpd = HTTPServer(self._server_address, RequestHandlerService)

    def run(self):
        print(f'Server is running on {self._server_address}')
        self._httpd.serve_forever()


if __name__ == '__main__':
    app = App()
    app.run()
