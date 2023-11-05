import json
from database.database import Connection
from utils.decimal_encoder import DecimalEncoder

PRODUCTS_ENDPOINT = '/products'

def _get_products_from_db():
    try:
        with Connection.get_connection() as connection:
            query = 'SELECT * from products'
            with connection.cursor() as cursor:
                cursor.execute(query)
                products = cursor.fetchall()
                keys = ['product_id', 'product_name', 'description', 'price', 'stock_quantity', 'category']
                converted_products = [dict(zip(keys, product)) for product in products]
                return converted_products
    except Exception as e:
        print(f'Error: {e}')

class ProductService:
    def do_GET(self, handler):
        if handler.path == PRODUCTS_ENDPOINT:
            response = self._handle_get_products(handler)
            handler.set_headers()
            handler.send_response(200)
            handler.send_header('Content-Type', 'application/json')
            handler.end_headers()
            handler.wfile.write(json.dumps(response, cls=DecimalEncoder).encode())
        else:
            handler.not_found()

    @staticmethod
    def _handle_get_products(handler):
        try:
            products = {'products' : _get_products_from_db()}
            response = products
            return response
        except Exception as e:
            handler.handle_error(500, str(e))
