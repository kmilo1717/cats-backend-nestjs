# Cats Backend API

Backend API desarrollado con NestJS siguiendo Clean Architecture y principios SOLID para el manejo de razas de gatos, imágenes y usuarios.

## Características

- **Clean Architecture**: Separación clara entre dominio, aplicación e infraestructura
- **Principios SOLID**: Código mantenible y extensible
- **Pruebas Unitarias**: Cobertura completa de controladores y servicios
- **Integración con The Cat API**: Consumo de API externa para datos de gatos
- **Autenticación de Usuarios**: Sistema de login y registro con MongoDB
- **Validación de Datos**: DTOs con class-validator
- **Documentación**: Código bien documentado y estructurado
- **Containerización**: Soporte completo para Docker y Docker Compose

## Endpoints

### Controlador de Gatos
- `GET /breeds` - Lista todas las razas de gatos
- `GET /breeds/:breed_id` - Obtiene una raza específica
- `GET /breeds/search?q={query}` - Busca razas por término

### Controlador de Imágenes
- `GET /imagesbybreedid?breed_id={id}&limit={number}` - Obtiene imágenes por raza

### Controlador de Usuarios
- `POST /login` - Autenticación de usuario
- `POST /register` - Registro de nuevo usuario

## Instalación y Ejecución

### Opción 1: Instalación Local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar en desarrollo
npm run start:dev

# Ejecutar pruebas
npm run test

# Ejecutar con cobertura
npm run test:cov
```

### Opción 2: Usando Docker

#### Ejecutar con Docker
```bash
# Construir la imagen
docker build -t cats-backend-api .

# Ejecutar el contenedor
docker run -p 3000:3000 --env-file .env cats-backend-api
```

#### Ejecutar con Docker Compose (Recomendado)
```bash
# Ejecutar toda la aplicación con base de datos incluida
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Reconstruir y ejecutar
docker-compose up --build -d
```

## Configuración de Docker

### Dockerfile
El proyecto incluye un `Dockerfile` optimizado que:
- Utiliza Node.js Alpine para un tamaño mínimo
- Implementa multi-stage build para optimización
- Ejecuta como usuario no-root por seguridad
- Incluye healthcheck para monitoreo

### Docker Compose
El archivo `docker-compose.yml` proporciona:
- Servicio de aplicación NestJS
- Base de datos MongoDB
- Red interna para comunicación entre servicios
- Volúmenes persistentes para datos
- Variables de entorno configurables

## Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
# API Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/cats-api

# The Cat API
CAT_API_KEY=your_cat_api_key_here
CAT_API_BASE_URL=https://api.thecatapi.com/v1

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
```

## Estructura del Proyecto

```
src/
├── shared/           # Componentes compartidos
├── cats/            # Módulo de gatos
│   ├── domain/      # Entidades y casos de uso
│   ├── application/ # Servicios y DTOs
│   ├── infrastructure/ # Repositorios e implementaciones
│   ├── presentation/   # Controladores
│   └── tests/       # Pruebas unitarias
├── images/          # Módulo de imágenes
├── users/           # Módulo de usuarios
└── main.ts         # Punto de entrada
```

## Tecnologías

- **Framework**: NestJS
- **Base de Datos**: MongoDB con Mongoose
- **API Externa**: The Cat API
- **Testing**: Jest para pruebas unitarias
- **Seguridad**: bcryptjs para encriptación de contraseñas
- **Validación**: class-validator para validaciones de DTOs
- **Containerización**: Docker y Docker Compose

## Scripts Disponibles

```bash
# Desarrollo
npm run start:dev      # Ejecutar en modo desarrollo
npm run start:debug    # Ejecutar en modo debug
npm run start:prod     # Ejecutar en producción

# Testing
npm run test           # Ejecutar pruebas unitarias
npm run test:watch     # Ejecutar pruebas en modo watch
npm run test:cov       # Ejecutar pruebas con cobertura
npm run test:e2e       # Ejecutar pruebas end-to-end

# Build
npm run build          # Construir para producción
npm run format         # Formatear código con Prettier
npm run lint           # Ejecutar ESLint
```
