#!/bin/bash

# 🛑 Script para detener el servidor MCP de forma limpia

echo "🛑 Deteniendo servidor MCP..."

# Buscar proceso de Node.js que ejecuta el servidor MCP
MCP_PID=$(ps aux | grep "node.*src/index.js" | grep -v grep | awk '{print $2}')

if [ -n "$MCP_PID" ]; then
    echo "📍 Encontrado servidor MCP con PID: $MCP_PID"
    kill -SIGINT $MCP_PID
    sleep 2
    
    # Verificar si se cerró correctamente
    if ps -p $MCP_PID > /dev/null 2>&1; then
        echo "⚠️ Forzando cierre..."
        kill -KILL $MCP_PID
    fi
    
    echo "✅ Servidor MCP detenido"
else
    echo "ℹ️ No se encontró servidor MCP corriendo"
fi

# También detener el script keep-alive si está corriendo
KEEPALIVE_PID=$(ps aux | grep "keep-alive.sh" | grep -v grep | awk '{print $2}')
if [ -n "$KEEPALIVE_PID" ]; then
    echo "🛑 Deteniendo keep-alive script..."
    kill $KEEPALIVE_PID
fi

echo "🏁 Finalizado"
