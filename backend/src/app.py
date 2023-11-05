from http.server import HTTPServer
from services.request_handler_service import RequestHandlerService


class App:
    def __init__(self):
        self._server_address = ('127.0.0.1', 8000)
        self._httpd = HTTPServer(self._server_address, RequestHandlerService)

    def run(self):
        print(f'Server is running on {self._server_address}')
        self._httpd.serve_forever()


if __name__ == '__main__':
    app = App()
    app.run()
