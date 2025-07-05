#!/bin/bash

echo "🔍 DIAGNÓSTICO COMPLETO DEL SISTEMA MCP"
echo "======================================"

# 1. Verificar que Docker está corriendo
echo "1️⃣ Verificando Docker..."
if ! docker ps &> /dev/null; then
    echo "❌ Docker no está corriendo"
    exit 1
else
    echo "✅ Docker está corriendo"
fi

# 2. Verificar contenedores MCP
echo ""
echo "2️⃣ Verificando contenedores MCP..."
cd /home/debian/Proyectos/mcp/docker

POSTGRES_STATUS=$(docker compose ps postgres --format "table {{.State}}" | tail -n +2)
if [ "$POSTGRES_STATUS" = "running" ]; then
    echo "✅ PostgreSQL está corriendo"
else
    echo "❌ PostgreSQL no está corriendo. Iniciando..."
    docker compose up -d postgres
    sleep 5
fi

# 3. Verificar conectividad PostgreSQL
echo ""
echo "3️⃣ Verificando conectividad PostgreSQL..."
if docker compose exec postgres pg_isready -U mcp_user -d mcp_context &> /dev/null; then
    echo "✅ PostgreSQL acepta conexiones"
else
    echo "❌ PostgreSQL no acepta conexiones"
    exit 1
fi

# 4. Verificar esquema de base de datos
echo ""
echo "4️⃣ Verificando esquema de base de datos..."
TABLE_COUNT=$(docker compose exec postgres psql -U mcp_user -d mcp_context -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_name IN ('project_contexts', 'conversation_history');" 2>/dev/null | tr -d ' ')
if [ "$TABLE_COUNT" = "2" ]; then
    echo "✅ Esquema de base de datos correcto"
else
    echo "❌ Esquema de base de datos incompleto"
    exit 1
fi

# 5. Verificar dependencias Node.js
echo ""
echo "5️⃣ Verificando dependencias Node.js..."
cd ../mcp-server
if [ -f "package-lock.json" ] && [ -d "node_modules" ]; then
    echo "✅ Dependencias Node.js instaladas"
else
    echo "❌ Dependencias Node.js no instaladas. Instalando..."
    npm install
fi

# 6. Verificar permisos del archivo
echo ""
echo "6️⃣ Verificando permisos del archivo..."
if [ -x "src/index.js" ]; then
    echo "✅ Archivo src/index.js tiene permisos de ejecución"
else
    echo "❌ Archivo src/index.js no tiene permisos de ejecución. Corrigiendo..."
    chmod +x src/index.js
fi

# 7. Verificar variables de entorno
echo ""
echo "7️⃣ Verificando variables de entorno..."
if [ -f ".env" ]; then
    echo "✅ Archivo .env existe"
    echo "📄 Contenido del .env:"
    cat .env | sed 's/PASSWORD=.*/PASSWORD=***HIDDEN***/'
else
    echo "❌ Archivo .env no existe"
    exit 1
fi

# 8. Prueba de conexión desde Node.js
echo ""
echo "8️⃣ Probando conexión desde Node.js..."
CONNECTION_TEST=$(node -e "
import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config();
const { Pool } = pg;
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
try {
  const client = await pool.connect();
  await client.query('SELECT 1');
  client.release();
  await pool.end();
  console.log('SUCCESS');
} catch (error) {
  console.log('ERROR:', error.message);
}" 2>&1)

if [[ $CONNECTION_TEST == "SUCCESS" ]]; then
    echo "✅ Conexión Node.js → PostgreSQL funcional"
else
    echo "❌ Error en conexión Node.js → PostgreSQL:"
    echo "$CONNECTION_TEST"
    exit 1
fi

# 9. Prueba del servidor MCP
echo ""
echo "9️⃣ Probando servidor MCP..."
export DB_HOST="localhost"
export DB_PORT="5433" 
export DB_NAME="mcp_context"
export DB_USER="mcp_user"
export DB_PASSWORD="mcp_secure_password"

MCP_TEST=$(timeout 3s node src/index.js 2>&1)
MCP_EXIT=$?

if [[ $MCP_EXIT -eq 124 ]] && [[ $MCP_TEST == *"MCP Context Server started successfully"* ]]; then
    echo "✅ Servidor MCP inicia correctamente"
else
    echo "❌ Error en servidor MCP:"
    echo "$MCP_TEST"
    exit 1
fi

# 10. Verificar configuración de Cursor
echo ""
echo "🔟 Verificando configuración de Cursor..."
CURSOR_CONFIG="/home/debian/.config/Code - Insiders/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json"
if [ -f "$CURSOR_CONFIG" ]; then
    echo "✅ Archivo de configuración de Cursor existe"
    if grep -q "context-storage" "$CURSOR_CONFIG"; then
        echo "✅ Configuración context-storage encontrada"
    else
        echo "❌ Configuración context-storage no encontrada"
    fi
else
    echo "❌ Archivo de configuración de Cursor no existe"
fi

echo ""
echo "🎉 DIAGNÓSTICO COMPLETADO"
echo "========================"
echo ""
echo "✨ Tu sistema MCP está listo para usar!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Reinicia Cursor/Cline"
echo "2. Verifica que 'context-storage' aparece en la lista de MCP servers"
echo "3. Prueba usando comandos como 'store context' o 'get context'"
echo ""
echo "🔧 Para probar manualmente:"
echo "   cd /home/debian/Proyectos/mcp && node scripts/test-apis.js"
echo ""
echo "🚀 Para mantener el servidor corriendo automáticamente:"
echo "   cd /home/debian/Proyectos/mcp && ./scripts/keep-alive.sh"
