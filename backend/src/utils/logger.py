import logging
import os

class Logger:  # Se encarga de generar logs en la carpeta logs en el archivo app.log
    def __init__(self, output_folder='logs', log_file='app.log'):
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)

        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

        log_path = os.path.join(output_folder, log_file)
        os.makedirs(os.path.dirname(log_path), exist_ok=True)

        file_handler = logging.FileHandler(log_path)
        file_handler.setFormatter(formatter)
        self.logger.addHandler(file_handler)

    def log_info(self, message): # Genera logs de nivel INFO
        self.logger.info(message)

    def log_error(self, message): # Genera logs de nivel ERROR
        self.logger.error(message)
