from datetime import datetime


class Order:
    def __init__(self, customer_id: int, order_date: datetime, shipping_address: str, total_amount: float,
                 payment_option: str, status: str, order_id=None):
        self._customer_id = customer_id
        self._order_date = order_date
        self._shipping_address = shipping_address
        self._total_amount = total_amount
        self._payment_option = payment_option
        self._status = status
        self._order_id = order_id

    @property
    def order_id(self) -> int:
        return self._order_id

    @property
    def customer_id(self) -> int:
        return self._customer_id

    @property
    def order_date(self) -> datetime:
        return self._order_date

    @property
    def shipping_address(self) -> str:
        return self._shipping_address

    @property
    def total_amount(self) -> float:
        return self._total_amount

    @property
    def payment_option(self) -> str:
        return self._payment_option

    @property
    def status(self) -> str:
        return self._status
