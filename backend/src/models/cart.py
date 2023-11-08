from models.product import Product

class Cart:
    def __init__(self, order_id=None, cart_id=None):
        self._cart_id = cart_id
        self._order_id = order_id
        self._products = []

    @property
    def cart_id(self) -> int:
        return self._cart_id

    @property
    def order_id(self) -> int:
        return self._order_id

    def add_product(self, product: Product):
        self._products.append(product)

    def get_products(self) -> list:
        return self._products

    def total_quantity(self) -> int:
        return sum(product_info["quantity"] for product_info in self._products)


