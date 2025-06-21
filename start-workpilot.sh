#!/bin/bash

echo "🚀 Starting WorkPilot..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "📋 Creating .env from template..."
    cp .env.example .env
    echo "✅ Please edit .env with your API keys, then run this script again."
    echo "📖 See SETUP.md for detailed instructions."
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start WorkPilot
echo "🐳 Starting containers..."
docker-compose up -d

# Wait a moment for containers to start
sleep 3

# Check if containers are running
if docker-compose ps | grep -q "Up"; then
    echo ""
    echo "✅ WorkPilot is running!"
    echo ""
    echo "�� Frontend: http://localhost:3000"
    echo "🔧 Backend API: http://localhost:3001"
    echo "📋 Health Check: http://localhost:3001/health"
    echo ""
    echo "📖 See SETUP.md for configuration help"
    echo "🛑 To stop: docker-compose down"
else
    echo "❌ Failed to start containers. Check logs:"
    echo "   docker-compose logs"
fi
