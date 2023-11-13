class ErrorHandler:

    @staticmethod
    def handle_error(response, status_code, message): # Se encarga de las respuestas HTTP cuando se generan errores
        response.send_response(status_code)
        response.end_headers()
        response.wfile.write(message.encode())
