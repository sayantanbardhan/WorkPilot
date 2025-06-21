FROM node:18-bullseye

# Install Python and system dependencies for Whisper
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Install Whisper
RUN pip3 install openai-whisper

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy application code
COPY . .

# Create necessary directories
RUN mkdir -p uploads temp

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "index.js"] 