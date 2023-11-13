# TecnoFer - 

Ecommerce de una ferretería de tipo industrial cuyo propósito es expandir su cartera de clientes y fidelizar los ya existentes, sumando a la tradicional modalidad de venta presencial el sistema de venta on line


-------------------------------------

## **INTRODUCCION**

Estamos emocionados de presentar nuestro proyecto de E-commerce para TecnoFer, una ferretería industrial. El objetivo es ampliar la cartera de clientes y fidelizar a los existentes mediante la introducción de ventas online. Buscamos maximizar la visibilidad a corto, mediano y largo plazo, desarrollando una plataforma de E-commerce, canales virtuales de atención al cliente y seguimiento automatizado de ventas. 
El público objetivo se amplía a nivel nacional, ofreciendo productos de construcción con precios competitivos y atención personalizada. Enfrentamos la competencia destacándonos por la integración de una experiencia de compra online y presencial única. 
La distribución se realiza a través de una página web con E-commerce y redes sociales para una conexión efectiva con los clientes





-------------------------------------

## **TECNOLOGÍAS EMPLEADAS Y FUNCIONALIDADES**



-------------------------------------

## **INSTRUCCIONES DE INSTALACIÓN**

### Backend

1. **Configuración del entorno virtual (opcional pero recomendado):**
   ```bash
   python -m venv el_nombre_del_entorno
   source venv/bin/activate  # En sistemas basados en Unix
   # o
   .\venv\Scripts\activate  # En sistemas basados en Windows
   ```

2. **Instalación de dependencias:**
   ```bash
   pip install python-dotenv
   pip install mysql-connector-python
   pip install mercadopago
   ```

3. **Configuración de variables de entorno:**
   - Crea un archivo `.env` en la raíz del proyecto.
   - Agrega las siguientes variables con sus valores correspondientes:
     ```dotenv
     Database
     DB_HOST=tu_mysql_host
     DB_USER=tu_mysql_user
     DB_PASSWORD=tu_mysql_password
     DB_DATABASE=your_tu_mysql_database

     Mercadopago
     MERCADOPAGO_API_KEY=your_mercadopago_api_key

     Enpoints
     PRODUCTS_ENDPOINT=/products
     SAVE_ORDER_ENDPOINT=/save_order
     UPDATE_ORDER_STATUS_ENDPOINT=/update_order_status
     CREATE_PREFERENCE_ENDPOINT=/create_preference
     ORIGIN = '*'
     ```

4. **Ejecutar la aplicación:**
   ```bash
   python app.py
   ```

### Frontend

1. **No se requiere instalación específica para el frontend.**
   - Abrir Visual Studio Code u otro IDE y abrir con un servidor local como `Live Server`

¡Listo! Ahora deberías tener tu entorno de desarrollo configurado correctamente.
```


-------------------------------------

## **COMO UTILIZAR EL PROYECTO**


-------------------------------------

## **PAUTAS DE CONTRIBUCIONES**


-------------------------------------

## **LICENCIA**


-------------------------------------

## `TABLA DE CONTENIDOS`

- Indroduccion
- Tecnologias empleadas y funcionalidades
- Instalación
- Estructura del Proyecto







