#!/bin/bash

# 🎯 SCRIPT MÁS SIMPLE PARA TU SERVIDOR MCP
# Solo ejecuta: ./mcp.sh

case "$1" in
    start|"")
        echo "🚀 Iniciando servidor MCP con auto-restart..."
        echo "ℹ️ Para detener: ./mcp.sh stop"
        echo ""
        cd /home/debian/Proyectos/mcp
        exec ./scripts/keep-alive.sh
        ;;
    stop)
        echo "🛑 Deteniendo servidor MCP..."
        cd /home/debian/Proyectos/mcp
        ./scripts/stop.sh
        ;;
    status)
        echo "📊 Estado del servidor MCP:"
        if ps aux | grep -q "node.*src/index.js" | grep -v grep; then
            echo "✅ Servidor corriendo"
        else
            echo "❌ Servidor no está corriendo"
        fi
        ;;
    test)
        echo "🧪 Probando sistema completo..."
        cd /home/debian/Proyectos/mcp
        ./scripts/diagnose.sh
        ;;
    *)
        echo "🎯 Uso más simple:"
        echo "  ./mcp.sh          # Iniciar servidor"
        echo "  ./mcp.sh start    # Iniciar servidor"
        echo "  ./mcp.sh stop     # Detener servidor"
        echo "  ./mcp.sh status   # Ver estado"
        echo "  ./mcp.sh test     # Diagnóstico completo"
        ;;
esac
