#!/bin/bash

# 🚀 Script Súper Sencillo para Mantener el Servidor MCP Corriendo
# Solo ejecuta: ./scripts/keep-alive.sh

cd /home/debian/Proyectos/mcp/mcp-server

echo "🚀 Iniciando MCP Server con auto-restart..."
echo "Presiona Ctrl+C para detener"
echo ""

# Variables de entorno
export DB_HOST="localhost"
export DB_PORT="5433"
export DB_NAME="mcp_context"
export DB_USER="mcp_user"
export DB_PASSWORD="mcp_secure_password"

# Loop infinito que reinicia el servidor si se cierra
while true; do
    echo "⚡ [$(date '+%H:%M:%S')] Iniciando servidor..."
    
    # Ejecutar servidor
    node src/index.js
    
    # Si llegamos aquí, el servidor se cerró
    EXIT_CODE=$?
    echo "💥 [$(date '+%H:%M:%S')] Servidor se cerró (código: $EXIT_CODE)"
    
    # Esperar 3 segundos antes de reiniciar
    echo "⏳ Reiniciando en 3 segundos..."
    sleep 3
done
