import os

import mysql.connector
from dotenv import load_dotenv
from mysql.connector import pooling

load_dotenv()

dbconfig = {
    "host": os.getenv("DB_HOST"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_DATABASE")
}


class PoolConnection:
    _pool = None

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
    @classmethod
    def get_connection(cls):
        try:
            connection_pool = PoolConnection.get_pool()
            connection = connection_pool.get_connection()
            return connection
        except Exception as e:
            print(f'Error: {e}')
