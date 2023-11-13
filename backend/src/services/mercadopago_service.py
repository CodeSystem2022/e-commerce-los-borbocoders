import os
import json
import datetime

import mercadopago
from dotenv import load_dotenv

from models.cart import Cart
from models.customer import Customer
from models.order import Order
from models.product import *
from services.order_service import OrderService
from services.user_service import UserService
from utils.request_parser import RequestParser
from utils.set_headers import SetHeaders
from utils.logger import Logger

load_dotenv()

CREATE_PREFERENCE_ENDPOINT = os.getenv('CREATE_PREFERENCE_ENDPOINT')


class MercadopagoService:

    # Inicializa la clase MercadopagoService y se verifica la existencia del token de acceso de Mercadopago.

    logger = Logger()

    def __init__(self):
        self.ACCESS_TOKEN = os.getenv('MERCADOPAGO_API_KEY') # Se almacena la API KEY de Mercadopago

        if not self.ACCESS_TOKEN:
            raise ValueError('Access token not found.')

    def do_POST(self, handler): # Este método procesa las solicitudes de tipo POST realizadas al servicio.
        if handler.path == CREATE_PREFERENCE_ENDPOINT:
            response = self._handle_create_preference(handler)
            SetHeaders.set_headers(handler)
            handler.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            handler.not_found()

    def _create_preference(self, items, payer, total):

        # Este método crea una preferencia de pago medianta la API de Mercadopago
        # utilizando la información del carrito, el pagador y el total.

        mp = mercadopago.SDK(self.ACCESS_TOKEN) # Se crea una instancia de mercadopago

        preference = {
            "items": items,
            "back_urls": {
                "success": "http://localhost:5500/templates/success-payment.html",
                "failure": "http://localhost:5500/templates/payment-error.html",
                "pending": "http://example.com/pending"
            },
            "auto_return": "approved",
            "notification_url": "http://example.com/notifications",
            "payer": {
                "name": payer.first_name,
                "surname": payer.last_name,
                "email": payer.email,
                "phone": {
                    "area_code": '351',
                    "number": payer.phone
                },
            },
            "total_amount": total,
        }

        try:
            preference_response = mp.preference().create(preference) # Se crea la preferencia
            preference_id = preference_response["response"]["id"] # Se procesa la preferencia obtenida
            return preference_id
        except Exception as e:
            MercadopagoService.logger.log_error(message=f"Failed to create preference: {e}")
            return None

    def _handle_create_preference(self, handler):

        # Este método procesa la creación de preferencias a partir de la solicitud realizada.

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
        cart_data = order_data.get('cart', {})


        # Se crea un objeto de tipo Cart y se agregan los productos de tipo Product.
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


        # Se recupera el ID del objeto Customer con el fin de asociar a una orden, si no se encuentra se registra.
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

        # Se crea una orden en estado 'pending' hasta que el pago sea confirmado
        order = Order(customer.customer_id, current_date, customer.address, total, payment_option, 'pending')

        # Se guarda la orden y el carro y se obtiene un ID para la respuesta.
        order_id = OrderService.save_order_and_cart(order, cart)

        # Se obtienen los productos del carro y se guardan en un array con el fin de cumplir
        # con la estructura de datos de la API de Mercadopago.
        cart_products = cart.get_products()
        cart_items = []

        for product in cart_products:
            item = {
                "id": product.product_id,
                "title": product.product_name,
                "description": product.description,
                "quantity": product.quantity,
                "currency_id": "ARS",
                "unit_price": float(product.price),
            }
            cart_items.append(item)

        # Se obtiene el ID de la preferencia
        preference_id = self._create_preference(cart_items, customer, total)

        order_data = {'order_id': order_id, 'preference_id': preference_id}

        return order_data # Se retornan los datos necesarios para la respuesta.
