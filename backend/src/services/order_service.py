import datetime
import json
import os

from dotenv import load_dotenv

from database.database import Connection
from models.cart import Cart
from models.customer import Customer
from models.order import Order
from models.product import *
from services.product_service import ProductService
from services.user_service import UserService
from utils.request_parser import RequestParser
from utils.set_headers import SetHeaders
from utils.error_handler import ErrorHandler
from utils.logger import Logger

load_dotenv()

SAVE_ORDER_ENDPOINT = os.getenv('SAVE_ORDER_ENDPOINT')
UPDATE_ORDER_STATUS_ENDPOINT = os.getenv('/UPDATE_ORDER_STATUS_ENDPOINT')


class OrderService:

    logger = Logger() # Se crea una instancia del logger.

    def do_POST(self, handler): # Este método procesa las solicitudes de tipo POST realizadas al servicio.
        if handler.path == SAVE_ORDER_ENDPOINT:
            response = self._handle_save_order(handler)
            SetHeaders.set_headers(handler)
            handler.wfile.write(json.dumps(response).encode('utf-8'))
        elif handler.path == UPDATE_ORDER_STATUS_ENDPOINT:
            result = self._handle_update_order_status(handler)
            if result:
                SetHeaders.set_headers(handler)
        else:
            handler.not_found()

    @staticmethod
    def _handle_save_order(handler):

        # Este método se encarga de guardar la orden

        try:
            data = RequestParser.parse_request_body(handler) # Se convierten los datos en un objeto

            # Aqui se descompone el objeto
            order_data = data.get('order', {})
            customer_data = order_data.get('customer', {})
            customer = Customer(
                first_name=customer_data.get('firstName', ''),
                last_name=customer_data.get('lastName', ''),
                email=customer_data.get('email', ''),
                address=customer_data.get('address', ''),
                phone=customer_data.get('phone', '')
            )
            total = order_data.get('total', 0)
            payment_option = order_data.get('payment')
            cart_data = order_data.get('cart', 0)

            # Se crea un objeto de tipo Cart y se agregan los productos de tipo Product
            cart = Cart()

            for product in cart_data:
                new_product = Product(
                    product_id=product.get('productId'),
                    product_name=product.get('productName'),
                    description=product.get('description'),
                    price=product.get('price'),
                    quantity=product.get('quantity')
                )
                cart.add_product(new_product)

            # Se recupera el ID del objeto Customer con el fin de asociar a una orden, si no se encuentra se registra
            customer.set_customer_id(UserService.get_customer_by_email(customer.email))
            if customer.customer_id is None:
                (customer.
                set_customer_id(
                    UserService.
                    create_customer(
                        customer.first_name,
                        customer.last_name,
                        customer.email,
                        customer.address,
                        customer.phone))
                )
            current_date = datetime.datetime.now()

            # Se crea una orden en estado 'paid'.
            order = Order(customer.customer_id, current_date, customer.address, total, payment_option, 'paid')

            # Si la orden fue creada se obtiene el ID para ser retornado y se actualiza el stock
            if order is not None:
                order_id = OrderService.save_order_and_cart(order, cart)
                ProductService.update_products_stock(cart)
                return order_id

        except Exception as e:
            OrderService.logger.log_error(f"Error in _handle_save_order: {e}")
            ErrorHandler.handle_error(handler, 500, "An error occurred: {}".format(str(e)))


    @staticmethod
    def _handle_update_order_status(handler):


        # Este metodo se encarga de actualizar el estado de la orden luego de que se aprobó el pago.

        try:
            response = RequestParser.parse_request_body(handler) # Se convierten los datos a un objeto.
            order_id = response.get('orderId')

            if order_id:

                # Si existe el ID se actualiza el estado de la orden.
                updated_status = OrderService._update_order_status(order_id)

                if updated_status:

                    # Si el estado de la orden fue actualizado se obtiene el carro.
                    cart = OrderService.get_cart_by_order_id(order_id)

                    # Si no se puede obtener el carro se genera un log del error.
                    if cart is None:
                        OrderService.logger.log_error('There was an error while retrieving the cart.')
                    else:
                        # Si se obtuvo el carro entonces se actualiza el stock.
                        return ProductService.update_products_stock(cart)
        except Exception as e:
            OrderService.logger.log_error(f"Error in _handle_update_order_status: {e}")
            ErrorHandler.handle_error(handler, 500, "An error occurred: {}".format(str(e)))

    @staticmethod
    def _update_order_status(order_id):

        # Este metodo es el encargado directo de actualizar el estado de la orden

        try:
            with Connection.get_connection() as connection:
                statement = '''
                             UPDATE orders
                             SET status = 'paid'
                             WHERE order_id = %s
                             '''
                with connection.cursor() as cursor:
                    cursor.execute(statement, (order_id,))
                    connection.commit()
                    if cursor.rowcount > 0:
                        return "Status updated successfully"
                    else:
                        print("No rows were updated.")
        except Exception as e:
            OrderService.logger.log_error(f"Error in _update_order_status: {e}")

    @staticmethod
    def _save_order(order):

        # Este metodo es el encargado directo de guardar la orden

        try:
            with Connection.get_connection() as connection:
                statement = '''
                            INSERT INTO orders (
                                customer_id,
                                order_date,
                                shipping_address,
                                total_amount,
                                payment,
                                status
                            ) VALUES (%s, %s, %s, %s, %s, %s)
                        '''
                with connection.cursor() as cursor:
                    data = (order.customer_id, order.order_date, order.shipping_address, order.total_amount,
                            order.payment_option, order.status)
                    cursor.execute(statement, data)
                    connection.commit()
                    order_id = cursor.lastrowid
                    return order_id

        except Exception as e:
            OrderService.logger.log_error(f"Error in _save_order: {e}")

    @staticmethod
    def _save_cart(order_id, cart: Cart):

        # Este metodo es el encargado directo de guardar el carro

        products = cart.get_products()

        try:
            with Connection.get_connection() as connection:
                with connection.cursor() as cursor:
                    connection.start_transaction()
                    for product in products:
                        statement = '''
                                    INSERT INTO cart (
                                        order_id,
                                        product_id,
                                        quantity
                                    ) VALUES (%s, %s, %s)
                                '''
                        data = (order_id, product.product_id, product.quantity)
                        cursor.execute(statement, data)

                    connection.commit()

            cart_id = cursor.lastrowid
            return cart_id

        except Exception as e:
            connection.rollback()
            OrderService.logger.log_error(f"Error in _save_cart: {e}")

    @staticmethod
    def get_cart_by_order_id(order_id):

        # Este metodo es el encargado directo de obtener los detalles del carro con un ID

        try:
            with Connection.get_connection() as connection:
                with connection.cursor() as cursor:
                    query = "SELECT * FROM cart WHERE order_id = %s"
                    cursor.execute(query, (order_id,))
                    results = cursor.fetchall()

                    if results:
                        for row in results:

                            # Se crea un objeto Cart y por cada fila se agrega un Product
                            cart = Cart(
                                cart_id=row[0],
                                order_id=row[1]
                            )
                            product = Product.create_product_with_id(
                                product_id=row[2],
                                quantity=row[3],
                            )
                            cart.add_product(product)

                        return cart
                    else:
                        return None
        except Exception as e:
            OrderService.logger.log_error(f"Error in get_cart_by_order_id: {str(e)}")
            return None

    @staticmethod
    def save_order_and_cart(order, cart):

        # Este metodo se encarga de dos funciones: guardar una orden y un carro
        # con el fin de no relizar escritura en la base de datos si una de los dos falla, esto
        # con el fin de evitar inconsistencias de datos.

        try:
            with Connection.get_connection() as connection:
                with connection.cursor():
                    connection.start_transaction()

                    order_id = OrderService._save_order(order)
                    OrderService._save_cart(order_id, cart)

                    # Si todo fue exitoso se confirma la escritura en la base de datos
                    connection.commit()
                    return order_id

        except Exception as e:
            # Si hubo un error se descarta la escritura en la base de datos.
            connection.rollback()
            OrderService.logger.log_error(f'Error in save_order_and_cart: {e}')
