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
**Metodología**

Este proyecto sigue la metodología ágil Scrum para la gestión y desarrollo. Las funciones específicas de cada colaborador se asignaron siguiendo los principios de Scrum. 

**Roles en Scrum:**
**Scrum Master:**

En este proyecto, el Scrum Master es responsable de asegurar que el equipo siga las prácticas y principios de Scrum.
Colaboradores, al realizar contribuciones, deben tener en cuenta las sugerencias y orientaciones proporcionadas por el Scrum Master.

**Product Owner:**

El Product Owner es la persona encargada de definir las historias de usuario y establecer las prioridades.
Las contribuciones deben alinearse con las historias de usuario y prioridades establecidas por el Product Owner.

**Equipo de Desarrollo:**

Los colaboradores forman parte del equipo de desarrollo y son responsables de implementar las funcionalidades definidas en las historias de usuario.
La comunicación y colaboración estrecha dentro del equipo son esenciales para el éxito del proyecto.

**Reuniones de Scrum:**
**Sprint Planning:**

Antes de cada sprint, el equipo realiza una reunión de planificación para definir las tareas y compromisos para el próximo sprint.
Colaboradores deben participar activamente en estas reuniones y comprometerse con las tareas asignadas.

**Daily Scrum:**

Durante el sprint, se lleva a cabo una reunión diaria de Scrum para sincronizar el progreso y abordar posibles obstáculos.
Colaboradores deben participar en las reuniones diarias y comunicar de manera proactiva cualquier problema o bloqueo.

**Sprint Review y Retrospectiva:**

Al final de cada sprint, se realiza una revisión para demostrar las funcionalidades implementadas y una retrospectiva para identificar mejoras.
Los colaboradores deben participar en estas sesiones para discutir el trabajo realizado y proponer mejoras.

**Historias de Usuario y Tareas:**
**Creación y Asignación:**

Las historias de usuario y tareas son creadas por el Product Owner y asignadas durante las reuniones de planificación.
Los colaboradores deben trabajar en tareas asignadas y asegurarse de entender completamente los requisitos de las historias de usuario.

**Actualización del Estado:**

Las herramientas de seguimiento (como tableros Scrum) deben actualizarse regularmente para reflejar el estado actual de las tareas.
Es crucial mantener la transparencia en el progreso del trabajo.

**Comunicación:**
**Canal de Comunicación:**

Utilizamos canales específicos de comunicación, como reuniones de Scrum y plataformas colaborativas, para mantener una comunicación efectiva.
Colaboradores deben utilizar los canales designados para discutir problemas, compartir actualizaciones y colaborar.

**Feedback Constructivo:**

Se alienta a los colaboradores a proporcionar y recibir feedback constructivo de manera regular.
El feedback es esencial para el aprendizaje continuo y la mejora del equipo.

**Pautas Generales de Contribución:**
**Branches y Commits:**


Crea branches específicos para las características o correcciones que estás implementando.
Realiza commits significativos y utiliza mensajes descriptivos.

**Pull Requests:**

Abre pull requests claros y concisos.
Asocia tus pull requests con las historias de usuario correspondientes.

**Revisión de Código:**

Participa en la revisión de código y responde a los comentarios de manera oportuna.
Aprende de la revisión de código y busca la mejora continua.

**Testing:**

Asegúrate de que tus contribuciones estén probadas y no introduzcan problemas en el proyecto.
Participa en pruebas de calidad y asegúrate de cumplir con las expectativas definidas en las historias de usuario.

**Forkea el Repositorio:**

Haz un fork de este repositorio a tu cuenta de GitHub.
Clona el repositorio desde tu cuenta a tu máquina local.
```bash
git clone [https://github.com/TU_USUARIO/e-commerce-university.git]
cd e-commerce-los-borbocoders
```
**Desarrollo en Ramas:**

Crea una rama para tu contribución.
```bash
git checkout -b nombre-de-tu-rama
Realiza tus cambios o adiciones en esta rama.
```
**Commits Significativos:**

Realiza commits significativos que reflejen los cambios que estás haciendo.
```bash
git commit -m "Añadir funcionalidad de carrito de compras"
```
**Actualiza tu Rama:**

Antes de enviar tu pull request, asegúrate de que tu rama está actualizada con la rama principal.
```bash
git pull origin main
```
Resuelve cualquier conflicto que pueda surgir.
  
**Envía tu Pull Request:**

Abre un pull request desde tu rama a la rama principal del proyecto.
Reportar Problemas y Proponer Mejoras
Si encuentras problemas o tienes ideas para mejorar el proyecto, utiliza el sistema de issues de GitHub:

**Issues:**

Crea un issue para reportar problemas.
Utiliza etiquetas para clasificar el tipo de problema (bug, mejora, etc.).
Proporciona detalles claros y contexto sobre el problema.

**Pull Requests:**

Para proponer mejoras, crea un pull request.
Describe claramente la mejora propuesta y proporciona contexto.
Asegúrate de que tus cambios sean compatibles con la metodología Scrum y no rompan funcionalidades existentes.

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





