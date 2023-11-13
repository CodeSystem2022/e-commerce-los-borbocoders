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

## **LICENCIA DE USO**  

1. Definiciones
1.1 "Sitio Web"
Refiere a la página web de Tecnofer Ferretería Virtual, accesible en www.tecnofer.com.ar

1.2 "Usuario"
Cualquier persona que acceda o utilice el Sitio Web de Tecnofer Ferretería Virtual, ya sea como visitante o cliente.

2. Concesión de Licencia
Al utilizar el Sitio Web, Tecnofer Ferretería Virtual otorga al Usuario una licencia limitada, no exclusiva, intransferible y revocable para acceder y utilizar el contenido y servicios ofrecidos por el sitio con fines personales y comerciales.

3. Restricciones de Uso
El Usuario se compromete a no realizar las siguientes actividades: Intentar el acceso no autorizado a áreas restringidas del Sitio Web, Modificar, copiar o distribuir cualquier parte del contenido sin autorización, Utilizar el Sitio Web para fines ilegales o no autorizados.
4. Propiedad Intelectual
Todo el contenido presente en el Sitio Web, incluyendo pero no limitándose a textos, imágenes, logotipos, marcas registradas, está protegido por derechos de propiedad intelectual y pertenece a Tecnofer Ferretería Virtual.

5. Responsabilidades del Usuario
El Usuario es responsable de mantener la confidencialidad de su cuenta y de la información proporcionada al realizar transacciones en el Sitio Web. Además, el Usuario acepta que la información proporcionada es veraz y precisa.

6. Política de Privacidad
La Política de Privacidad de Tecnofer Ferretería Virtual, disponible en [enlace a la política de privacidad], se incorpora por referencia a esta licencia.

7. Modificaciones y Actualizaciones
Tecnofer Ferretería Virtual se reserva el derecho de modificar esta licencia en cualquier momento. Las modificaciones serán efectivas al ser publicadas en el Sitio Web.

8. Limitación de Responsabilidad
Tecnofer Ferretería Virtual no será responsable de cualquier daño directo, indirecto, incidental, especial o consecuente derivado del uso o la imposibilidad de utilizar el Sitio Web.

9. Terminación
Esta licencia está vigente hasta que sea terminada por el Usuario o Tecnofer Ferretería Virtual. Tecnofer Ferretería Virtual puede terminar esta licencia en cualquier momento sin previo aviso si se determina que el Usuario ha incumplido los términos de la licencia.

10. Ley Aplicable
Esta licencia se regirá e interpretará de acuerdo con las leyes del [país] y cualquier disputa relacionada con esta licencia estará sujeta a la jurisdicción de los tribunales de [ciudad].

11. Contacto
Para cualquier consulta relacionada con esta licencia, puedes ponerte en contacto con Tecnofer Ferretería Virtual en Info@tecnofer.com.ar
Fecha de entrada en vigor: [13/11/2023]

-------------------------------------

## `TABLA DE CONTENIDOS`

- Indroduccion
- Tecnologias empleadas y funcionalidades
- Instalación
- Estructura del Proyecto





