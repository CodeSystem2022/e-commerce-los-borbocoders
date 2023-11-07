class Customer:
    def _init_(self, first_name: str, last_name: str, email: str, address: str, phone: str, customer_id=None):
        self._first_name = first_name
        self._last_name = last_name
        self._email = email
        self._address = address
        self._phone = phone
        self._customer_id = customer_id

    @property
    def customer_id(self) -> int:
        return self._customer_id

    @property
    def first_name(self) -> str:
        return self._first_name

    @property
    def last_name(self) -> str:
        return self._last_name

    @property
    def email(self) -> str:
        return self._email

    @property
    def address(self) -> str:
        return self._address

    @property
    def phone(self) -> str:
        return self._phone

    def set_customer_id(self, value):
        self._customer_id = value