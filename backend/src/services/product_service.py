import json
from database.database import Connection
from models.cart import Cart
from utils.decimal_ecoder import DecimalEncoder
from utils.set_headers import SetHeaders
from utils.error_handler import ErrorHandler
from utils.logger import Logger

PRODUCTS_ENDPOINT = '/products'


class ProductService:

    logger = Logger()

    def do_GET(self, handler): #Este método maneja solicitudes HTTP GET. Recibe un objeto handler
      #si la ruta de la solicitud coincide con la constante PRODUCTS_ENDPOINT. Si es así, se llama al método _handle_get_products(handler) para obtener la información de los productos y enviarla como respuesta.
        if handler.path == PRODUCTS_ENDPOINT: 
            response = self._handle_get_products(handler)
            SetHeaders.set_headers(handler)

            handler.wfile.write(json.dumps(response, cls=DecimalEncoder).encode())
        else:
            handler.not_found()

    #Este método se encarga de obtener los productos desde una base de datos utilizando el método _get_products_from_db()
    def _handle_get_products(self, handler):
        try:
            products = {'products': self._get_products_from_db()}
            return products
        except Exception as e: # Si ocurre alguna excepción, se responde con un código de estado 500 (Error interno del servidor) y el mensaje de error.
            ErrorHandler.handle_error(handler, 500, "An error occurred while getting the products: {}".format(str(e)))
            ProductService.logger.log_error(f"An error occurred in ProductService: {e}")

    #Este método se encarga de obtener productos desde una base de datos utilizando Connection y ejecutando una consulta SQL.
    def _get_products_from_db(self):
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
            ProductService.logger.log_error(f"An error occurred in _get_products_from_db: {e}")

    #Este método estático toma un objeto Cart como argumento y se encarga de actualizar el stock de productos en la base de datos en función de la información contenida en el carrito
    @staticmethod
    def update_products_stock(cart: Cart):
        products = cart.get_products()
        try:
            with Connection.get_connection() as connection:
                with connection.cursor() as cursor:
                    connection.start_transaction()
                    for product in products:
                        statement = '''
                            UPDATE products SET stock_quantity = stock_quantity - %s WHERE product_id = %s
                        '''
                        data = (product.quantity, product.product_id)
                        cursor.execute(statement, data)
                    connection.commit()

            result = cursor.rowcount
            if result > 0:
                return True

        except Exception as e:
            connection.rollback()
            ProductService.logger.log_error(f"An error occurred in update_products_stock: {e}")