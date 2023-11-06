class Product:
    def __init__(self, product_id, product_name, description, price, quantity):
        self.product_id = product_id
        self.product_name = product_name
        self.description = description
        self.price = price
        self._quantity = quantity

    @classmethod
    def create_product_with_id(cls, product_id, quantity):
        return cls(product_id,"" , "", 0.0, quantity)

    @property
    def product_id(self):
        return self._product_id

    @property
    def product_name(self):
        return self._product_name

    @property
    def description(self):
        return self._description

    @property
    def price(self):
        return self._price

    @property
    def quantity(self):
        return self._quantity