import json


class RequestParser:
    @staticmethod
    def parse_request_body(handler):
        content_length = int(handler.headers['Content-Length'])
        request_body = handler.rfile.read(content_length).decode('utf-8')
        return json.loads(request_body)
