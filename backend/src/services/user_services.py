from database.database import Connection


class UserService:
    @staticmethod
    def create_customer(customer_name, customer_lastname, customer_email, customer_address, customer_phone):
        try:
            with Connection.get_connection() as connection:
                statement = '''
                            INSERT INTO customers (
                                first_name,
                                last_name,
                                email,
                                address,
                                phone
                            ) VALUES (%s, %s, %s, %s, %s)
                        '''
                with connection.cursor() as cursor:
                    data = (customer_name, customer_lastname, customer_email, customer_address, customer_phone)
                    cursor.execute(statement, data)
                    connection.commit()
                    customer_id = cursor.lastrowid
                    print('User saved successfully.')
                    return customer_id
        except Exception as e:
            print(f"Error in create_customer: {str(e)}")
            return None

    @staticmethod
    def get_customer_by_email(email):
        try:
            with Connection.get_connection() as connection:
                with connection.cursor() as cursor:
                    query = "SELECT customer_id FROM customers WHERE email = %s"
                    cursor.execute(query, (email,))
                    result = cursor.fetchone()

                    if result:
                        customer_id = result[0]
                        return customer_id
                    else:
                        return None
        except Exception as e:
            print(f"Error in get_customer_by_email: {str(e)}")
            return None
