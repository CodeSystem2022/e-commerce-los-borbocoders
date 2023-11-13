class Customer:
    def __init__(self, first_name: str, last_name: str, email: str, address: str, phone: str, customer_id=None):
        self._first_name = first_name
        self._last_name = last_name
        self._email = email
        self._address = address
        self._phone = phone
        self._customer_id = customer_id

    #Propiedad de solo lectura para acceder al ID del cliente
    @property
    def customer_id(self) -> int:
        return self._customer_id

    #Propiedad de solo lectura para acceder al nombre del cliente.

    @property
    def first_name(self) -> str:
        return self._first_name
    
    #Propiedad de solo lectura para acceder al apellido del cliente.

    @property
    def last_name(self) -> str:
        return self._last_name

    #Propiedad de solo lectura para acceder a la dirección de correo electrónico del cliente.

    @property
    def email(self) -> str:
        return self._email

    #Propiedad de solo lectura para acceder a la dirección del cliente.

    @property
    def address(self) -> str:
        return self._address

    #Propiedad de solo lectura para acceder al número de teléfono del cliente.

    @property
    def phone(self) -> str:
        return self._phone

    #Establece el ID del cliente.

    def set_customer_id(self, value):
        self._customer_id = value
