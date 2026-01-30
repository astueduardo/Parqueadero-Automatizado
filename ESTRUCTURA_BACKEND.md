# Backend - Estructura Escalable

## Árbol de carpetas

```
backend/
├── src/
│   ├── core/                    # Módulos principales (features core del app)
│   │   ├── auth/                # Autenticación (login, register, JWT)
│   │   │   ├── auth.controller.ts    # Rutas: POST /auth/login, POST /auth/register, GET /auth/profile
│   │   │   ├── auth.service.ts       # Lógica de auth (bcrypt, JWT)
│   │   │   ├── auth.module.ts        # Módulo Nest que importa UsersModule + JwtModule
│   │   │   ├── dto/
│   │   │   │   └── auth.dto.ts       # LoginDto, RegisterDto (validaciones)
│   │   │   ├── guards/
│   │   │   │   └── jwt-auth.guard.ts # Guard para proteger rutas (verifica JWT)
│   │   │   └── index.ts              # Exporta todo del módulo
│   │   │
│   │   ├── users/               # Gestión de usuarios (persistencia en BD)
│   │   │   ├── users.controller.ts   # Rutas: GET /users, GET /users/:id, POST /users
│   │   │   ├── users.service.ts      # Lógica CRUD (findOne, create, findByEmail)
│   │   │   ├── users.module.ts       # Módulo Nest con TypeORM forFeature([User])
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts    # TypeORM entity: id, name, email, password, timestamps
│   │   │   └── index.ts              # Exporta todo del módulo
│   │   │
│   │   └── index.ts            # Re-exporta auth + users para fácil acceso
│   │
│   ├── shared/                  # Código reutilizable (guards, pipes, utils, etc.)
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts      # Guard JWT (compartido con auth.module)
│   │   │   └── index.ts
│   │   ├── pipes/               # (preparado para validación personalizada)
│   │   ├── filters/             # (preparado para manejo de excepciones)
│   │   ├── interceptors/        # (preparado para middleware)
│   │   ├── utils/               # Funciones utilitarias
│   │   └── index.ts             # Re-exporta guards y otros
│   │
│   ├── config/                  # Configuración (env variables)
│   │   ├── database.config.ts   # Config de TypeORM (host, port, DB, etc.)
│   │   └── index.ts
│   │
│   ├── database/                # Módulo TypeORM
│   │   ├── database.module.ts   # Importa TypeOrmModule.forRootAsync()
│   │   └── database.providers.ts
│   │
│   ├── app.module.ts            # Módulo raíz (importa: ConfigModule, DatabaseModule, AuthModule, UsersModule)
│   ├── app.controller.ts        # Controlador raíz (GET / para health check)
│   ├── app.service.ts           # Servicio raíz (lógica mínima)
│   └── main.ts                  # Entrypoint: bootstrap(), listen(3001)
│
├── .env                         # Variables de entorno (DB_HOST, DB_PORT, JWT_SECRET, etc.)
├── package.json
├── tsconfig.json
├── nest-cli.json
└── ...otros (README, build scripts, etc.)
```

## Flujo de un request (Ejemplo: Register)

1. Client envía: `POST /api/auth/register { name, email, password, confirmPassword }`
2. **AuthController** recibe en `register()`, llama a `AuthService.register(dto)`
3. **AuthService** valida contraseñas, hashea password, llama a `UsersService.create()`
4. **UsersService** crea entity User y guarda en PostgreSQL via TypeORM
5. **AuthService** retorna { message, user { id, name, email } }
6. Response al client

## Archivos clave y sus responsabilidades

| Archivo | Responsabilidad |
|---------|-----------------|
| `app.module.ts` | Importar todos los módulos (config, DB, auth, users) |
| `core/auth/auth.controller.ts` | Rutas HTTP `/auth/*` |
| `core/auth/auth.service.ts` | Lógica: bcrypt, JWT sign/verify, validaciones |
| `core/users/users.service.ts` | CRUD en BD: create, findOne, findByEmail, etc. |
| `core/users/entities/user.entity.ts` | Definición de tabla `user` en PostgreSQL |
| `shared/guards/jwt-auth.guard.ts` | Verifica JWT en rutas protegidas |
| `config/database.config.ts` | Lee .env, configura TypeORM |
| `main.ts` | Arranca servidor en puerto 3001 |

## Agregar una nueva feature (ejemplo: Posts)

1. Crear carpeta `src/core/posts/`
2. Dentro: `posts.controller.ts`, `posts.service.ts`, `posts.module.ts`, `entities/post.entity.ts`
3. Crear `index.ts` en posts que exporte todo
4. En `app.module.ts`, agregar `PostsModule` al array de imports
5. ¡Listo! La feature está integrada.

## Comandos útiles

```bash
# Desarrollo (hot-reload)
npm run start:dev

# Compilar
npm run build

# Producción (desde dist)
npm run start:prod

# Tests
npm run test
```

## Base de datos

- **BD:** PostgreSQL, base `Movil__app`
- **Tabla:** `user` (TypeORM synchronize auto-crea/actualiza schema)
- **ORM:** TypeORM con módulo `@nestjs/typeorm`
