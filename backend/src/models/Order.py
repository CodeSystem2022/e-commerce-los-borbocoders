class Order:
    def __init__(self, order_id, customer_id, order_date, shipping_address, total_amount, payment_option):
        self.order_id = order_id
        self.customer_id = customer_id
        self.order_date = order_date
        self.shipping_address = shipping_address
        self.total_amount = total_amount
        self.payment_option = payment_option