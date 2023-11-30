# Stage 1: Build the Angular frontend
FROM node:14 as build-stage
WORKDIR /app
COPY frontend/package*.json /app/
RUN npm install
COPY frontend/ /app/
RUN npm run build

# Stage 2: Set up the Python backend and Nginx to serve the frontend
FROM python:3.8
WORKDIR /usr/src/app

# Copy the backend code
COPY backend/ .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy built Angular app from the first stage
COPY --from=build-stage /app/dist/frontend /usr/share/nginx/html

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Copy Nginx configuration (You should have this file prepared)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the web server
EXPOSE 80

# Define environment variable for OpenAI API key
ENV OPENAI_API_KEY=""

# Start Nginx and the Python application
CMD service nginx start && python ./gpt_to_word.py