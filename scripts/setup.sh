#!/bin/bash

# MCP Context System Setup Script
# This script sets up the complete environment for the MCP context system

set -e  # Exit on any error

echo "🚀 Setting up MCP Context System..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Navigate to the project directory
cd .

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
cd mcp-server
npm install

# Go back to root directory
cd ..

# Start PostgreSQL with Docker
echo "🐳 Starting PostgreSQL database..."
cd docker
docker compose up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Test database connection
echo "🧪 Testing database connection..."
docker compose exec postgres pg_isready -U mcp_user -d mcp_context

echo "✅ Setup complete!"
echo ""
echo "To start the MCP server, run:"
echo "  cd . && ./scripts/start.sh"
echo ""
echo "To stop the database, run:"
echo "  cd ~/mcp-context-system/docker && docker compose down"