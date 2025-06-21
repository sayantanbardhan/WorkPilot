#!/bin/bash

echo "🚀 Starting WorkPilot..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo ""
    echo "Choose a setup method:"
    echo "1) 🧙‍♂️ Interactive Setup Wizard (Terminal)"
    echo "2) 🌐 Web Configuration Interface"
    echo "3) 📝 Manual setup with template"
    echo ""
    read -p "Enter your choice (1-3): " choice
    
    case $choice in
        1)
            echo "🧙‍♂️ Starting interactive setup wizard..."
            node tools/setup-wizard.js
            if [ ! -f .env ]; then
                echo "❌ Setup was cancelled or failed."
                exit 1
            fi
            ;;
        2)
            echo "🌐 Starting web configuration server..."
            echo "🚀 Opening http://localhost:8080 in your browser..."
            
            # Start the config server in background
            node tools/config-server.js &
            CONFIG_SERVER_PID=$!
            
            # Try to open browser (works on macOS and most Linux)
            if command -v open >/dev/null 2>&1; then
                open http://localhost:8080
            elif command -v xdg-open >/dev/null 2>&1; then
                xdg-open http://localhost:8080
            else
                echo "📋 Please open: http://localhost:8080"
            fi
            
            echo ""
            echo "⏳ Waiting for you to complete configuration..."
            echo "💡 Press Enter after you've saved your .env file"
            read -p ""
            
            # Stop the config server
            kill $CONFIG_SERVER_PID 2>/dev/null
            
            if [ ! -f .env ]; then
                echo "❌ .env file not found. Please complete the configuration."
                exit 1
            fi
            ;;
        3)
            echo "📝 Creating .env from template..."
            cp .env.example .env
            echo "✅ Please edit .env with your API keys, then run this script again."
            echo "📖 See SETUP.md for detailed instructions."
            exit 1
            ;;
        *)
            echo "❌ Invalid choice. Exiting."
            exit 1
            ;;
    esac
fi

# Validate environment variables
echo "🔍 Validating configuration..."
node tools/validate-config.js

echo ""
read -p "🚀 Press Enter to start WorkPilot (or Ctrl+C to exit)..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start WorkPilot
echo "🐳 Starting containers..."
docker-compose -f config/docker-compose.yml up -d

# Wait a moment for containers to start
sleep 3

# Check if containers are running
if docker-compose -f config/docker-compose.yml ps | grep -q "Up"; then
    echo ""
    echo "✅ WorkPilot is running!"
    echo ""
    echo "�� Frontend: http://localhost:3000"
    echo "🔧 Backend API: http://localhost:3001"
    echo "📋 Health Check: http://localhost:3001/health"
    echo ""
    echo "📖 See SETUP.md for configuration help"
    echo "🛑 To stop: docker-compose -f config/docker-compose.yml down"
else
    echo "❌ Failed to start containers. Check logs:"
    echo "   docker-compose -f config/docker-compose.yml logs"
fi
