#!/bin/bash

# Script para simular cómo Cursor ejecuta el servidor MCP
echo "🧪 Simulando ejecución desde Cursor..."

# Cambiar al directorio correcto
cd /home/debian/Proyectos/mcp/mcp-server

# Configurar variables de entorno como lo haría Cursor
export DB_HOST="localhost"
export DB_PORT="5433"
export DB_NAME="mcp_context"
export DB_USER="mcp_user"
export DB_PASSWORD="mcp_secure_password"

echo "📊 Variables de entorno configuradas:"
echo "DB_HOST: $DB_HOST"
echo "DB_PORT: $DB_PORT"
echo "DB_NAME: $DB_NAME" 
echo "DB_USER: $DB_USER"
echo "DB_PASSWORD: $DB_PASSWORD"

echo ""
echo "🚀 Iniciando servidor MCP..."

# Ejecutar el servidor con timeout para evitar que se quede colgado
timeout 10s node src/index.js

EXIT_CODE=$?

if [ $EXIT_CODE -eq 124 ]; then
    echo ""
    echo "✅ Servidor iniciado correctamente (terminado por timeout)"
elif [ $EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✅ Servidor ejecutado exitosamente"
else
    echo ""
    echo "❌ Error en la ejecución (código: $EXIT_CODE)"
fi
