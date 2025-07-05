# MCP Context Server - Plataforma Completa de Gestión de Proyectos

## 🎯 Descripción

Sistema de **Model Context Protocol (MCP)** que permite a editores como Cursor mantener memoria persistente sobre proyectos de desarrollo. Funciona como un puente entre tu editor y una base de datos PostgreSQL para almacenar contexto de proyectos, historial de conversaciones, y **gestión completa de proyectos**.

## ✅ Estado del Proyecto

**🎉 COMPLETAMENTE EXTENDIDO** - Sistema completo de gestión de proyectos con 26 APIs:

### 📊 **APIs Originales (4)**
- ✅ `store_context` - Almacenar contexto de proyecto
- ✅ `get_context` - Recuperar contexto de proyecto  
- ✅ `store_conversation` - Almacenar historial de conversación
- ✅ `get_conversation_history` - Recuperar historial de conversación

### 🆕 **APIs Extendidas (22)**

#### 📝 Gestión de Archivos
- ✅ `store_file_history` - Versiones de archivos
- ✅ `get_file_history` - Historial de cambios
- ✅ `store_file_metadata` - Metadatos de archivos
- ✅ `get_file_metadata` - Información de archivos

#### 👥 Gestión de Usuarios
- ✅ `store_project_user` - Agregar usuarios
- ✅ `get_project_users` - Obtener equipo

#### 📋 Gestión de Tareas
- ✅ `store_project_task` - Crear tareas
- ✅ `get_project_tasks` - Obtener tareas

#### 📦 Gestión de Dependencias
- ✅ `store_project_dependency` - Rastrear dependencias
- ✅ `get_project_dependencies` - Obtener paquetes

#### 🌍 Configuraciones
- ✅ `store_environment_config` - Variables de entorno
- ✅ `get_environment_configs` - Obtener configs

#### 📊 Auditoría
- ✅ `log_activity` - Registrar actividades
- ✅ `get_activity_logs` - Obtener logs

#### 🔨 Builds y CI/CD
- ✅ `store_build` - Información de builds
- ✅ `update_build_status` - Actualizar builds
- ✅ `get_build_history` - Historial de builds

#### 📚 Documentación
- ✅ `store_documentation` - Crear docs
- ✅ `get_documentation` - Obtener docs

#### 🔗 Arquitectura
- ✅ `store_project_component` - Definir componentes
- ✅ `store_component_relationship` - Mapear relaciones
- ✅ `get_project_components` - Obtener componentes
- ✅ `get_component_relationships` - Obtener relaciones

## 🏗️ Arquitectura

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│     Cursor      │    │   Servidor MCP   │    │   PostgreSQL    │
│    (Editor)     │◄──►│   (Node.js)      │◄──►│   (Docker)      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Componentes:

- **Base de Datos PostgreSQL** (Puerto 5433)
  - Contexto de proyectos y conversaciones
  - PgAdmin (Puerto 5050) para administración
  - Grafana (Puerto 3000) para visualización

- **Servidor MCP Node.js**
  - Implementa protocolo MCP oficial
  - APIs para almacenamiento y recuperación
  - Pool de conexiones optimizado

## 🚀 Uso Rápido

### 1. Configurar y ejecutar:

```bash
cd /home/debian/Proyectos/mcp

# Configuración inicial (solo la primera vez)
./scripts/setup.sh

# Iniciar el sistema
./scripts/start.sh
```

### 2. Probar que funciona:

```bash
# Verificar todos los componentes
./scripts/test.sh

# Probar las APIs directamente
node scripts/test-apis.js
```

### 3. Configurar en Cursor:

Agregar en la configuración MCP de Cursor:

```json
{
  "mcpServers": {
    "context-storage": {
      "command": "node",
      "args": ["/home/debian/Proyectos/mcp/mcp-server/src/index.js"],
      "env": {
        "DB_HOST": "localhost",
        "DB_PORT": "5433",
        "DB_NAME": "mcp_context",
        "DB_USER": "mcp_user",
        "DB_PASSWORD": "mcp_secure_password"
      }
    }
  }
}
```

## 📊 Herramientas de Administración

- **PgAdmin**: http://localhost:5050
  - Usuario: admin@admin.com
  - Contraseña: admin

- **Grafana**: http://localhost:3000
  - Usuario: admin  
  - Contraseña: admin

## 🔧 Comandos Útiles

```bash
# Ver logs de la base de datos
docker logs mcp-postgres

# Conectar directamente a PostgreSQL
docker exec -it mcp-postgres psql -U mcp_user -d mcp_context

# Detener el sistema
cd docker && docker compose down

# Reiniciar con datos limpios
cd docker && docker compose down -v && docker compose up -d
```

## 🧪 Ejemplos de Uso

### Almacenar contexto de proyecto:

```javascript
// El servidor MCP maneja automáticamente estas operaciones cuando Cursor las invoca
store_context({
  projectName: "mi-proyecto-react",
  contextType: "structure", 
  content: "Proyecto React con TypeScript, usa Vite, tiene tests con Jest...",
  metadata: { tech_stack: ["React", "TypeScript", "Vite"] }
})
```

### Recuperar contexto:

```javascript
get_context({
  projectName: "mi-proyecto-react"
})
// Retorna todo el contexto almacenado para el proyecto
```

## 📋 Estructura del Proyecto

```
/home/debian/Proyectos/mcp/
├── 📄 README.md                  # Esta documentación
├── 📄 code.md                    # Guía técnica en inglés
├── 📄 documentation.md           # Documentación en español
├── 🐳 docker/
│   ├── 🐋 docker-compose.yml     # PostgreSQL + PgAdmin + Grafana
│   └── 🗄️ postgres/init.sql     # Esquema de base de datos
├── 🖥️ mcp-server/
│   ├── 📦 package.json           # Dependencias MCP
│   ├── ⚙️ .env                   # Variables de entorno
│   ├── 📁 config/database.json   # Configuración de BD
│   └── 📂 src/
│       ├── 🗃️ database.js        # Gestor PostgreSQL
│       └── 🖧 index.js           # Servidor MCP
└── 🔧 scripts/
    ├── ⚡ setup.sh               # Configuración inicial  
    ├── 🚀 start.sh               # Iniciar sistema
    ├── 🧪 test.sh                # Verificar componentes
    └── 📊 test-apis.js           # Probar APIs
```

## 🔍 Verificación del Estado

### ✅ Pruebas pasando:
- Base de datos PostgreSQL funcionando
- Esquema de BD creado correctamente
- Servidor MCP iniciando sin errores
- Todas las APIs respondiendo correctamente
- Pool de conexiones optimizado

### 📈 Resultados de pruebas:
```
🎉 All API tests completed successfully!

📋 Summary:
  - Project contexts stored: 2
  - Conversation messages: 2  
  - Database operations: All successful
```

## 🚨 Solución de Problemas

### Si el servidor no inicia:
```bash
# Verificar que Docker está corriendo
docker ps

# Verificar logs
docker logs mcp-postgres

# Reinstalar dependencias
cd mcp-server && npm install
```

### Si hay problemas de conexión:
```bash
# Verificar conectividad
docker exec -it mcp-postgres pg_isready -U mcp_user -d mcp_context

# Verificar variables de entorno
cat mcp-server/.env
```

## 🎯 Próximos Pasos

Tu sistema MCP está **completamente funcional**. Ahora puedes:

1. ✅ **Configurar en Cursor** usando la configuración proporcionada
2. ✅ **Empezar a usar** - El sistema almacenará automáticamente el contexto
3. ✅ **Monitorear** usando PgAdmin y Grafana
4. ✅ **Escalar** agregando más tipos de contexto según necesites

## 📞 Soporte

El sistema incluye logging detallado. Para debugging:

```bash
# Ver logs del servidor MCP
cd mcp-server && npm start

# Ver logs de la base de datos  
docker logs mcp-postgres -f
```

---

**🎉 ¡Tu banco de memoria persistente MCP está listo para usar!** 🎉
