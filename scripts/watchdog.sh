#!/bin/bash

# MCP Server Watchdog - Mantiene el servidor corriendo
# Este script monitora y reinicia el servidor MCP si se cierra

MCP_DIR="/home/debian/Proyectos/mcp/mcp-server"
PID_FILE="/tmp/mcp-server.pid"
LOG_FILE="/home/debian/Proyectos/mcp/logs/watchdog.log"

# Crear directorio de logs si no existe
mkdir -p "$(dirname "$LOG_FILE")"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

start_server() {
    log "🚀 Iniciando servidor MCP..."
    cd "$MCP_DIR"
    
    # Configurar variables de entorno
    export DB_HOST="localhost"
    export DB_PORT="5433"
    export DB_NAME="mcp_context"
    export DB_USER="mcp_user"
    export DB_PASSWORD="mcp_secure_password"
    
    # Iniciar servidor en background
    nohup node src/index.js > /dev/null 2>&1 &
    echo $! > "$PID_FILE"
    
    log "✅ Servidor iniciado con PID: $(cat $PID_FILE)"
}

stop_server() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if kill -0 "$PID" 2>/dev/null; then
            kill "$PID"
            log "🛑 Servidor detenido (PID: $PID)"
        fi
        rm -f "$PID_FILE"
    fi
}

is_running() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        kill -0 "$PID" 2>/dev/null
    else
        return 1
    fi
}

case "$1" in
    start)
        if is_running; then
            log "⚠️ Servidor ya está corriendo"
        else
            start_server
        fi
        ;;
    stop)
        stop_server
        ;;
    restart)
        stop_server
        sleep 2
        start_server
        ;;
    status)
        if is_running; then
            log "✅ Servidor está corriendo (PID: $(cat $PID_FILE))"
        else
            log "❌ Servidor no está corriendo"
        fi
        ;;
    watch)
        log "👁️ Iniciando watchdog..."
        while true; do
            if ! is_running; then
                log "⚠️ Servidor no está corriendo. Reiniciando..."
                start_server
            fi
            sleep 30  # Verificar cada 30 segundos
        done
        ;;
    *)
        echo "Uso: $0 {start|stop|restart|status|watch}"
        exit 1
        ;;
esac
