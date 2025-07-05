# MCP Context Server - Extended API Documentation

## Overview

El servidor MCP Context Server ha sido extendido con múltiples funcionalidades para proporcionar un sistema completo de gestión de contexto de proyectos. Además del almacenamiento básico de contexto y conversaciones, ahora incluye:

## 🆕 Nuevas Funcionalidades

### 1. **Historial de Archivos y Versiones** 📝
Almacena y rastrea cambios en archivos del proyecto con control de versiones completo.

**Herramientas disponibles:**
- `store_file_history` - Almacenar versión de archivo con cambios
- `get_file_history` - Obtener historial de versiones de archivos

**Casos de uso:**
- Seguimiento de cambios en código fuente
- Auditoría de modificaciones
- Recuperación de versiones anteriores
- Análisis de evolución del código

### 2. **Gestión de Usuarios y Roles** 👥
Administra usuarios del proyecto con roles y permisos específicos.

**Herramientas disponibles:**
- `store_project_user` - Agregar/actualizar usuario del proyecto
- `get_project_users` - Obtener usuarios y sus roles

**Roles disponibles:**
- `admin` - Administrador completo
- `developer` - Desarrollador con permisos de escritura
- `viewer` - Solo lectura
- `tester` - Enfocado en pruebas

### 3. **Gestión de Tareas e Issues** 📋
Sistema completo de tickets, tareas y seguimiento de issues.

**Herramientas disponibles:**
- `store_project_task` - Crear/actualizar tareas
- `get_project_tasks` - Obtener tareas con filtros

**Tipos de tareas:**
- `feature` - Nueva funcionalidad
- `bug` - Error o fallo
- `enhancement` - Mejora
- `documentation` - Documentación

**Estados:**
- `open` - Abierto
- `in_progress` - En progreso
- `testing` - En pruebas
- `closed` - Cerrado

### 4. **Gestión de Dependencias** 📦
Rastrea todas las dependencias y paquetes del proyecto.

**Herramientas disponibles:**
- `store_project_dependency` - Almacenar dependencia
- `get_project_dependencies` - Obtener dependencias

**Package Managers soportados:**
- `npm` - Node.js
- `pip` - Python
- `maven` - Java
- `gradle` - Java/Android
- `composer` - PHP
- `cargo` - Rust

### 5. **Configuraciones de Entorno** 🌍
Gestiona variables de entorno y configuraciones por ambiente.

**Herramientas disponibles:**
- `store_environment_config` - Almacenar configuración
- `get_environment_configs` - Obtener configuraciones

**Entornos típicos:**
- `development` - Desarrollo
- `staging` - Staging/Pruebas
- `production` - Producción
- `testing` - Entorno de tests

### 6. **Logs de Actividad y Auditoría** 📊
Registro completo de actividades del proyecto para auditoría.

**Herramientas disponibles:**
- `log_activity` - Registrar actividad
- `get_activity_logs` - Obtener logs de actividad

**Tipos de actividad:**
- `file_changed` - Archivo modificado
- `task_created` - Tarea creada
- `user_login` - Usuario logueado
- `build_started` - Build iniciado
- `deployment` - Despliegue

### 7. **Gestión de Builds y Pruebas** 🔨
Rastrea builds, resultados de tests y despliegues.

**Herramientas disponibles:**
- `store_build` - Almacenar información de build
- `update_build_status` - Actualizar estado de build
- `get_build_history` - Obtener historial de builds

**Tipos de build:**
- `ci` - Integración continua
- `manual` - Build manual
- `release` - Build de release

**Estados:**
- `success` - Exitoso
- `failure` - Fallido
- `in_progress` - En progreso
- `cancelled` - Cancelado

### 8. **Documentación y Recursos** 📚
Gestiona documentación del proyecto organizada por tipos.

**Herramientas disponibles:**
- `store_documentation` - Almacenar documentación
- `get_documentation` - Obtener documentación

**Tipos de documentación:**
- `api` - Documentación de API
- `user_guide` - Guía de usuario
- `technical` - Documentación técnica
- `changelog` - Registro de cambios

### 9. **Relaciones entre Componentes** 🔗
Mapea relaciones y dependencias entre módulos del proyecto.

**Herramientas disponibles:**
- `store_project_component` - Almacenar componente
- `store_component_relationship` - Almacenar relación
- `get_project_components` - Obtener componentes
- `get_component_relationships` - Obtener relaciones

**Tipos de componentes:**
- `module` - Módulo
- `service` - Servicio
- `library` - Librería
- `class` - Clase
- `function` - Función

**Tipos de relaciones:**
- `depends_on` - Depende de
- `implements` - Implementa
- `extends` - Extiende
- `calls` - Llama a

### 10. **Metadatos de Archivos** 🗂️
Información detallada sobre archivos del proyecto.

**Herramientas disponibles:**
- `store_file_metadata` - Almacenar metadatos
- `get_file_metadata` - Obtener metadatos

**Información incluida:**
- Tamaño de archivo
- Tipo y extensión
- Lenguaje de programación
- Número de líneas
- Checksum para integridad
- Autor de última modificación

## 📊 Base de Datos

### Nuevas Tablas Creadas

1. **file_history** - Historial de versiones de archivos
2. **project_users** - Usuarios y roles del proyecto
3. **project_tasks** - Tareas e issues
4. **project_dependencies** - Dependencias y paquetes
5. **project_environments** - Configuraciones de entorno
6. **project_activity_logs** - Logs de actividad
7. **project_builds** - Información de builds
8. **project_documentation** - Documentación
9. **project_components** - Componentes del proyecto
10. **component_relationships** - Relaciones entre componentes
11. **file_metadata** - Metadatos de archivos

### Índices Optimizados

Cada tabla incluye índices optimizados para consultas frecuentes:
- Búsquedas por proyecto
- Filtros por tipo/estado
- Ordenamiento por fecha
- Relaciones entre entidades

## 🚀 Casos de Uso Avanzados

### Análisis de Proyecto Completo
```javascript
// Obtener toda la información de un proyecto
const projectData = {
  context: await getContext(projectName),
  users: await getProjectUsers(projectName),
  tasks: await getProjectTasks(projectName),
  dependencies: await getProjectDependencies(projectName),
  components: await getProjectComponents(projectName),
  documentation: await getDocumentation(projectName),
  recentActivity: await getActivityLogs(projectName, null, null, 50)
};
```

### Auditoría de Seguridad
```javascript
// Rastrear todas las actividades sensibles
await logActivity(projectName, 'security_access', user, 'sensitive_file', 'accessed');
const securityLogs = await getActivityLogs(projectName, 'security_access');
```

### Gestión de Releases
```javascript
// Preparar información de release
const releaseInfo = {
  build: await storeBuild(projectName, 'v1.2.0', 'release', 'success'),
  dependencies: await getProjectDependencies(projectName),
  tests: await getBuildHistory(projectName, 'success'),
  docs: await getDocumentation(projectName, null, true) // Solo publicados
};
```

### Análisis de Dependencias
```javascript
// Análisis completo de dependencias
const analysis = {
  npmPackages: await getProjectDependencies(projectName, 'npm'),
  components: await getProjectComponents(projectName),
  relationships: await getComponentRelationships(projectName)
};
```

## 🔧 Configuración

### Variables de Entorno Requeridas
```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mcp_context
DB_USER=mcp_user
DB_PASSWORD=mcp_secure_password
```

### Esquema de Base de Datos
El esquema se inicializa automáticamente con Docker Compose. Todas las tablas incluyen:
- Timestamps automáticos (created_at, updated_at)
- Campos de metadata JSONB para extensibilidad
- Índices optimizados para rendimiento
- Triggers para actualización automática de timestamps

## 📈 Rendimiento

### Optimizaciones Implementadas
- **Connection Pooling**: Pool de conexiones PostgreSQL configurado
- **Índices Estratégicos**: Índices en campos de búsqueda frecuente
- **Campos JSONB**: Para metadata flexible y consultas eficientes
- **Paginación**: Límites por defecto en consultas grandes
- **Checksums**: Verificación de integridad en archivos

### Métricas Recomendadas
- Monitorear uso del pool de conexiones
- Rastrear tiempo de respuesta de queries
- Alertas en fallos de integridad de datos
- Uso de almacenamiento por proyecto

## 🛡️ Seguridad

### Características de Seguridad
- **Configuraciones Sensibles**: Marcado de campos sensibles
- **Auditoría Completa**: Log de todas las actividades
- **Control de Acceso**: Roles y permisos por usuario
- **Integridad de Datos**: Checksums y validaciones
- **IP Tracking**: Registro de direcciones IP en actividades

### Mejores Prácticas
1. Marcar configuraciones sensibles como `isSensitive: true`
2. Registrar todas las actividades críticas
3. Verificar checksums en archivos importantes
4. Revisar logs de actividad regularmente
5. Configurar alertas para actividades sospechosas

## 🧪 Testing

Ejecutar el script de pruebas completo:
```bash
node scripts/test-extended-apis.js
```

Este script prueba todas las funcionalidades nuevas y genera un reporte completo.

## 📞 Soporte

Para cualquier pregunta sobre las nuevas funcionalidades:
1. Revisar esta documentación
2. Ejecutar los tests para verificar funcionamiento
3. Consultar los logs del servidor para debugging
4. Verificar la configuración de base de datos

---

*Esta extensión convierte el MCP Context Server en una solución completa de gestión de contexto de proyectos, proporcionando todas las herramientas necesarias para el seguimiento, análisis y administración de proyectos de desarrollo de software.*
