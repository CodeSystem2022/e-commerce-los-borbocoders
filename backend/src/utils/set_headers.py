import os
from dotenv import load_dotenv

load_dotenv()

ORIGIN = os.getenv('ORIGIN')

class SetHeaders:
    @staticmethod
    def set_headers(response, status_code=200, content_type='application/json'):
        response.send_response(status_code)
        response.send_header('Content-type', content_type)
        response.send_header('Access-Control-Allow-Origin', ORIGIN)
        response.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        response.send_header('Access-Control-Allow-Headers', 'Content-Type')
        response.end_headers()
