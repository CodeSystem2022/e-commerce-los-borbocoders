import json
from decimal import Decimal

class DecimalEncoder(json.JSONEncoder): # Se encarga convertir un objeto que contiene decimales a un tipo JSON-string
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)


