#!/bin/bash

echo "🚀 Setting up Smart Food Management Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p uploads/surplus-photos
mkdir -p uploads/temp
mkdir -p logs

# Copy environment file
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env
    echo "✅ Please update the .env file with your configuration"
else
    echo "✅ Environment file already exists"
fi

# Check if MongoDB is running
echo "🗄️ Checking MongoDB connection..."
if mongo --eval "db.runCommand('ping').ok" localhost/test --quiet; then
    echo "✅ MongoDB is running"
else
    echo "⚠️ MongoDB is not running. Please start MongoDB first."
fi

echo "
🎉 Backend setup complete!

📋 Next steps:
1. Update your .env file with the correct values
2. Start MongoDB if not running
3. Run 'npm run seed' to populate the database
4. Run 'npm run dev' to start the development server

📚 Available scripts:
- npm run dev     : Start development server
- npm start       : Start production server  
- npm run seed    : Seed database with sample data
- npm test        : Run tests
"
