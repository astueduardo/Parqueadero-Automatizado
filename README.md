# Backend NestJS - Proyecto de Titulación

![NestJS Logo](https://nestjs.com/img/logo_text.svg)

## Descripción

Este es el backend del proyecto de titulación, construido con [NestJS](https://nestjs.com/), un framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes, confiables y escalables.

## Características

- **Arquitectura Modular:** Código organizado en módulos para una mejor separación de conceptos y mantenibilidad.
- **TypeScript:** Tipado estático para un desarrollo más robusto y menos propenso a errores.
- **TypeORM:** Un ORM maduro para TypeScript y JavaScript que soporta PostgreSQL, MariaDB, MySQL, etc.
- **Autenticación JWT:** Autenticación segura basada en JSON Web Tokens.
- **Validación de Datos:** DTOs (Data Transfer Objects) con `class-validator` y `class-transformer` para validar los datos de entrada.
- **Configuración centralizada:** Manejo de la configuración de la aplicación a través de variables de entorno.

## Estructura del Proyecto

```
/
├── src/
│   ├── app.module.ts           # Módulo raíz
│   ├── main.ts                 # Punto de entrada
│   ├── common/                 # Elementos compartidos (guards, interceptors, etc.)
│   ├── config/                 # Configuración de la aplicación (e.g., database)
│   ├── database/               # Módulo de conexión a la base de datos
│   └── modules/                # Módulos de negocio (features)
│       ├── auth/
│       ├── users/
│       ├── parking/
│       ├── reservations/
│       ├── payments/
│       ├── qr/
│       └── notifications/
├── test/                       # Pruebas E2E
├── .env.example                # Plantilla de variables de entorno
├── package.json                # Dependencias y scripts
└── tsconfig.json               # Configuración de TypeScript
```

## Guía de Inicio Rápido

### Prerrequisitos

- [Node.js](https://nodejs.org/) (v16 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Una instancia de base de datos (e.g., PostgreSQL)
  - Para pruebas locales rápidas puedes usar Docker:

    ```bash
    docker run --name pg-test -e POSTGRES_USER=PostgreSQL -e POSTGRES_PASSWORD=2101087019 -e POSTGRES_DB=Movil__app -p 5432:5432 -d postgres:15
    ```

  - Para ejecutar las pruebas e2e con creación automática de tablas (NO recomendado en producción), puedes habilitar sincronización añadiendo en tu `.env`:

    ```ini
    DB_SYNCHRONIZE=true
    ```

    Luego ejecuta `npm run test:e2e`.

- Para promover un usuario existente a administrador (útil en desarrollo):
  - Ejemplo usando variables de entorno (recomendado):

    ```bash
    EMAIL=keviastu@gmail.com ROLE=admin npm run promote:user
    ```

  - En Windows PowerShell (sin `cross-env`):

    ```powershell
    $env:EMAIL='keviastu@gmail.com'; $env:ROLE='admin'; npm run promote:user
    ```

  - El script actualizará el campo `role` del usuario con el `email` indicado.

### Instalación

1.  Clonar el repositorio (si aplica).
2.  Instalar las dependencias:

    ```bash
    npm install
    ```

3.  Configurar las variables de entorno:
    - Copiar el archivo `.env.example` a uno nuevo llamado `.env`.
    - Modificar el archivo `.env` con las credenciales de tu base de datos y otros secretos.

    ```bash
    cp .env.example .env
    ```

- **Google OAuth (web):** Añade las credenciales proporcionadas en el `.env`:

  ```ini
  GOOGLE_CLIENT_ID=your-google-client-id
  GOOGLE_CLIENT_SECRET=your-google-client-secret
  GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
  ```

- Configura en Google Cloud Console la URI de redirección `http://localhost:3001/api/auth/google/callback` para tu OAuth client.
  - Añade `FRONTEND_URL` en tu `.env` para que el callback redirija a la aplicación web, por ejemplo `FRONTEND_URL=http://localhost:3000`.

### Ejecución de la Aplicación

- **Modo Desarrollo (con auto-recarga):**

  ```bash
  npm run start:dev
  ```

- **Modo Producción:**

  ```bash
  npm run build
  npm run start:prod
  ```

La API estará disponible en `http://localhost:3001/api` (o el puerto que hayas configurado en el archivo `.env`).

## Scripts del Proyecto

- `npm run start`: Inicia la aplicación en modo producción.
- `npm run start:dev`: Inicia la aplicación en modo desarrollo.
- `npm run build`: Transpila el código TypeScript a JavaScript.
- `npm test`: Ejecuta las pruebas unitarias.
- `npm run test:e2e`: Ejecuta las pruebas de extremo a extremo.
- `npm run lint`: Analiza el código en busca de errores de estilo.
- `npm run format`: Formatea el código fuente con Prettier.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue las guías de estilo del proyecto y asegúrate de que todas las pruebas pasen antes de enviar un _pull request_.
