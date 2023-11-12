# Inicializa una instancia de la clase Product, con los args product_id, product_name, description, price, quantity
class Product:
    def __init__(self, product_id, product_name, description, price, quantity):
        self.product_id = product_id
        self.product_name = product_name
        self.description = description
        self.price = price
        self._quantity = quantity

    # Método de clase para crear una instancia de Product con un ID específico y una cantidad.
    @classmethod
    def create_product_with_id(cls, product_id, quantity):
        return cls(product_id, "", "", 0.0, quantity)

    # Propiedad de solo lectura que devuelve el id único del producto.
    @property
    def product_id(self):
        return self._product_id

    # Propiedad de solo lectura que devuelve el nombre del producto.
    @property
    def product_name(self):
        return self._product_name

    # Propiedad de solo lectura que devuelve la descripción del producto.
    @property
    def description(self):
        return self._description

    # Propiedad de solo lectura que devuelve el precio del producto.
    @property
    def price(self):
        return self._price

    # Propiedad de solo lectura que devuelve la cantidad disponible en el inventario del producto.
    @property
    def quantity(self):
        return self._quantity

    @product_id.setter
    def product_id(self, value):
        self._product_id = value

    @product_name.setter
    def product_name(self, value):
        self._product_name = value

    @description.setter
    def description(self, value):
        self._description = value

    @price.setter
    def price(self, value):
        self._price = value
