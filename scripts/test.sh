#!/bin/bash

# MCP Context System Test Script
# This script tests the MCP server functionality

set -e

echo "🧪 Testing MCP Context System..."

# Navigate to the project directory
cd /home/debian/Proyectos/mcp

# Test 1: Check if database is running
echo "📊 Test 1: Checking database connection..."
cd docker
if docker compose ps | grep -q "mcp-postgres.*Up"; then
    echo "✅ Database is running"
else
    echo "❌ Database is not running. Starting database..."
    docker compose up -d
    sleep 10
fi

# Test 2: Test database connectivity
echo "📊 Test 2: Testing database connectivity..."
if docker compose exec postgres pg_isready -U mcp_user -d mcp_context; then
    echo "✅ Database connection successful"
else
    echo "❌ Database connection failed"
    exit 1
fi

# Test 3: Check if tables exist
echo "📊 Test 3: Checking database schema..."
cd ..
TABLE_COUNT=$(docker compose -f docker/docker-compose.yml exec postgres psql -U mcp_user -d mcp_context -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_name IN ('project_contexts', 'conversation_history');" | tr -d ' ')
if [ "$TABLE_COUNT" = "2" ]; then
    echo "✅ Database schema is correct"
else
    echo "❌ Database schema is incomplete"
    exit 1
fi

# Test 4: Check Node.js dependencies
echo "📊 Test 4: Checking Node.js dependencies..."
cd mcp-server
if [ -d "node_modules" ] && [ -f "package-lock.json" ]; then
    echo "✅ Node.js dependencies are installed"
else
    echo "❌ Node.js dependencies missing. Installing..."
    npm install
fi

# Test 5: Validate MCP server syntax
echo "📊 Test 5: Validating MCP server syntax..."
if node -c src/index.js; then
    echo "✅ MCP server syntax is valid"
else
    echo "❌ MCP server has syntax errors"
    exit 1
fi

echo ""
echo "🎉 All tests passed! The MCP Context System is ready to use."
echo ""
echo "To start the system:"
echo "  cd /home/debian/Proyectos/mcp && ./scripts/start.sh"
echo ""
echo "To test with Cursor, add this to your Cursor MCP settings:"
echo '{'
echo '  "mcpServers": {'
echo '    "context-storage": {'
echo '      "command": "node",'
echo '      "args": ["/home/debian/Proyectos/mcp/mcp-server/src/index.js"],'
echo '      "env": {'
echo '        "DB_HOST": "localhost",'
echo '        "DB_PORT": "5433",'
echo '        "DB_NAME": "mcp_context",'
echo '        "DB_USER": "mcp_user",'
echo '        "DB_PASSWORD": "mcp_secure_password"'
echo '      }'
echo '    }'
echo '  }'
echo '}'
