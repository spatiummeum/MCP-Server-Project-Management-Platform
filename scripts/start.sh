#!/bin/bash

# MCP Context System Start Script
# This script starts both the database and the MCP server

set -e  # Exit on any error

echo "🚀 Starting MCP Context System..."

# Navigate to the project directory
cd .

# Start PostgreSQL if not already running
echo "🐳 Ensuring PostgreSQL is running..."
cd docker
docker compose up -d

# Wait a moment for the database to be ready
sleep 3

# Start the MCP server
echo "🖥️  Starting MCP server..."
cd ../mcp-server
npm start