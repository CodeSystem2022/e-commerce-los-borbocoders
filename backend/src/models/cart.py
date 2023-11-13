 
from models.product import Product


class Cart:
    def __init__(self, order_id=None, cart_id=None):
        self._cart_id = cart_id
        self._order_id = order_id
        self._products = []

    #Acceder al ID del carrito.

    @property
    def cart_id(self) -> int:
        return self._cart_id

    #Acceder al ID de la orden.

    @property
    def order_id(self) -> int:
        return self._order_id
    
    #Agrega un producto al carrito.

    def add_product(self, product: Product):
        self._products.append(product)

    #Obtiene la lista de productos en el carrito.

    def get_products(self) -> list:
        return self._products
       
       
    #Calcula la cantidad total de productos en el carrito.

    def total_quantity(self) -> int:
        return sum(product_info["quantity"] for product_info in self._products)