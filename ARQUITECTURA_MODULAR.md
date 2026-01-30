# Backend - Arquitectura Modular Escalable

## Estructura de directorios

```
backend/
├── src/
│   ├── config/                      # Configuración centralizada
│   │   ├── database.config.ts       # Config de TypeORM
│   │   ├── env.config.ts            # Config de variables de entorno (futuro)
│   │   └── index.ts
│   │
│   ├── common/                      # Código reutilizable (aplicable a todos los módulos)
│   │   ├── guards/                  # Guards: JWT, Roles, etc.
│   │   │   ├── jwt-auth.guard.ts    # Protege rutas con JWT
│   │   │   └── index.ts
│   │   ├── pipes/                   # Pipes: validaciones personalizadas
│   │   ├── filters/                 # Filters: manejo de excepciones
│   │   ├── interceptors/            # Interceptors: logging, transformación de respuestas
│   │   ├── exceptions/              # Excepciones personalizadas
│   │   ├── decorators/              # Decoradores personalizados
│   │   ├── utils/                   # Funciones utilitarias
│   │   └── index.ts                 # Re-exporta todo del common
│   │
│   ├── database/                    # Módulo de base de datos
│   │   ├── database.module.ts       # Módulo TypeORM
│   │   └── database.providers.ts
│   │
│   ├── modules/                     # Módulos de features principales
│   │   ├── auth/                    # Autenticación (Login, Register, JWT)
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts   # Rutas: POST /auth/login, POST /auth/register, GET /auth/profile
│   │   │   ├── auth.service.ts      # Lógica: bcrypt, JWT sign/verify
│   │   │   ├── dto/
│   │   │   │   └── auth.dto.ts      # LoginDto, RegisterDto (validaciones)
│   │   │   ├── strategies/          # (Futuro) Estrategias: local, jwt, oauth
│   │   │   ├── guards/
│   │   │   └── index.ts
│   │   │
│   │   ├── users/                   # Gestión de usuarios (CRUD, persistencia en BD)
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts  # Rutas: GET /users, GET /users/:id, POST /users
│   │   │   ├── users.service.ts     # CRUD: create, findOne, findByEmail, update, delete
│   │   │   ├── users.repository.ts  # (Futuro) Queries personalizadas
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts   # TypeORM entity: id, name, email, password, googleId, timestamps
│   │   │   ├── dto/
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   └── update-user.dto.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── parking/                 # Gestión de estacionamientos (spaces, availability)
│   │   │   ├── parking.module.ts
│   │   │   ├── parking.controller.ts
│   │   │   ├── parking.service.ts
│   │   │   ├── parking.repository.ts
│   │   │   ├── entities/
│   │   │   │   ├── parking-space.entity.ts
│   │   │   │   └── parking-lot.entity.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-parking.dto.ts
│   │   │   │   └── update-parking.dto.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── reservations/            # Reservaciones de espacios
│   │   │   ├── reservations.module.ts
│   │   │   ├── reservations.controller.ts
│   │   │   ├── reservations.service.ts
│   │   │   ├── reservations.repository.ts
│   │   │   ├── entities/
│   │   │   │   └── reservation.entity.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-reservation.dto.ts
│   │   │   │   └── update-reservation.dto.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── payments/                # Procesamiento de pagos
│   │   │   ├── payments.module.ts
│   │   │   ├── payments.controller.ts
│   │   │   ├── payments.service.ts
│   │   │   ├── entities/
│   │   │   │   └── payment.entity.ts
│   │   │   ├── strategies/          # Stripe, PayPal, etc.
│   │   │   │   ├── stripe.strategy.ts
│   │   │   │   └── paypal.strategy.ts
│   │   │   ├── dto/
│   │   │   │   └── process-payment.dto.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── qr/                      # Códigos QR (generación, validación)
│   │   │   ├── qr.module.ts
│   │   │   ├── qr.controller.ts
│   │   │   ├── qr.service.ts
│   │   │   ├── utils/
│   │   │   │   ├── qr-generator.util.ts
│   │   │   │   └── qr-validator.util.ts
│   │   │   └── index.ts
│   │   │
│   │   └── notifications/           # Notificaciones (email, SMS, push)
│   │       ├── notifications.module.ts
│   │       ├── notifications.service.ts
│   │       ├── strategies/
│   │       │   ├── email.strategy.ts
│   │       │   ├── sms.strategy.ts
│   │       │   └── push.strategy.ts
│   │       └── index.ts
│   │
│   ├── app.module.ts                # Módulo raíz (importa config, DB, auth, users, parking, etc.)
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts
│
├── dist/                            # Código compilado (generado por npm run build)
├── test/                            # Tests
├── .env                             # Variables de entorno
├── package.json
├── tsconfig.json
└── README.md
```

## Flujo de una solicitud (Ejemplo: Register)

1. **Client** → `POST /api/auth/register { name, email, password, confirmPassword }`
2. **AuthController** recibe en `register()`, valida DTO, llama a `AuthService.register()`
3. **AuthService** valida contraseñas, hashea con bcrypt, llama a `UsersService.create()`
4. **UsersService** crea entity `User` y persiste en PostgreSQL via TypeORM
5. **AuthService** retorna `{ message, user { id, name, email } }`
6. **Client** recibe respuesta

## Principios de la Arquitectura

### 1. **Modularidad**
- Cada feature es un módulo independiente en `modules/`
- Módulo = controller + service + entity + dto
- Los módulos se importan en `app.module.ts`

### 2. **Separación de Responsabilidades**
- **Controller**: maneja rutas HTTP, validación básica, deja lógica al service
- **Service**: lógica de negocio, validaciones complejas, orquestación
- **Repository**: queries a BD (futuro, si es necesario)
- **Entity**: esquema de BD

### 3. **Reutilización (Common)**
- Guards (JWT, Roles) → `common/guards/`
- Pipes personalizados → `common/pipes/`
- Excepciones personalizadas → `common/exceptions/`
- Decoradores → `common/decorators/`

### 4. **Configuración Centralizada**
- Variables de entorno → `config/`
- Todas las configs se cargan desde `.env`

## Agregar una nueva feature (ejemplo: Reports)

1. **Crear carpeta**: `src/modules/reports/`
2. **Crear archivos**:
   ```
   reports/
   ├── reports.module.ts
   ├── reports.controller.ts
   ├── reports.service.ts
   ├── entities/
   │   └── report.entity.ts
   ├── dto/
   │   ├── create-report.dto.ts
   │   └── update-report.dto.ts
   └── index.ts
   ```
3. **Importar en `app.module.ts`**:
   ```typescript
   imports: [
     ConfigModule,
     DatabaseModule,
     AuthModule,
     UsersModule,
     ParkingModule,
     ReportsModule,  // ← Agregar
   ]
   ```
4. ¡Listo! La feature está integrada.

## Comandos útiles

```bash
# Desarrollo
npm run start:dev

# Compilar
npm run build

# Producción
npm run start:prod

# Tests
npm run test
npm run test:cov
```

## Base de datos

- **Motor**: PostgreSQL
- **Base de datos**: `Movil__app`
- **ORM**: TypeORM (v0.3.x)
- **Migrations**: (pendiente de implementar para producción)

## Próximas mejoras

- [ ] Implementar migrations con TypeORM
- [ ] Agregar tests unitarios y e2e
- [ ] Implementar logging centralizado
- [ ] Agregar validación de roles/permisos
- [ ] Rate limiting en endpoints
- [ ] Documentación Swagger/OpenAPI
- [ ] Google OAuth integration

