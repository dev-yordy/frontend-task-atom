# Proyecto Frontend - Aplicación de Tareas
    Este proyecto es una aplicación de tareas que permite gestionar una lista de tareas con opciones de creación, edición, 
    eliminación y cambio de estado. La aplicación está desarrollada en Angular y hace uso de Firebase para autenticación y 
    de un backend propio para la gestión de tareas.

# Tecnologías Utilizadas
    Angular: Framework frontend para el desarrollo de la aplicación.
    Firebase: Servicio de autenticación.
    Angular Material: Biblioteca de componentes UI para Angular, utilizada para crear una interfaz amigable y accesible.
    RxJS: Biblioteca de programación reactiva para manejar suscripciones y eventos asíncronos.

# Estructura del Proyecto
    La estructura del proyecto se ha organizado de manera modular para una mejor escalabilidad y mantenimiento:
    src/
    │
    ├── app/
    │   ├── auth/                 # Componentes y servicios relacionados con autenticación
    │   ├── core/                 # Servicios e interceptores compartidos
    │   │   ├── guards/           # Guards para proteger rutas
    │   │   └── interceptors/     # Interceptores de HTTP
    │   ├── shared/               # Componentes y utilidades reutilizables
    │   ├── pages/                # Componentes principales de las vistas
    │   │   ├── tasks/            # Componente de listado y gestión de tareas
    │   │   └── home/             # Componente de bienvenida
    │   └── app.component.ts      # Componente principal de la aplicación
    │
    └── assets/                   # Recursos estáticos como imágenes y estilos globales

# Componentes Principales
# app/pages/tasks
    Este componente maneja la lista de tareas, incluyendo la creación, edición y eliminación de tareas. 
    Se usaron tablas de Angular Material y un scroll horizontal para garantizar que las columnas no desborden en dispositivos móviles. 
    Además, los botones de acción y el estado de cada tarea están adaptados visualmente según su estado.

# app/pages/home
    En esta página, se muestra un mensaje de bienvenida personalizado para el usuario, 
    centrado y estilizado en color naranja. Este componente se muestra solo si el usuario ha iniciado sesión.

# Funcionalidades Implementadas
    1. Autenticación con Firebase
    Para la autenticación, se utilizó Firebase Authentication. Se implementó un AuthService para manejar el inicio y
     cierre de sesión, la gestión del token y su almacenamiento en localStorage. Este servicio también expone un 
     BehaviorSubject (isAuthenticated$) para notificar a los componentes de la autenticación del usuario.

    2. Interceptors
    Se implementó un HttpInterceptor para adjuntar el token de autenticación en cada solicitud HTTP. 
    Si el token está expirado (lo que resulta en un error 401), el interceptor redirige al usuario a la página de autenticación y elimina el token.

    3. Guards
    Se creó un guard para proteger las rutas que requieren autenticación. 
    Este guard verifica si el token está presente y es válido antes de permitir el acceso a rutas protegidas. Si no, redirige al usuario a la página de inicio de sesión.

    4. Componentes Reutilizables
    Snackbar Personalizado: Se creó un componente snackbar reutilizable, estilizado en color naranja para mantener la coherencia visual. 
    Este snackbar muestra mensajes de error o confirmación, y se usa a lo largo de la aplicación para notificaciones al usuario.
    Dialog de Confirmación: En lugar de utilizar confirm() en eliminaciones, se implementó un dialog de Angular Material que confirma la acción con el usuario antes de eliminar una tarea.
    
    5. Tabla de Tareas con Paginación y Selección de Filas
    Se implementó una tabla con soporte de paginación. Los usuarios pueden seleccionar múltiples filas para marcar tareas como completadas.
     La tabla se adapta a dispositivos móviles, permitiendo un scroll horizontal en pantallas más pequeñas.

    6. Responsive Design
    Se aplicaron estilos específicos para mejorar la experiencia en dispositivos móviles y tabletas:
    Navbar: En dispositivos móviles, el navbar muestra un botón de menú desplegable para ahorrar espacio.
    Tabla de Tareas: En dispositivos móviles, la tabla tiene scroll horizontal para visualizar correctamente los datos.

 # Razonamiento Detrás de las Decisiones
    Uso de Firebase y Backend Propio: Firebase se eligió para simplificar el manejo de la autenticación, 
    y un backend propio para el manejo de datos específicos de la aplicación como las tareas.

    Interceptors y Guards: Se incluyeron estos mecanismos para mejorar la seguridad de la aplicación,
     garantizando que solo los usuarios autenticados puedan acceder a la información sensible.

    Componentes Reutilizables: La creación de componentes como el snackbar y el dialog de confirmación permite un código
    más limpio y facilita la reutilización en otros proyectos.   