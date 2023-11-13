import os

import mysql.connector
from dotenv import load_dotenv
from mysql.connector import pooling

load_dotenv()

# Parametros de configuración de la base de datos

dbconfig = {
    "host": os.getenv("DB_HOST"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_DATABASE")
}


class PoolConnection:
    _pool = None

    # La clase PoolConnection se encarga de administrar las conexiones

    @classmethod
    def get_pool(cls):
        if cls._pool is None:
            try:
                if None in dbconfig.values():
                    raise ValueError("One or more required values are not set.")

                cls._pool = pooling.MySQLConnectionPool(
                    pool_name="pool_manager",
                    pool_size=10,
                    **dbconfig
                )
                return cls._pool
            except mysql.connector.Error as e:
                print(f'Error while creating the Pool: {e}')
            except ValueError as e:
                print(f'Configuration error: {e}')
        else:
            return cls.get_pool
         

class Connection:

    # La clase Connection se encarga de devolver una conexion desde la clase PoolConnection

    @classmethod
    def get_connection(cls):
        try:
            connection_pool = PoolConnection.get_pool()
            connection = connection_pool.get_connection()
            return connection
        except Exception as e:
            print(f'Error: {e}')
