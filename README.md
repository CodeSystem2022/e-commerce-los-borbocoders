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
<h3>Metodología</h3>

<p>Este proyecto sigue la metodología ágil Scrum para la gestión y desarrollo. Las funciones específicas de cada colaborador se asignaron siguiendo los principios de Scrum. </p>

<h3>Roles en Scrum:</h3>
<h4>Scrum Master:</h4>

<p>En este proyecto, el Scrum Master es responsable de asegurar que el equipo siga las prácticas y principios de Scrum.</p>
<p>Colaboradores, al realizar contribuciones, deben tener en cuenta las sugerencias y orientaciones proporcionadas por el Scrum Master.</p>

<h4>Product Owner:</h4>

<p>El Product Owner es la persona encargada de definir las historias de usuario y establecer las prioridades.</p>
<p>Las contribuciones deben alinearse con las historias de usuario y prioridades establecidas por el Product Owner.</p>

<h4>Equipo de Desarrollo:</h4>

<p>Los colaboradores forman parte del equipo de desarrollo y son responsables de implementar las funcionalidades definidas en las historias de usuario.</p>
<p>La comunicación y colaboración estrecha dentro del equipo son esenciales para el éxito del proyecto.</p>

<h3>Reuniones de Scrum:</h3>
<h4>Sprint Planning:</h4>

<p>Antes de cada sprint, el equipo realiza una reunión de planificación para definir las tareas y compromisos para el próximo sprint.</p>
<p>Colaboradores deben participar activamente en estas reuniones y comprometerse con las tareas asignadas.</p>

<h4>Daily Scrum:</h4>

<p>Durante el sprint, se lleva a cabo una reunión diaria de Scrum para sincronizar el progreso y abordar posibles obstáculos.</p>
<p>Colaboradores deben participar en las reuniones diarias y comunicar de manera proactiva cualquier problema o bloqueo.</p>

<h4>Sprint Review y Retrospectiva:</h4>

<p>Al final de cada sprint, se realiza una revisión para demostrar las funcionalidades implementadas y una retrospectiva para identificar mejoras.</p>
<p>Los colaboradores deben participar en estas sesiones para discutir el trabajo realizado y proponer mejoras.</p>

<h3>Historias de Usuario y Tareas:</h3>
<h4>Creación y Asignación:</h4>

<p>Las historias de usuario y tareas son creadas por el Product Owner y asignadas durante las reuniones de planificación.</p>
<p>Los colaboradores deben trabajar en tareas asignadas y asegurarse de entender completamente los requisitos de las historias de usuario.</p>

<h4>Actualización del Estado:</h4>

<p>Las herramientas de seguimiento (como tableros Scrum) deben actualizarse regularmente para reflejar el estado actual de las tareas.</p>
<p>Es crucial mantener la transparencia en el progreso del trabajo.</p>

<h3>Comunicación:</h3>
<h4>Canal de Comunicación:</h4>

<p>Utilizamos canales específicos de comunicación, como reuniones de Scrum y plataformas colaborativas, para mantener una comunicación efectiva.</p>
<p>Colaboradores deben utilizar los canales designados para discutir problemas, compartir actualizaciones y colaborar.</p>

<h4>Feedback Constructivo:</h4>

<p>Se alienta a los colaboradores a proporcionar y recibir feedback constructivo de manera regular.</p>
<p>El feedback es esencial para el aprendizaje continuo y la mejora del equipo.</p>

<h3>Pautas Generales de Contribución:</h3>
<h4>Branches y Commits:</h4>


<p>Crea branches específicos para las características o correcciones que estás implementando.</p>
<p>Realiza commits significativos y utiliza mensajes descriptivos.</p>

<h4>Pull Requests:</h4>

<p>Abre pull requests claros y concisos.</p>
<p>Asocia tus pull requests con las historias de usuario correspondientes.</p>

<h4>Revisión de Código:</h4>

<p>Participa en la revisión de código y responde a los comentarios de manera oportuna.</p>
<p>Aprende de la revisión de código y busca la mejora continua.</p>

<h4>Testing:</h4>

<p>Asegúrate de que tus contribuciones estén probadas y no introduzcan problemas en el proyecto.</p>
<p>Participa en pruebas de calidad y asegúrate de cumplir con las expectativas definidas en las historias de usuario.</p>

<h3>Forkea el Repositorio:</h3>

<p>Haz un fork de este repositorio a tu cuenta de GitHub.</p>
<p>Clona el repositorio desde tu cuenta a tu máquina local.</p>

git clone [https://github.com/TU_USUARIO/e-commerce-university.git]
cd e-commerce-los-borbocoders

<h3>Desarrollo en Ramas:</h3>

<p>Crea una rama para tu contribución.</p>

git checkout -b nombre-de-tu-rama
Realiza tus cambios o adiciones en esta rama.

<h3>Commits Significativos:</h3>

<p>Realiza commits significativos que reflejen los cambios que estás haciendo.</p>

git commit -m "Añadir funcionalidad de carrito de compras"

<h3>Actualiza tu Rama:</h3>

<p>Antes de enviar tu pull request, asegúrate de que tu rama está actualizada con la rama principal.</p>

git pull origin main
<p>Resuelve cualquier conflicto que pueda surgir.<p>
  
<h3>Envía tu Pull Request:</h3>

<p>Abre un pull request desde tu rama a la rama principal del proyecto.</p>
<p>Reportar Problemas y Proponer Mejoras</p>
<h2>Si encuentras problemas o tienes ideas para mejorar el proyecto, utiliza el sistema de issues de GitHub:</h2>

<h3>Issues:</h3>

<p>Crea un issue para reportar problemas.</p>
<p>Utiliza etiquetas para clasificar el tipo de problema (bug, mejora, etc.).</p>
<p>Proporciona detalles claros y contexto sobre el problema.</p>

<h3>Pull Requests:</h3>

<p>Para proponer mejoras, crea un pull request.</p>
<p>Describe claramente la mejora propuesta y proporciona contexto.</p>
<p>Asegúrate de que tus cambios sean compatibles con la metodología Scrum y no rompan funcionalidades existentes.</p>

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





